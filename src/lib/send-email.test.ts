import { afterEach, describe, expect, it, vi } from "vitest";
import { sendEmail } from "./send-email";

afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
});

describe("sendEmail", () => {
    it("splits a comma-separated `to` into multiple recipients", async () => {
        vi.stubEnv("RESEND_API_KEY", "re_test");
        const fetchMock = vi.fn().mockResolvedValue({ ok: true });
        vi.stubGlobal("fetch", fetchMock);

        await sendEmail({
            to: "a@example.com, b@example.com ,",
            from: "Site <forms@example.com>",
            replyTo: "visitor@example.com",
            subject: "Hi",
            text: "t",
            html: "<p>t</p>",
        });

        const body = JSON.parse(fetchMock.mock.calls[0][1].body);
        expect(body.to).toEqual(["a@example.com", "b@example.com"]);
    });
});
