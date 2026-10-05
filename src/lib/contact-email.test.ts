import { describe, expect, it } from "vitest";
import { buildContactEmail, isAllowedAttachment, validateContact } from "./contact-email";

const valid = { name: "Pat", email: "pat@example.com", phone: "", service: "snow-and-ice-management", message: "Hi" };

describe("validateContact", () => {
    it("accepts a complete submission and resolves the service label", () => {
        const result = validateContact(valid);
        expect(result.ok && result.submission.serviceLabel).toBe("Snow & Ice Management");
    });

    it("rejects bad email and empty message", () => {
        expect(validateContact({ ...valid, email: "nope" }).ok).toBe(false);
        expect(validateContact({ ...valid, message: " " }).ok).toBe(false);
    });

    it("falls back to 'Not specified' for unknown services", () => {
        const result = validateContact({ ...valid, service: "bogus" });
        expect(result.ok && result.submission.serviceLabel).toBe("Not specified");
    });
});

describe("isAllowedAttachment", () => {
    it("blocks oversized and unlisted types", () => {
        expect(isAllowedAttachment({ name: "a.pdf", size: 11 * 1024 * 1024 })).toMatch(/too large/);
        expect(isAllowedAttachment({ name: "a.exe", size: 10 })).toMatch(/not allowed/);
        expect(isAllowedAttachment({ name: "a.JPG", size: 10 })).toBeNull();
    });
});

describe("buildContactEmail", () => {
    it("escapes HTML and strips newlines from the subject", () => {
        const result = validateContact({ ...valid, name: "A\nB", message: "<script>x</script>" });
        if (!result.ok) throw new Error("expected valid");
        const email = buildContactEmail(result.submission);
        expect(email.subject).not.toMatch(/\n/);
        expect(email.html).not.toContain("<script>");
        expect(email.html).toContain("&lt;script&gt;");
    });
});
