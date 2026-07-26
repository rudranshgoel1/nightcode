import { TextAttributes } from "@opentui/core";
import { useTheme } from "../providers/theme";
import { GROQ_MODEL } from "../lib/groq";

export function StatusBar() {
    const { colors } = useTheme();

    return (
        <box flexDirection="row" gap={1}>
            <text fg={colors.primary}>Build</text>
            <text attributes={TextAttributes.DIM} fg={colors.dimSeparator}>
                &#8250;
            </text>
            <text>{GROQ_MODEL}</text>
        </box>
    )
}