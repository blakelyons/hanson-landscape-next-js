import { describe, expect, it } from "vitest";
import type { Project } from "@/content/projects";
import {
    PAGE_SIZE,
    filterProjects,
    getRelatedProjects,
    parseSector,
    nextVisibleCount,
    buildPortfolioQuery,
} from "./portfolio";

const base: Omit<Project, "slug" | "title" | "sector" | "services" | "projectTypes" | "location" | "summary"> = {
    year: 2024,
    challenge: "c",
    solution: "s",
    cover: { src: "/x.jpg", alt: "x" },
    gallery: [],
};

function makeProject(overrides: Partial<Project> & Pick<Project, "slug">): Project {
    return {
        ...base,
        title: overrides.slug,
        location: "Naperville",
        summary: "A summary",
        sector: "residential",
        services: ["Landscape Design"],
        projectTypes: [],
        ...overrides,
    };
}

const projects: Project[] = [
    makeProject({ slug: "oak-hill", title: "Oak Hill Residence", services: ["Landscape Design"] }),
    makeProject({
        slug: "lakeview",
        title: "Lakeview Office Park",
        sector: "commercial",
        location: "Aurora",
        services: ["Landscape Maintenance"],
        projectTypes: ["Water Features"],
    }),
    makeProject({
        slug: "glen-ellyn",
        title: "Glen Ellyn Patio",
        location: "Glen Ellyn",
        services: ["Landscape Design", "Landscape Construction"],
        projectTypes: ["Patio & Hardscape"],
    }),
];

describe("filterProjects", () => {
    it("returns everything when sector is 'all' and the query is empty", () => {
        expect(filterProjects(projects, { sector: "all", query: "" })).toHaveLength(3);
    });

    it("filters by sector", () => {
        const result = filterProjects(projects, { sector: "commercial", query: "" });
        expect(result.map((p) => p.slug)).toEqual(["lakeview"]);
    });

    it("matches the query against title, location, summary, services and project types", () => {
        expect(filterProjects(projects, { sector: "all", query: "aurora" }).map((p) => p.slug)).toEqual(["lakeview"]);
        expect(filterProjects(projects, { sector: "all", query: "patio" }).map((p) => p.slug)).toEqual(["glen-ellyn"]);
        expect(filterProjects(projects, { sector: "all", query: "maintenance" }).map((p) => p.slug)).toEqual([
            "lakeview",
        ]);
        expect(filterProjects(projects, { sector: "all", query: "water features" }).map((p) => p.slug)).toEqual([
            "lakeview",
        ]);
    });

    it("is case-insensitive and ignores surrounding whitespace", () => {
        expect(filterProjects(projects, { sector: "all", query: "  OAK hill " }).map((p) => p.slug)).toEqual([
            "oak-hill",
        ]);
    });

    it("requires every word to match, in any order and across fields", () => {
        expect(filterProjects(projects, { sector: "all", query: "glen design" }).map((p) => p.slug)).toEqual([
            "glen-ellyn",
        ]);
        expect(filterProjects(projects, { sector: "all", query: "glen maintenance" })).toEqual([]);
    });

    it("does not search the long-form challenge/solution body", () => {
        const withBody = [makeProject({ slug: "body", challenge: "zebra crossing", solution: "giraffe" })];
        expect(filterProjects(withBody, { sector: "all", query: "zebra" })).toEqual([]);
    });

    it("combines sector and query", () => {
        expect(filterProjects(projects, { sector: "residential", query: "aurora" })).toEqual([]);
    });
});

describe("parseSector", () => {
    it("accepts known sectors and falls back to 'all'", () => {
        expect(parseSector("residential")).toBe("residential");
        expect(parseSector("commercial")).toBe("commercial");
        expect(parseSector("bogus")).toBe("all");
        expect(parseSector(null)).toBe("all");
        expect(parseSector(undefined)).toBe("all");
    });
});

describe("nextVisibleCount", () => {
    it("grows by one page, capped at the total", () => {
        expect(PAGE_SIZE).toBe(6);
        expect(nextVisibleCount(6, 14)).toBe(12);
        expect(nextVisibleCount(12, 14)).toBe(14);
        expect(nextVisibleCount(14, 14)).toBe(14);
    });
});

describe("buildPortfolioQuery", () => {
    it("omits default values so the clean URL stays clean", () => {
        expect(buildPortfolioQuery({ sector: "all", query: "" })).toBe("");
        expect(buildPortfolioQuery({ sector: "commercial", query: "" })).toBe("sector=commercial");
        expect(buildPortfolioQuery({ sector: "all", query: " patio " })).toBe("q=patio");
        expect(buildPortfolioQuery({ sector: "residential", query: "patio" })).toBe("sector=residential&q=patio");
    });
});

describe("getRelatedProjects", () => {
    it("lists projects sharing a service first and never includes the project itself", () => {
        const related = getRelatedProjects(projects[0], projects, 3);
        expect(related.map((p) => p.slug)).toEqual(["glen-ellyn", "lakeview"]);
    });

    it("returns only service matches when the limit is small", () => {
        expect(getRelatedProjects(projects[0], projects, 1).map((p) => p.slug)).toEqual(["glen-ellyn"]);
    });

    it("respects the limit", () => {
        expect(getRelatedProjects(projects[0], projects, 1)).toHaveLength(1);
    });
});
