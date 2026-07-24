import { useParams } from "react-router";
import { SessionShell } from "../components/session-shell";
import { ErrorMessage, UserMessage, BotMessage } from "../components/messages";
import { useChat } from "../hooks/use-chat";


export function Session() {
    const { id } = useParams();
    const { messages, loading, sendMessage } = useChat();

    return (
        <SessionShell onSubmit={sendMessage} inputDisabled={loading} loading={loading}>
            {messages.map((m, i) => {
                if (m.kind === "user") return <UserMessage key={i} message={m.text} />;
                if (m.kind === "bot") return <BotMessage key={i} content={m.text} model={m.model} />;
                return <ErrorMessage key={i} message={m.text} />;
            })}
        </SessionShell>
    )
}