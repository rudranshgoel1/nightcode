const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
    role: ChatRole;
    content: string;
};

export class GroqError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "GroqError";
    }
}

export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        throw new GroqError(
            "GROQ_API_KEY is not set. Include it in .env"
        );
    }

    let response: Response;
    try {
        response = await fetch(GROQ_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages,
            }),
        });
    } catch (err) {
        throw new GroqError(
            `Failed to reach GROQ API: ${err instanceof Error ? err.message : String(err)}`
        );
    }

    if (!response.ok) {
        let detail = "";
        try {
            const body = await response.json();
            detail = body?.error?.message ?? JSON.stringify(body);
        } catch {
            detail = await response.text().catch(() => "");
        }
        throw new GroqError(
            `Groq API request failed (${response.status}): ${detail || response.statusText}`
        );
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (typeof content !== "string") {
        throw new GroqError("Groq API returned an unexpected response shape.")
    }

    return content;
}

export { GROQ_MODEL };