export interface Project {
  title: string;
  year: number;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "AgroComm",
    year: 2024,
    description: "Commodities agropecuárias",
    url: "https://agrocomm.com.br",
  },
  {
    title: "FIPE",
    year: 2020,
    description: "Tabela fipe de veículos",
    url: "https://sistematico.github.io/fipe",
  },
  {
    title: "Next.js Simple Auth",
    year: 2025,
    description: "Um sistema simples de autenticação com Next.js, Drizzle e Bun",
    url: "https://auth.lucasbrum.dev",
  },
];