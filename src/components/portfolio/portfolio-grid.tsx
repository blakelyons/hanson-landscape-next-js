"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PillButton } from "@/components/ui/pill-button";
import { PortfolioFilterBar } from "@/components/portfolio/portfolio-filter-bar";
import { ProjectCard } from "@/components/portfolio/project-card";
import type { Project } from "@/content/projects";
import {
    PAGE_SIZE,
    buildPortfolioQuery,
    filterProjects,
    nextVisibleCount,
    parseSector,
    type PortfolioFilters,
} from "@/lib/portfolio";

// Filters are held in state (instant results) and mirrored into the URL with
// history.replaceState so a filtered view survives navigating to a Project
// and back, without re-rendering through the router on every keystroke.
function syncUrl(filters: PortfolioFilters) {
    const query = buildPortfolioQuery(filters);
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
}

export function PortfolioGrid({ projects }: { projects: Project[] }) {
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState<PortfolioFilters>(() => ({
        sector: parseSector(searchParams.get("sector")),
        query: searchParams.get("q") ?? "",
    }));
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const updateFilters = (next: PortfolioFilters) => {
        setFilters(next);
        setVisibleCount(PAGE_SIZE);
        syncUrl(next);
    };

    const matches = filterProjects(projects, filters);
    const visible = matches.slice(0, visibleCount);
    const hasMore = visible.length < matches.length;

    return (
        <div className="flex flex-col gap-12">
            <PortfolioFilterBar
                sector={filters.sector}
                query={filters.query}
                onSectorChange={(sector) => updateFilters({ ...filters, sector })}
                onQueryChange={(query) => updateFilters({ ...filters, query })}
            />

            {matches.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                    <p className="font-serif-display text-3xl text-black">No projects match your search.</p>
                    <button
                        type="button"
                        onClick={() => updateFilters({ sector: "all", query: "" })}
                        className="text-forrest font-sans text-base font-medium underline underline-offset-4"
                    >
                        Clear filters
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {visible.map((project) => (
                            <ProjectCard key={project.slug} project={project} />
                        ))}
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <p aria-live="polite" className="font-sans text-sm text-black/60">
                            Showing {visible.length} of {matches.length}
                        </p>
                        {hasMore ? (
                            <PillButton
                                variant="outline-secondary"
                                size="sm"
                                textClassName="text-forrest"
                                href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setVisibleCount((count) => nextVisibleCount(count, matches.length));
                                }}
                            >
                                Load More
                            </PillButton>
                        ) : null}
                    </div>
                </>
            )}
        </div>
    );
}
