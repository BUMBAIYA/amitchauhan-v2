import {
  SiHtml5,
  SiCss3,
  SiTypescript,
  SiJavascript,
  SiExpress,
  SiSocketdotio,
  SiMongodb,
  SiGraphql,
  SiPrisma,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiFlask,
} from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { LiaNodeJs } from "react-icons/lia";

type SkillPillProps = {
  name: string;
  icon: JSX.Element;
};

const LANGUAGES: SkillPillProps[] = [
  {
    name: "HTML",
    icon: (
      <SiHtml5 className="h-5 w-5 fill-[#e34c26] sm:h-8 sm:w-8 md:h-10 md:w-10" />
    ),
  },
  {
    name: "CSS",
    icon: (
      <SiCss3 className="h-5 w-5 fill-[#264de4] sm:h-8 sm:w-8 md:h-10 md:w-10" />
    ),
  },
  {
    name: "Javascript",
    icon: (
      <SiJavascript className="h-5 w-5 fill-amber-400 sm:h-8 sm:w-8 md:h-10 md:w-10" />
    ),
  },
  {
    name: "Typescript",
    icon: (
      <SiTypescript className="h-5 w-5 fill-[#3178c6] sm:h-8 sm:w-8 md:h-10 md:w-10" />
    ),
  },
  {
    name: "Python",
    icon: (
      <picture>
        <img
          alt="python logo"
          src="/icons/python.svg"
          className="h-5 w-5 fill-[#3178c6] sm:h-8 sm:w-8 md:h-10 md:w-10"
        />
      </picture>
    ),
  },
];

const BACKEND_PILL: SkillPillProps[] = [
  {
    name: "Nodejs",
    icon: (
      <LiaNodeJs className="h-5 w-5 fill-[#61b448] sm:h-8 sm:w-8 md:h-10 md:w-10" />
    ),
  },
  {
    name: "Express",
    icon: <SiExpress className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10" />,
  },
  {
    name: "Flask",
    icon: <SiFlask className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10" />,
  },
  {
    name: "Socket.io",
    icon: <SiSocketdotio className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10" />,
  },
];

const DATABASE_ORM_PILL: SkillPillProps[] = [
  {
    name: "MongoDB",
    icon: (
      <SiMongodb className="h-5 w-5 fill-[#61b448] sm:h-8 sm:w-8 md:h-10 md:w-10" />
    ),
  },
  {
    name: "PostgreSQL",
    icon: (
      <BiLogoPostgresql className="h-5 w-5 fill-[#336791] dark:fill-[#478cc4] sm:h-8 sm:w-8 md:h-10 md:w-10" />
    ),
  },
  {
    name: "GraphQL",
    icon: (
      <SiGraphql className="h-5 w-5 fill-[#e535ab] sm:h-8 sm:w-8 md:h-10 md:w-10" />
    ),
  },
  {
    name: "Prisma",
    icon: (
      <SiPrisma className="h-5 w-5 fill-[#2d3748] dark:fill-zinc-100 sm:h-8 sm:w-8 md:h-10 md:w-10" />
    ),
  },
];

const LIBRARY_FRAMEWORK: SkillPillProps[] = [
  {
    name: "Reactjs",
    icon: (
      <SiReact className="h-5 w-5 fill-[#5dd2f3] sm:h-8 sm:w-8 md:h-10 md:w-10" />
    ),
  },
  {
    name: "Nextjs",
    icon: <SiNextdotjs className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10" />,
  },
  {
    name: "Nextjs",
    icon: <SiNextdotjs className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10" />,
  },
];

function SkillPill(props: SkillPillProps) {
  const { name, icon } = props;

  return (
    <div className="-z-20 flex w-max items-center gap-2 overflow-hidden rounded-lg border border-tera-500/20 bg-white px-4 py-3 text-sm shadow-sm dark:bg-zinc-800 sm:text-base md:px-6 md:py-4 md:text-lg">
      {icon}
      <span className="font-semibold">{name}</span>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="overflow-hidden px-6 py-32 sm:px-14 md:px-20">
      <div className="relative mx-auto max-w-7xl">
        <h2 className="text-xl font-semibold sm:text-4xl">Skills</h2>
        <div className="mt-4 font-semibold">
          <span className="text-xs font-semibold sm:text-sm">Languages</span>
          <div className="mt-2 flex flex-wrap gap-4 text-xl dark:text-zinc-100">
            {LANGUAGES.map((pill, index) => (
              <SkillPill key={index} {...pill} />
            ))}
          </div>
        </div>
        <div className="mt-4 font-semibold">
          <span className="text-xs font-semibold sm:text-sm">
            Frontend library and frameworks
          </span>
          <div className="mt-2 flex flex-wrap gap-4 text-xl dark:text-zinc-100">
            {LIBRARY_FRAMEWORK.map((pill, index) => (
              <SkillPill key={index} {...pill} />
            ))}
          </div>
        </div>
        <div className="mt-6">
          <span className="text-xs font-semibold sm:text-sm">Backend</span>
          <div className="mt-2 flex flex-wrap gap-3">
            {BACKEND_PILL.map((pill, index) => (
              <SkillPill key={index} {...pill} />
            ))}
          </div>
        </div>
        <div className="mt-6">
          <span className="text-xs font-semibold sm:text-sm">
            Databases and Orms
          </span>
          <div className="mt-2 flex flex-wrap gap-3">
            {DATABASE_ORM_PILL.map((pill, index) => (
              <SkillPill key={index} {...pill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
