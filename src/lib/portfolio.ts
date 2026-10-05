import { SECTORS, type Project, type Sector } from "@/content/projects";

/** Projects revealed per "Load More" batch (flat — same on every screen size). */
export const PAGE_SIZE = 6;

export type SectorFilter = Sector | "all";

export type PortfolioFilters = {
    sector: SectorFilter;
    query: string;
};

export function parseSector(value: string | null | undefined): SectorFilter {
    return SECTORS.find((sector) => sector === value) ?? "all";
}

// Title, location, summary, Services and Project Types only — the long-form
// challenge/solution body is intentionally not searched (predictable results).
function searchText(project: Project): string {
    return [project.title, project.location, project.summary, ...project.services, ...project.projectTypes]
        .join(" ")
        .toLowerCase();
}

export function filterProjects(projects: Project[], { sector, query }: PortfolioFilters): Project[] {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);

    return projects.filter((project) => {
        if (sector !== "all" && project.sector !== sector) return false;
        if (words.length === 0) return true;
        const haystack = searchText(project);
        return words.every((word) => haystack.includes(word));
    });
}

export function nextVisibleCount(current: number, total: number): number {
    return Math.min(current + PAGE_SIZE, total);
}

/** Query string (no leading "?") for the lister URL; defaults are omitted. */
export function buildPortfolioQuery({ sector, query }: PortfolioFilters): string {
    const params = new URLSearchParams();
    if (sector !== "all") params.set("sector", sector);
    const trimmed = query.trim();
    if (trimmed) params.set("q", trimmed);
    return params.toString();
}

/** Other Projects sharing a Service first, topped up with the rest if needed. */
export function getRelatedProjects(project: Project, all: Project[], limit: number): Project[] {
    const others = all.filter((candidate) => candidate.slug !== project.slug);
    const sharesService = (candidate: Project) =>
        candidate.services.some((service) => project.services.includes(service));

    return [...others.filter(sharesService), ...others.filter((candidate) => !sharesService(candidate))].slice(
        0,
        limit,
    );
}
