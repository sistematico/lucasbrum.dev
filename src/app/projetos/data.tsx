export interface Project {
  title: string;
  year: number;
  description: string;
  url: string;
  repo: string;
}

export const projects: Project[] = [
  {
    title: "AgroComm",
    year: 2024,
    description: "Commodities agropecuárias",
    url: "https://agrocomm.com.br",
    repo: "https://github.com/sistematico/agrocomm"
  },
  {
    title: "FIPE",
    year: 2020,
    description: "Tabela fipe de veículos",
    url: "https://sistematico.github.io/fipe",
    repo: "https://github.com/sistematico/agrocomm"
  },
  {
    title: "Next.js Simple Auth",
    year: 2025,
    description: "Um sistema simples de autenticação com Next.js, Drizzle e Bun",
    url: "https://auth.lucasbrum.dev",
    repo: "https://github.com/sistematico/nextjs-simple-auth"
  },
];