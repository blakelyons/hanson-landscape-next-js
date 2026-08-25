const FORMSTACK_API_BASE = "https://www.formstack.com/api/v2";

export interface FormstackSubmissionField {
  field: string;
  value: string;
}

/**
 * Submits field values to a Formstack form via the Submissions API.
 * https://developers.formstack.com/docs/submission-create
 *
 * Requires FORMSTACK_API_KEY (server-only env var — never expose this to
 * the client). Called from app/api/contact/route.ts, not directly from
 * client components.
 */
export async function submitToFormstack(formId: string, fields: FormstackSubmissionField[]) {
  const apiKey = process.env.FORMSTACK_API_KEY;
  if (!apiKey) {
    throw new Error("FORMSTACK_API_KEY is not set");
  }

  const response = await fetch(`${FORMSTACK_API_BASE}/form/${formId}/submission.json`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ field: fields }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Formstack submission failed (${response.status}): ${text}`);
  }

  return response.json();
}
