import { type ExperienceShowcaseListItemProps } from "@/components/experience/experience-showcase-list-item";

export const EXPERIENCE: ExperienceShowcaseListItemProps[] = [
  {
    title: "Software Developer",
    organisation: {
      name: "Skima",
      href: "https://skima.ai/",
    },
    date: "Oct 2023 - Present",
    location: "Mumbai",
    description: "Reactjs and Nextjs app development",
  },
  {
    title: "Engineering Trainee",
    organisation: {
      name: "Hexaware",
      href: "https://hexaware.com/",
    },
    date: "July 2023 - Sep 2023",
    location: "Remote",
    description:
      "Learned to work we monorepo and got to learn application architecture, scalling and build tooling to improve CI/CD of micro services.",
  },
  {
    title: "Frontend Developer Intern",
    organisation: {
      name: "Master Infotech",
      href: "https://masterinfotech.com/",
    },
    date: "Winter - 2022",
    location: "Remote",
    description:
      "Worked on a team responsible for developing new features and updating old codebases to latest technologies. Learned alot about web development and CI/CD development cycle.",
  },
];
