import { useEffect, useRef } from "react";
import { useNavigate, useLocation, useLoaderData } from "react-router";
import { SessionShell } from "../components/session-shell";
import { ErrorMessage, UserMessage, BotMessage } from "../components/messages";
import { useChat } from "../hooks/use-chat";

export function NewSession() {
    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state as { message?: string } | null;
    const { messages, loading, sendMessage, startWith } = useChat();
    const started = useRef(false);

    useEffect(() => {
        if (!state?.message) {
            navigate("/", { replace: true });
            return;
        }
        if (!started.current) {
            started.current = true;
            startWith(state.message);
        }
    }, [state, navigate, startWith]);

    if (!state?.message) return null;

    return (
        <SessionShell onSubmit={sendMessage} inputDisabled={loading} loading={loading}>
            {messages.map((m, i) => {
                if (m.kind === "user") return <UserMessage key={i} message={m.text} />;
                if (m.kind === "bot") return <BotMessage key={i} content={m.text} model={m.model} />;
                return <ErrorMessage key={i} message={m.text} />;
            })}
        </SessionShell>
    );
}