import { Icon } from "@/components/ui/icon";
import { InputText } from "@/components/ui/form-elements";
import { SECTOR_LABELS, SECTORS } from "@/content/projects";
import type { SectorFilter } from "@/lib/portfolio";

const OPTIONS: { value: SectorFilter; label: string }[] = [
    { value: "all", label: "All Projects" },
    ...SECTORS.map((sector) => ({ value: sector, label: SECTOR_LABELS[sector] })),
];

type PortfolioFilterBarProps = {
    sector: SectorFilter;
    query: string;
    onSectorChange: (sector: SectorFilter) => void;
    onQueryChange: (query: string) => void;
};

export function PortfolioFilterBar({ sector, query, onSectorChange, onQueryChange }: PortfolioFilterBarProps) {
    return (
        <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
            <div className="hidden md:block" aria-hidden />
            <div
                role="group"
                aria-label="Filter projects by sector"
                className="border-forrest/15 bg-light-green-cta mx-auto flex w-fit items-center gap-4 rounded-full border p-1"
            >
                {OPTIONS.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        aria-pressed={sector === option.value}
                        onClick={() => onSectorChange(option.value)}
                        className={`cursor-pointer rounded-full px-5 py-2 font-sans text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                            sector === option.value ? "bg-forrest text-white" : "text-forrest hover:bg-forrest/10"
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            <div className="relative w-full md:max-w-72 md:justify-self-end">
                <label htmlFor="portfolio-search" className="sr-only">
                    Search projects
                </label>
                <Icon
                    icon="lucide:search"
                    width={16}
                    height={16}
                    className="text-forrest/60 pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
                />
                <InputText
                    id="portfolio-search"
                    type="search"
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    placeholder="Search projects"
                    autoComplete="off"
                    className="rounded-full! py-2.5 pl-10"
                />
            </div>
        </div>
    );
}
