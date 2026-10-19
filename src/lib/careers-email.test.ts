import { describe, expect, it } from "vitest";
import { buildCareersEmail, isAllowedResume, validateCareers } from "./careers-email";

const valid = { name: "Pat", email: "pat@example.com", phone: "", message: "Looking for crew work" };

describe("validateCareers", () => {
    it("accepts a complete submission", () => {
        expect(validateCareers(valid).ok).toBe(true);
    });

    it("requires name, a valid email and a message", () => {
        expect(validateCareers({ ...valid, name: " " }).ok).toBe(false);
        expect(validateCareers({ ...valid, email: "nope" }).ok).toBe(false);
        expect(validateCareers({ ...valid, message: "" }).ok).toBe(false);
    });

    it("rejects over-length fields", () => {
        expect(validateCareers({ ...valid, name: "x".repeat(101) }).ok).toBe(false);
        expect(validateCareers({ ...valid, phone: "1".repeat(41) }).ok).toBe(false);
        expect(validateCareers({ ...valid, message: "x".repeat(5001) }).ok).toBe(false);
    });
});

describe("isAllowedResume", () => {
    it("allows pdf/doc/docx and blocks images, executables and oversized files", () => {
        expect(isAllowedResume({ name: "cv.PDF", size: 10 })).toBeNull();
        expect(isAllowedResume({ name: "cv.docx", size: 10 })).toBeNull();
        expect(isAllowedResume({ name: "photo.jpg", size: 10 })).toMatch(/not allowed/);
        expect(isAllowedResume({ name: "cv.exe", size: 10 })).toMatch(/not allowed/);
        expect(isAllowedResume({ name: "cv.pdf", size: 11 * 1024 * 1024 })).toMatch(/too large/);
    });
});

describe("buildCareersEmail", () => {
    it("escapes HTML, strips newlines from the subject and reports the resume", () => {
        const result = validateCareers({ ...valid, name: "A\r\nBcc: x@y.com", message: "<script>x</script>" });
        if (!result.ok) throw new Error("expected valid");
        const email = buildCareersEmail(result.submission, true);
        expect(email.subject).not.toMatch(/[\r\n]/);
        expect(email.html).not.toContain("<script>");
        expect(email.html).toContain("&lt;script&gt;");
        expect(email.text).toContain("Resume attached: Yes");
        expect(buildCareersEmail(result.submission, false).text).toContain("Resume attached: No");
    });
});
