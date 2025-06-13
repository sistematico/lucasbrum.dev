export interface Link {
  name: string;
  description: string;
  url: string;
}

export interface LinkCategory {
  name: string;
  links: Link[];
}

export const linkCategories: LinkCategory[] = [
  {
    name: "Desenvolvimento",
    links: [
      {
        name: "GitHub",
        description: "Repositórios de código e controle de versão",
        url: "https://github.com",
      },
      {
        name: "MDN Web Docs",
        description: "Documentação completa para desenvolvimento web",
        url: "https://developer.mozilla.org",
      },
      {
        name: "Next.js Docs",
        description: "Documentação oficial do Next.js",
        url: "https://nextjs.org/docs",
      },
      {
        name: "Tailwind CSS",
        description: "Framework CSS utility-first",
        url: "https://tailwindcss.com",
      },
      {
        name: "TypeScript",
        description: "Documentação oficial do TypeScript",
        url: "https://www.typescriptlang.org",
      },
    ],
  },
  {
    name: "Design",
    links: [
      {
        name: "Dribbble",
        description: "Inspiração e showcases de design",
        url: "https://dribbble.com",
      },
      {
        name: "Figma",
        description: "Ferramenta de design colaborativo",
        url: "https://figma.com",
      },
      {
        name: "Unsplash",
        description: "Fotos gratuitas de alta qualidade",
        url: "https://unsplash.com",
      },
    ],
  },
  {
    name: "Ferramentas",
    links: [
      {
        name: "Can I Use",
        description: "Compatibilidade de recursos web entre navegadores",
        url: "https://caniuse.com",
      },
      {
        name: "CodePen",
        description: "Editor online para desenvolvimento front-end",
        url: "https://codepen.io",
      },
      {
        name: "Excalidraw",
        description: "Ferramenta de diagramas e sketches",
        url: "https://excalidraw.com",
      },
      {
        name: "Regex101",
        description: "Testador e explicador de expressões regulares",
        url: "https://regex101.com",
      },
    ],
  },
  {
    name: "Produtividade",
    links: [
      {
        name: "Notion",
        description: "Workspace all-in-one para anotações e projetos",
        url: "https://notion.so",
      },
      {
        name: "Obsidian",
        description: "App de anotações com linking avançado",
        url: "https://obsidian.md",
      },
      {
        name: "Todoist",
        description: "Gerenciador de tarefas e projetos",
        url: "https://todoist.com",
      },
    ],
  },
];

// Função para ordenar categorias e links alfabeticamente
export function getSortedLinkCategories(): LinkCategory[] {
  return linkCategories
    .map(category => ({
      ...category,
      links: [...category.links].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}