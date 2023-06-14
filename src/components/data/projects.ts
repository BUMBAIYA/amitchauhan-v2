import covidTracker from "../../../public/images/projects/covidTracker.webp";
import kanbanBoardLight from "../../../public/images/projects/kanbanLight.webp";
import kanbanBoardDark from "../../../public/images/projects/kanbanDark.webp";
import ThreeDView from "../../../public/images/projects/3DView.webp";
import manyGamesLight from "../../../public/images/projects/ManyGamesLight.webp";
import manyGamesDark from "../../../public/images/projects/manyGamesDark.webp";
import { ProjectCard } from "../ProjectCard";

export const PROJECTS: ProjectCard[] = [
  {
    title: "Covid-19 Tracker",
    caption: "#Covid #First React App",
    date: "October, 2021",
    description:
      "Get all stats related to covid-19 through this applicaiton made using Reactjs and Material UI. It shows geographical impact of covid-19 using a map powered by React leaflet.",
    imageUrl: covidTracker,
    sourceCode: "https://github.com/BUMBAIYA/CovidTracker",
    websiteLink: "https://bumbaiya.github.io/CovidTracker",
  },
  {
    title: "Kanban board",
    caption: "#Personal #Management",
    date: "Feb, 2022",
    description:
      "Kanban board that help keep track of your projects and tasks made usign Reactja and Tailwindcss. Fully responsive and keyboard assecible made using Reactjs and React-beautifull-dnd library",
    imageUrl: kanbanBoardLight,
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
    imageUrl: ThreeDView,
    sourceCode: "https://github.com/BUMBAIYA/3DView",
  },
  {
    title: "Many Games",
    caption: "#Fun #challenging",
    date: "March, 2023",
    description:
      "Website made using Reactjs, tailwindcss and Scss. Many small word and puzzle games are hosted on this website. This project demanded very high programming skills and countless hours of debugging as there were many edge cases in the games.",
    imageUrl: manyGamesLight,
    darkImageUrl: manyGamesDark,
    sourceCode: "https://github.com/BUMBAIYA/manygames",
    websiteLink: "https://manygames.vercel.app/",
  },
];
