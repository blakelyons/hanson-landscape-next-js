import { ArrowLink } from "@/components/ui/arrow-link";

export function PortfolioBento() {
    return (
        <section className="relative flex w-full flex-col items-center overflow-clip">
            <div className="container flex flex-col items-end justify-center gap-4 pt-12 pb-20">
                <ArrowLink
                    href="#"
                    icon="lucide:arrow-right"
                    iconSize={14}
                    textClassName="text-forrest text-base font-medium"
                    className="shrink-0 items-center justify-center rounded-full"
                >
                    View All Projects
                </ArrowLink>

                <div className="portfolio-bento-grid"></div>
            </div>
        </section>
    );
}
