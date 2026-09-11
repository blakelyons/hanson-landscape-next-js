export type PageTransitionType = "doors-forrest" | "iris-leaf" | "cross-fade" | "none";

// Single source of truth for which transition plays when navigating TO a
// given route. Add a route here (or change its value) to change its
// transition — everything else reads through getPageTransition.
export const PAGE_TRANSITIONS: Record<string, PageTransitionType> = {
    "/": "cross-fade",
    "/about": "cross-fade",
};

export const DEFAULT_PAGE_TRANSITION: PageTransitionType = "cross-fade";

export function getPageTransition(pathname: string): PageTransitionType {
    return PAGE_TRANSITIONS[pathname] ?? DEFAULT_PAGE_TRANSITION;
}
