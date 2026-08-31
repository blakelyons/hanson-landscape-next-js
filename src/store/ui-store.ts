import { create } from "zustand";

/**
 * Global UI state: mobile nav, modals/drawers, etc.
 *
 * This is the pattern to follow for future stores too — e.g. a portfolio
 * or blog filter store once Payload-backed content exists:
 *
 *   export const usePortfolioFilterStore = create<PortfolioFilterState>((set) => ({ ... }));
 *
 * Keep stores scoped to one concern each rather than one giant global store.
 */
interface UIState {
    isMobileNavOpen: boolean;
    activeModal: string | null;
    openMobileNav: () => void;
    closeMobileNav: () => void;
    toggleMobileNav: () => void;
    openModal: (id: string) => void;
    closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isMobileNavOpen: false,
    activeModal: null,
    openMobileNav: () => set({ isMobileNavOpen: true }),
    closeMobileNav: () => set({ isMobileNavOpen: false }),
    toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
    openModal: (id) => set({ activeModal: id }),
    closeModal: () => set({ activeModal: null }),
}));
