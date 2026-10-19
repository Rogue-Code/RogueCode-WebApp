import Link from "next/link";
import { ArrowLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { projects, type Project } from "@/data/studio";

function Screenshot({ project, large }: { project: Project; large: boolean }) {
  return (
    <Photo
      src={project.image}
      alt={`${project.name} screenshot`}
      sizes={large ? "(min-width: 1280px) 760px, 100vw" : "(min-width: 1280px) 400px, 100vw"}
      contain
      label="[PROJECT SCREENSHOT]"
      className="aspect-[16/10] rounded-[20px] border border-edge bg-royal"
    />
  );
}

function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <Link href="#work" className={`flex flex-col text-paper ${large ? "gap-4.5" : "gap-3.5"}`}>
      <Screenshot project={project} large={large} />
      <div className={`flex flex-wrap items-baseline justify-between ${large ? "gap-4" : "gap-3"}`}>
        <span className={large ? "text-[26px] font-semibold tracking-[-0.02em]" : "text-xl font-semibold"}>
          {project.name}
        </span>
        <span className={`font-mono text-muted ${large ? "text-[13px]" : "text-xs"}`}>
          {project.client ? `${project.client} · ${project.type}` : project.type}
        </span>
      </div>
    </Link>
  );
}

export function Work() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="border-t border-line">
      <div className="container-page py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionTitle>Selected work</SectionTitle>
          <ArrowLink href="#work">All projects</ArrowLink>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex-[2_1_520px]">
            <ProjectCard project={featured} large />
          </div>
          <div className="flex flex-[1_1_320px] flex-col gap-6">
            {rest.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
