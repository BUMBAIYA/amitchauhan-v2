import { PageSEO } from "@/components/PageSEO";
import { cursorTrail } from "@/components/utility/cursorTrail";
import { useEffect, useRef } from "react";

export default function Home() {
  const refCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    cursorTrail({ ref: refCanvas });
  }, []);

  return (
    <>
      <PageSEO
        title="Amit Chauhan | Home"
        description="Homepage of Amit Chauhan's portfolio"
      />
      <canvas
        ref={refCanvas}
        className="pointer-events-none absolute inset-0"
      ></canvas>
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h1 className="text-6xl font-bold md:text-6xl">
            Creative frontend developer, coder
          </h1>
          <p className="mt-8 text-lg font-semibold text-zinc-600 md:text-xl">
            I&apos;m Amit Chauhan, a frontend developer based in Mumbai, India.
            I craft captivative user intefaces and designs.
          </p>
        </div>
      </div>
    </>
  );
}
