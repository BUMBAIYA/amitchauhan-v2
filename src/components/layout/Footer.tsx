import { GithubIcon, LinkedinIcon, TwitterIcon } from "../Icons";

export default function Footer() {
  return (
    <footer className="flex h-20 w-full items-center bg-transparent px-6 sm:px-14 md:px-20">
      <div className="flex w-full flex-col items-center justify-between gap-8 py-8 text-center  md:flex-row md:justify-between lg:mx-auto lg:max-w-7xl">
        <span>©2023 Amit Chauhan</span>
        <div className="flex gap-8">
          <a
            href="https://github.com/BUMBAIYA"
            target="_blank"
            className="h-6 w-6"
          >
            <GithubIcon className="text-teal-600 transition-colors duration-150 hover:text-tera-500 dark:text-teal-400 dark:hover:text-white" />
          </a>
          <a
            href="https://twitter.com/amitcha2638"
            target="_blank"
            className="h-6 w-6"
          >
            <TwitterIcon className="text-teal-600 transition-colors duration-150 hover:text-tera-500 dark:text-teal-400 dark:hover:text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/amit-chauhan-b2579b223/"
            target="_blank"
            className="h-6 w-6"
          >
            <LinkedinIcon className="text-teal-600 transition-colors duration-150 hover:text-tera-500 dark:text-teal-400 dark:hover:text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
}
