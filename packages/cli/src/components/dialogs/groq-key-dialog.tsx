import { useCallback, useRef, useState } from "react";
import { InputRenderable, TextAttributes } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { useDialog } from "../../providers/dialog";
import { useToast } from "../../providers/toast";
import { useKeyboardLayer } from "../../providers/keyboard-layer";
import { useTheme } from "../../providers/theme";
import { setGroqApiKey } from "../../lib/config";

export const GroqKeyDialogContent = () => {
    const dialog = useDialog();
    const toast = useToast();
    const { isTopLayer } = useKeyboardLayer();
    const { colors } = useTheme();
    const inputRef = useRef<InputRenderable>(null);
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleContentChange = useCallback(() => {
        setValue(inputRef.current?.value ?? "");
        setError(null);
    }, []);

    const handleSubmit = useCallback(() => {
        const key = value.trim();
        if (key.length === 0) {
            setError("Paste your Groq API key to continue");
            return;
        }

        setGroqApiKey(key);
        toast.show({ variant: "success", message: "Groq API key saved" });
        dialog.close();
    }, [value, toast, dialog]);

    useKeyboard((key) => {
        if (!isTopLayer("dialog")) return;

        if (key.name === "return" || key.name === "enter") {
            handleSubmit();
        } else if (key.name === "escape") {
            dialog.close();
        }
    });

    return (
        <box flexDirection="column" gap={1}>
            <text attributes={TextAttributes.DIM}>
                Paste your Groq API key (from console.groq.com/keys)
            </text>
            <input
                ref={inputRef}
                placeholder="gsk_..."
                focused
                onContentChange={handleContentChange}
            />
            {error && <text fg={colors.error}>{error}</text>}
        </box>
    );
};
