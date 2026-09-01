import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement matchMedia; components that use it (breakpoint
// listeners) need at least a no-op stub to mount without throwing.
if (!window.matchMedia) {
    window.matchMedia = (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    });
}
