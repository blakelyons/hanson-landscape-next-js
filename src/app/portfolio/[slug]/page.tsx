import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/ui/page-hero";
import { StatCard } from "@/components/ui/stat-card";
import { Icon } from "@/components/ui/icon";
import { ArrowLink } from "@/components/ui/arrow-link";
import { TestimonialCard } from "@/components/home/testimonials-section";
import { ProjectGallery } from "@/components/portfolio/project-gallery";
import { ProjectCard } from "@/components/portfolio/project-card";
import { CtaSection } from "@/components/sections/cta-section";
import { PROJECTS, SECTOR_LABELS, getProjectBySlug } from "@/content/projects";
import { getRelatedProjects } from "@/lib/portfolio";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return {};
    return { title: project.title, description: project.summary };
}

const FACT_VALUE_CLASS = "font-serif-display text-2xl leading-8";

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) notFound();

    const related = getRelatedProjects(project, PROJECTS, 3);

    return (
        <div className="flex w-full flex-col bg-white">
            <SiteHeader variant="solid" />
            <PageHero
                breadcrumb={`Home  /  Portfolio  /  ${project.title}`}
                eyebrow={`${SECTOR_LABELS[project.sector].toUpperCase()}  ·  ${project.services[0].toUpperCase()}`}
                heading={project.title}
                description={project.summary}
            />

            <section className="container flex flex-col gap-12 py-12 lg:py-16">
                <ArrowLink href="/portfolio" icon="lucide:arrow-left" iconSize={14} iconPosition="left" className="w-fit">
                    Back to Portfolio
                </ArrowLink>

                <dl className="border-forrest/15 grid grid-cols-2 gap-8 border-y py-8 lg:grid-cols-4">
                    <StatCard
                        value={project.location}
                        label="Location"
                        labelFirst
                        className="text-forrest flex flex-col items-start"
                        valueClassName={FACT_VALUE_CLASS}
                    />
                    <StatCard
                        value={String(project.year)}
                        label="Completed"
                        labelFirst
                        className="text-forrest flex flex-col items-start"
                        valueClassName={FACT_VALUE_CLASS}
                    />
                    <StatCard
                        value={SECTOR_LABELS[project.sector]}
                        label="Sector"
                        labelFirst
                        className="text-forrest flex flex-col items-start"
                        valueClassName={FACT_VALUE_CLASS}
                    />
                    <StatCard
                        value={project.services.join(", ")}
                        label="Services"
                        labelFirst
                        className="text-forrest flex flex-col items-start"
                        valueClassName="font-serif-display text-xl leading-7"
                    />
                </dl>

                <ProjectGallery cover={project.cover} gallery={project.gallery} />

                <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                    {[
                        { icon: "lucide:mountain", title: "The challenge", body: project.challenge },
                        { icon: "lucide:hammer", title: "What we built", body: project.solution },
                    ].map((card) => (
                        <div
                            key={card.title}
                            className="border-forrest/15 flex flex-col gap-4 rounded-xl border bg-white p-8 shadow-sm"
                        >
                            <span className="bg-light-green-cta text-forrest flex size-12 items-center justify-center rounded-full">
                                <Icon icon={card.icon} width={24} height={24} />
                            </span>
                            <h2 className="font-serif-display text-forrest text-3xl">{card.title}</h2>
                            <p className="font-sans text-lg leading-7 text-black/70">{card.body}</p>
                        </div>
                    ))}
                </div>

                {project.testimonial ? (
                    <div className="mx-auto w-full max-w-xl">
                        <TestimonialCard {...project.testimonial} />
                    </div>
                ) : null}
            </section>

            <section className="bg-light-green-cta">
                <div className="container flex flex-col gap-10 py-16 lg:py-20">
                    <h2 className="font-serif-display text-forrest text-4xl">Related Projects</h2>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((relatedProject) => (
                            <ProjectCard key={relatedProject.slug} project={relatedProject} />
                        ))}
                    </div>
                </div>
            </section>

            <CtaSection />
            <SiteFooter />
        </div>
    );
}
