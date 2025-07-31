import ProjectCard from "@/components/project-card";
import { projects } from "./data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Alguns dos meus projetos mais recentes e interessantes.",
};

export default function Projects() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Projetos</h1>
      <div>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            link={project.url}
            repo={project.repo}
          />
        ))}
      </div>
    </section>
  );
}