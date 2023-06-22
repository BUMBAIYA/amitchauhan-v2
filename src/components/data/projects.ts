import covidTracker from "../../../public/images/projects/covidTracker.webp";
import kanbanBoardLight from "../../../public/images/projects/kanbanLight.webp";
import kanbanBoardDark from "../../../public/images/projects/kanbanDark.webp";
import ThreeDView from "../../../public/images/projects/3DView.webp";
import manyGamesLight from "../../../public/images/projects/manyGames.webp";
import manyGamesDark from "../../../public/images/projects/manyGamesDark.webp";
import { ProjectCard } from "../ProjectCard";
import { ProjectData } from "../ProjectList";

export const PROJECTS: ProjectCard[] = [
  {
    title: "Covid-19 Tracker",
    caption: "#Covid #First React App",
    date: "October, 2021",
    description:
      "Get all stats related to covid-19 through this applicaiton made using Reactjs and Material UI. It shows geographical impact of covid-19 using a map powered by React leaflet.",
    image: {
      url: covidTracker,
      alt: "Covid Tracker Image",
    },
    sourceCode: "https://github.com/BUMBAIYA/CovidTracker",
    websiteLink: "https://bumbaiya.github.io/CovidTracker",
  },
  {
    title: "Kanban board",
    caption: "#Personal #Management",
    date: "Feb, 2022",
    description:
      "Kanban board that help keep track of your projects and tasks made usign Reactja and Tailwindcss. Fully responsive and keyboard assecible made using Reactjs and React-beautifull-dnd library",
    image: {
      url: kanbanBoardLight,
      alt: "Kanban board Image",
    },
    darkImageUrl: kanbanBoardDark,
    sourceCode: "https://github.com/BUMBAIYA/kanban",
    websiteLink: "https://kannban-board.vercel.app/",
  },
  {
    title: "3D View",
    caption: "#Java #Render Engine",
    date: "June, 2022",
    description:
      "Game engine from scratch using Java and Opengl. I learn new languages by making engaging and coersive project that always have my interest. This engine includes 3D model loading, shaders, water rendering, shadow rendering, skybox and text rendering.",
    image: {
      url: ThreeDView,
      alt: "3D View Image",
    },
    sourceCode: "https://github.com/BUMBAIYA/3DView",
  },
  {
    title: "Many Games",
    caption: "#Fun #challenging",
    date: "March, 2023",
    description:
      "Website made using Reactjs, tailwindcss and Scss. Many small word and puzzle games are hosted on this website. This project demanded very high programming skills and countless hours of debugging as there were many edge cases in the games.",
    image: {
      url: manyGamesLight,
      alt: "Many games Image",
    },
    darkImageUrl: manyGamesDark,
    sourceCode: "https://github.com/BUMBAIYA/manygames",
    websiteLink: "https://manygames.vercel.app/",
  },
];

export const PROJECT_LIST: ProjectData[] = [
  {
    index: 0,
    title: "Many Games",
    href: "#",
    tags: [
      "React",
      "Vite",
      "Tainwindcss",
      "Fully responsive",
      "API",
      "SCSS",
      "Redux",
      "React Router",
    ],
    image: "/images/projects/manyGames.webp",
  },
  {
    index: 1,
    title: "Kanban",
    href: "#",
    tags: ["Nextjs", "Vite", "Tailwindcss", "Fully responsive", "React DND"],
    image: "/images/projects/kanbanLight.webp",
  },
  {
    index: 2,
    title: "Covid Tracker",
    href: "#",
    tags: [
      "React",
      "Styled Component",
      "Fully responsive",
      "API",
      "MUI",
      "Map",
    ],
    image: "/images/projects/covidTracker.webp",
  },
];
