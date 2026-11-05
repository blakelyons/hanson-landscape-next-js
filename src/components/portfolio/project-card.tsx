import Image from "next/image";
import { TransitionLink } from "@/components/transitions/transition-link";
import type { PortfolioItem } from "@/content/projects";

const IMAGE_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

export function ProjectCard({ project }: { project: PortfolioItem }) {
    // Photo-Only Projects have no info or detail page yet: image only, not a link.
    if (project.photoOnly) {
        return (
            <div className="project-card relative aspect-4/3 w-full overflow-hidden rounded-lg">
                <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    fill
                    sizes={IMAGE_SIZES}
                    className="object-cover"
                />
            </div>
        );
    }

    return (
        <TransitionLink
            href={`/portfolio/${project.slug}`}
            className="project-card group flex w-full flex-col gap-4"
            aria-label={`View ${project.title}`}
        >
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg">
                <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    fill
                    sizes={IMAGE_SIZES}
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
            </div>
            <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-col gap-1.5">
                    <h3 className="font-serif-display text-2xl leading-7 font-normal text-black not-italic">
                        {project.title}
                    </h3>
                    <p className="font-sans text-sm text-black/60">
                        {project.location} — {project.services[0]}
                    </p>
                </div>
                <span className="bg-primary group-hover:bg-primary-light shrink-0 rounded-full px-4 py-2 text-xs font-medium text-white transition-colors duration-300">
                    View
                </span>
            </div>
        </TransitionLink>
    );
}
