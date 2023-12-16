import { NextSeo } from "next-seo";
import { PageSEO } from "@/components/PageSEO";
import CursorTrailCanvas from "@/components/CursorTrailCanvas";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Project from "@/components/ProjectShowcase";
import { PROJECT_SHOWCASE } from "@/data/projects";
import { siteMetadata } from "@/data/siteMetaData";

export default function Home() {
  return (
    <>
      <CursorTrailCanvas
        color="hsla(183, 64%, 27%, 0.4)"
        className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      />
      <NextSeo
        title="Amit Chauhan | React and Frontend Developer"
        description="Explore the professional portfolio of Amit Chauhan, a skilled React and Frontend Developer with 2 years of hands-on experience. Discover innovative projects, expertise in modern web technologies, and a passion for creating seamless user experiences."
        canonical={siteMetadata.siteUrl}
        openGraph={{
          url: siteMetadata.siteUrl,
          title: "Amit Chauhan - React and Frontend Developer Portfolio",
          description:
            "Dive into the world of web development with Amit Chauhan. Discover a React and Frontend Developer with 2 years of expertise, showcasing cutting-edge projects and a commitment to crafting exceptional user interfaces.",
          images: [
            {
              url: `${siteMetadata.siteUrl}${siteMetadata.twitterImage}`,
              alt: "Amit Chauhan - Portfolio Image",
            },
          ],
          siteName: siteMetadata.siteName,
          type: "website",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "React Developer, Frontend Developer, Web Developer, JavaScript, HTML, CSS, Portfolio, UI/UX, React.js, Frontend Development, Web Development, JavaScript Developer, Responsive Design",
          },
        ]}
      />
      <Hero />
      <Skills />
      <Project projects={PROJECT_SHOWCASE} />
    </>
  );
}
