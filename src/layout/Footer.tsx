import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="my-8 flex w-full flex-col items-center gap-20 bg-transparent px-6 sm:px-14 md:px-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 rounded-2xl bg-teal-600 p-8 text-zinc-100 dark:bg-teal-500 sm:p-12 md:gap-12 lg:p-20">
        <div className="text-center">
          <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase text-tera-500">
            Get in touch
          </span>
        </div>
        <a
          href="mailto:amitchauhan263871@gmail.com"
          target="_blank"
          className="mb-6 cursor-pointer text-center text-2xl font-bold underline sm:text-4xl lg:text-7xl"
        >
          <span>amitchauhan263871@</span>
          <br />
          <span>gmail.com</span>
        </a>
      </div>
      <div className="flex w-full flex-col items-center justify-between gap-8 text-center  md:flex-row md:justify-between lg:mx-auto lg:max-w-7xl">
        <span>©2023 Amit Chauhan</span>
        <div className="flex gap-8">
          <a
            href="https://github.com/BUMBAIYA"
            target="_blank"
            className="h-6 w-6"
            aria-label="link to Github"
          >
            <GithubIcon className="text-teal-600 transition-colors duration-150 hover:text-tera-500 dark:text-teal-400 dark:hover:text-white" />
          </a>
          <a
            href="https://twitter.com/amitcha2638"
            target="_blank"
            className="h-6 w-6"
            aria-label="link to Twitter"
          >
            <TwitterIcon className="text-teal-600 transition-colors duration-150 hover:text-tera-500 dark:text-teal-400 dark:hover:text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/amit-chauhan-b2579b223/"
            target="_blank"
            className="h-6 w-6"
            aria-label="link to Linkedin"
          >
            <LinkedinIcon className="text-teal-600 transition-colors duration-150 hover:text-tera-500 dark:text-teal-400 dark:hover:text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
}
