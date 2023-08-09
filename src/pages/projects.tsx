import { PageSEO } from "@/components/PageSEO";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS_CARD } from "@/data/projects";

export default function Projects() {
  return (
    <>
      <PageSEO
        title="Amit Chauhan | Projects"
        description="Project showcase of Amit Chauhan's portfolio"
      />
      <div className="mx-auto mb-40 mt-6 max-w-7xl gap-20 px-6 sm:mt-12 sm:px-14 md:px-20">
        <h1 className="text-2xl font-semibold md:text-4xl">Projects</h1>
        <div className="my-2">
          <span className="text-sm">
            Here are some of the projects I&apos;d like to share
          </span>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2">
          {PROJECTS_CARD.map((card, index) => (
            <ProjectCard key={index} {...card} />
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-5xl text-center md:mt-28">
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
