import { PageSEO } from "@/components/PageSEO";
import CursorTrailCanvas from "@/components/CursorTrailCanvas";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <CursorTrailCanvas
        color="hsla(183, 64%, 27%, 0.4)"
        className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      />
      <PageSEO
        title="Amit Chauhan | Home"
        description="Homepage of Amit Chauhan's portfolio"
      />
      <Hero />
    </>
  );
}
