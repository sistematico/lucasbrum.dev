import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { postStats, visitors, siteStats } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { cookies } from "next/headers";
import crypto from "crypto";

// Gerar ou recuperar ID único do visitante
async function getVisitorId(request: NextRequest): Promise<string> {
  const cookieStore = await cookies();
  const existingId = cookieStore.get("visitor_id")?.value;
  if (existingId) return existingId;

  // Gerar novo ID baseado em IP + User Agent
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";

  const hash = crypto
    .createHash("sha256")
    .update(`${ip}-${userAgent}-${Date.now()}`)
    .digest("hex")
    .substring(0, 16);

  return hash;
}

export async function POST(request: NextRequest) {
  try {
    const { slug, action } = await request.json();

    if (!slug) {
      return NextResponse.json(
        { error: "Slug é obrigatório" },
        { status: 400 }
      );
    }

    const visitorId = await getVisitorId(request);

    // Definir cookie do visitante (válido por 1 ano)
    const response = NextResponse.json({ success: true });
    
    response.cookies.set("visitor_id", visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 365 * 24 * 60 * 60, // 1 ano
    });

    // Verificar se o visitante já visualizou este post
    const existingVisit = await db
      .select()
      .from(visitors)
      .where(
        and(eq(visitors.visitorId, visitorId), eq(visitors.postSlug, slug))
      )
      .get();

    // Buscar ou criar estatísticas do post
    let stats = await db
      .select()
      .from(postStats)
      .where(eq(postStats.slug, slug))
      .get();

    if (!stats) {
      // Criar nova entrada de estatísticas
      await db.insert(postStats).values({
        slug,
        totalViews: 1,
        uniqueViews: 1,
        readCount: action === "read" ? 1 : 0,
      });
    } else {
      // Atualizar estatísticas existentes
      const updates: any = {
        totalViews: stats.totalViews + 1,
        updatedAt: new Date(),
      };

      if (!existingVisit) {
        updates.uniqueViews = stats.uniqueViews + 1;
      }

      if (action === "read") {
        if (!existingVisit?.hasRead) {
          updates.readCount = stats.readCount + 1;
        }
      }

      await db.update(postStats).set(updates).where(eq(postStats.slug, slug));
    }

    // Registrar ou atualizar visita
    if (!existingVisit) {
      await db.insert(visitors).values({
        visitorId,
        postSlug: slug,
        hasRead: action === "read",
      });
    } else if (action === "read" && !existingVisit.hasRead) {
      await db
        .update(visitors)
        .set({
          hasRead: true,
          lastVisit: new Date(),
        })
        .where(
          and(eq(visitors.visitorId, visitorId), eq(visitors.postSlug, slug))
        );
    }

    // Atualizar estatísticas gerais do site
    const siteStatsData = await db.select().from(siteStats).get();

    if (!siteStatsData) {
      await db.insert(siteStats).values({ totalViews: 1, uniqueVisitors: 1 });
    } else {
      await db
        .update(siteStats)
        .set({
          totalViews: siteStatsData.totalViews + 1,
          uniqueVisitors: !existingVisit
            ? siteStatsData.uniqueVisitors + 1
            : siteStatsData.uniqueVisitors,
          updatedAt: new Date(),
        })
        .where(eq(siteStats.id, siteStatsData.id));
    }

    return response;
  } catch (error) {
    console.error("Erro ao registrar visualização:", error);
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    );
  }
}

// GET para obter estatísticas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      // Retornar estatísticas de um post específico
      const stats = await db
        .select()
        .from(postStats)
        .where(eq(postStats.slug, slug))
        .get();

      return NextResponse.json(stats || { slug, totalViews: 0, uniqueViews: 0, readCount: 0 });
    } else {
      // Retornar estatísticas gerais
      const stats = await db.select().from(siteStats).get();
      const allPostStats = await db.select().from(postStats).all();

      return NextResponse.json({ site: stats || { totalViews: 0, uniqueVisitors: 0 }, posts: allPostStats });
    }
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return NextResponse.json({ error: "Erro ao buscar estatísticas" }, { status: 500 });
  }
}