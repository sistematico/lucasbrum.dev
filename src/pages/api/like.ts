// src/pages/api/like.ts
import type { APIRoute } from 'astro';
import { db } from '../../db';
import { likesCounter, userLikes } from '../../db/schema';
import { eq, and, sql } from 'drizzle-orm';

export const post: APIRoute = async ({ request }) => {
  try {
    const COUNTER_ID = "website";
    const { userId } = await request.json();
    
    // Verifica se o usuário já deu like
    const existingLike = await db.select()
      .from(userLikes)
      .where(
        and(
          eq(userLikes.userId, userId),
          eq(userLikes.counterRef, COUNTER_ID)
        )
      )
      .limit(1);
    
    if (existingLike.length > 0) {
      return new Response(
        JSON.stringify({ success: true, alreadyLiked: true, likes: null }),
        { status: 200 }
      );
    }
    
    // Incrementa o contador de likes
    await db.update(likesCounter)
      .set({ 
        // likes: db.raw('likes + 1'),
        likes: sql`likes + 1`,
        updatedAt: new Date()
      })
      .where(eq(likesCounter.counter_id, COUNTER_ID));
    
    // Registra o like do usuário
    await db.insert(userLikes)
      .values({ 
        userId: userId,
        counterRef: COUNTER_ID
      });
    
    // Obtém a contagem atualizada
    const result = await db.select()
      .from(likesCounter)
      .where(eq(likesCounter.counter_id, COUNTER_ID))
      .limit(1);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        alreadyLiked: false, 
        likes: result[0].likes 
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing like:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Erro ao processar like" }),
      { status: 500 }
    );
  }
}

export const get: APIRoute = async () => {
  try {
    const COUNTER_ID = "website";
    
    // Obtém a contagem atual
    const result = await db.select()
      .from(likesCounter)
      .where(eq(likesCounter.counter_id, COUNTER_ID))
      .limit(1);
    
    const likes = result.length > 0 ? result[0].likes : 0;
    
    return new Response(
      JSON.stringify({ success: true, likes }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching likes:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Erro ao obter likes" }),
      { status: 500 }
    );
  }
}