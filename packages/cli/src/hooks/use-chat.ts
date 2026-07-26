import { useCallback, useState } from "react";
import { sendChatMessage, GROQ_MODEL, GroqError, type ChatMessage } from "../lib/groq";

export type DisplayMessage =
    | { kind: "user"; text: string }
    | { kind: "bot"; text: string; model: string }
    | { kind: "error"; text: string };

export function useChat(initalUserMessage?: string) {
    const [messages, setMessages] = useState<DisplayMessage[]>(
        initalUserMessage ? [{ kind: "user", text: initalUserMessage }] : []
    );
    const [loading, setLoading] = useState(false);

    const historyFor = useCallback((history: DisplayMessage[]): ChatMessage[] => {
        return history
            .filter((m): m is Extract<DisplayMessage, { kind: "user" | "bot" }> =>
                m.kind === "user" || m.kind === "bot"
            )
            .map((m) => ({
                role: m.kind === "user" ? "user" : "assistant",
                content: m.text,
            }));
    }, []);

    const runCompletion = useCallback(
        async (history: DisplayMessage[]) => {
            setLoading(true);
            try {
                const reply = await sendChatMessage(historyFor(history));
                setMessages((prev) => [...prev, { kind: "bot", text: reply, model: GROQ_MODEL }]);
            } catch (err) {
                const text =
                    err instanceof GroqError
                        ? err.message
                        : `Something went wrong: ${err instanceof Error ? err.message : String(err)}`;
                setMessages((prev) => [...prev, { kind: "error", text }]);
            } finally {
                setLoading(false);
            }
        },
        [historyFor]
    );

    const sendMessage = useCallback(
        (text: string) => {
            setMessages((prev) => {
                const next: DisplayMessage[] = [...prev, { kind: "user", text }];
                runCompletion(next);
                return next;
            });
        }, [runCompletion]);

    const startWith = useCallback(
        (text: string) => {
            const inital: DisplayMessage[] = [{ kind: "user", text }];
            setMessages(inital);
            runCompletion(inital);
        },
        [runCompletion]
    );

    return { messages, loading, sendMessage, startWith };
}