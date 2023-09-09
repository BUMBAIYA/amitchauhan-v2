import { AnimatePresence } from "framer-motion";
import FadeRight from "@/animation/FadeRight";
import {
  BACKEND_PILL,
  DATABASE_ORM_PILL,
  LANGUAGES,
  LIBRARY_FRAMEWORK,
  TOOLS_TECHNOLOGIES,
} from "@/data/skills";
import { useScreenBreakpoint } from "@/hooks/useScreenBreakpoint";
import { useDebounceValue } from "@/hooks/useDebounceValue";

export type SkillPillProps = {
  name: string;
  icon: JSX.Element;
};

function SkillPill(props: SkillPillProps) {
  const { name, icon } = props;

  return (
    <div className="flex w-max items-center gap-2 overflow-hidden rounded-lg border border-tera-500/20 bg-white px-4 py-3 text-sm shadow-sm dark:bg-zinc-800 sm:text-base md:px-6 md:py-3 md:text-lg">
      {icon}
      <span className="font-medium">{name}</span>
    </div>
  );
}

export default function Skills() {
  const isMobile = useScreenBreakpoint(640);
  const isMobileDebonced = useDebounceValue(isMobile, 600);
  return (
    <section className="overflow-hidden px-6 py-32 sm:px-14 md:px-20">
      <div className="relative mx-auto max-w-7xl">
        <h2 className="text-xl font-semibold sm:text-4xl">Skills</h2>
        <AnimatePresence>
          <div className="mt-4">
            <span className="text-xs font-semibold sm:text-sm">Languages</span>
            <div className="mt-2 flex flex-wrap gap-4 text-xl dark:text-zinc-100">
              {LANGUAGES.map((pill, index) => (
                <FadeRight
                  key={`lang-${index}`}
                  duration={0.4}
                  delay={0.1 + index * 0.1}
                  whileInView={!isMobileDebonced}
                  className="-z-20"
                >
                  <SkillPill {...pill} />
                </FadeRight>
              ))}
            </div>
          </div>
        </AnimatePresence>
        <AnimatePresence>
          <div className="mt-4">
            <span className="text-xs font-semibold sm:text-sm">
              Libraries and frameworks
            </span>
            <div className="mt-2 flex flex-wrap gap-4 text-xl dark:text-zinc-100">
              {LIBRARY_FRAMEWORK.map((pill, index) => (
                <FadeRight
                  key={`lib-frame-${index}`}
                  duration={0.4}
                  delay={0.1 + index * 0.1}
                  whileInView={!isMobileDebonced}
                  className="-z-20"
                >
                  <SkillPill {...pill} />
                </FadeRight>
              ))}
            </div>
          </div>
        </AnimatePresence>
        <AnimatePresence>
          <div className="mt-4">
            <span className="text-xs font-semibold sm:text-sm">Backend</span>
            <div className="mt-2 flex flex-wrap gap-3">
              {BACKEND_PILL.map((pill, index) => (
                <FadeRight
                  key={`backend-${index}`}
                  duration={0.4}
                  delay={0.1 + index * 0.1}
                  whileInView={!isMobileDebonced}
                  className="-z-20"
                >
                  <SkillPill {...pill} />
                </FadeRight>
              ))}
            </div>
          </div>
        </AnimatePresence>
        <AnimatePresence>
          <div className="mt-4">
            <span className="text-xs font-semibold sm:text-sm">
              Databases and ORMs
            </span>
            <div className="mt-2 flex flex-wrap gap-3">
              {DATABASE_ORM_PILL.map((pill, index) => (
                <FadeRight
                  key={`database-orm-${index}`}
                  duration={0.4}
                  delay={0.1 + index * 0.1}
                  whileInView={!isMobileDebonced}
                  className="-z-20"
                >
                  <SkillPill {...pill} />
                </FadeRight>
              ))}
            </div>
          </div>
        </AnimatePresence>
        <AnimatePresence>
          <div className="mt-4">
            <span className="text-xs font-semibold sm:text-sm">
              Tools and technologies
            </span>
            <div className="mt-2 flex flex-wrap gap-3">
              {TOOLS_TECHNOLOGIES.map((pill, index) => (
                <FadeRight
                  key={`tools-techs-${index}`}
                  duration={0.4}
                  delay={0.1 + index * 0.1}
                  whileInView={!isMobileDebonced}
                  className="-z-20"
                >
                  <SkillPill {...pill} />
                </FadeRight>
              ))}
            </div>
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
}
