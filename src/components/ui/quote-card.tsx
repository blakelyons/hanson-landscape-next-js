import { PillButton } from "@/components/ui/pill-button";
import { CONTACT_PATH } from "@/content/site";

/** Compact "heading + Get a Free Quote" card used at the foot of interior pages. */
export function QuoteCard({ heading, href = CONTACT_PATH }: { heading: string; href?: string }) {
    return (
        <div className="border-forrest/15 mx-auto flex w-full max-w-240 flex-col items-start justify-between gap-6 rounded-xl border bg-[#f6f7f4] p-8 sm:flex-row sm:items-center">
            <p className="font-serif-display text-forrest text-2xl leading-8">{heading}</p>
            <PillButton variant="secondary" size="md" icon="lucide:arrow-right" animateIconOnHover href={href}>
                Get a Free Quote
            </PillButton>
        </div>
    );
}
