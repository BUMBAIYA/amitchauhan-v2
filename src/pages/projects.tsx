import { PageSEO } from "@/components/PageSEO";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/components/data/projects";

export default function Projects() {
  return (
    <>
      <PageSEO
        title="Amit Chauhan | Projects"
        description="Project showcase of Amit Chauhan's portfolio"
      />
      <div className="mx-auto my-16 flex max-w-7xl flex-col gap-20">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
        <div className="mx-auto mt-16 max-w-5xl text-center">
          <span className="text-xl font-bold md:text-2xl">
            I am currently building new projects and learning backend
            development to expand my skill set beyond frontend.
          </span>
          <p className="mt-10 text-base md:text-xl">
            Visit my github to see some of the latest projects{" "}
            <a
              href="https://github.com/BUMBAIYA?tab=repositories"
              target="_blank"
              className="font-medium text-tera-500 underline underline-offset-2 hover:text-teal-600 dark:text-teal-400"
            >
              Github
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
