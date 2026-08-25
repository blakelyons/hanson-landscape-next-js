import { beforeEach, describe, expect, it } from "vitest";
import { useUIStore } from "./ui-store";

describe("useUIStore", () => {
  beforeEach(() => {
    useUIStore.setState({ isMobileNavOpen: false, activeModal: null });
  });

  it("toggles the mobile nav", () => {
    useUIStore.getState().toggleMobileNav();
    expect(useUIStore.getState().isMobileNavOpen).toBe(true);

    useUIStore.getState().toggleMobileNav();
    expect(useUIStore.getState().isMobileNavOpen).toBe(false);
  });

  it("opens and closes a modal by id", () => {
    useUIStore.getState().openModal("contact");
    expect(useUIStore.getState().activeModal).toBe("contact");

    useUIStore.getState().closeModal();
    expect(useUIStore.getState().activeModal).toBeNull();
  });
});
