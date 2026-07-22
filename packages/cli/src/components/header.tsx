import { useTheme } from "../providers/theme";

export function Header() {
    const { colors } = useTheme();

    return (
        <box justifyContent="center" alignItems="center">
            <box flexDirection="row" justifyContent="center" gap={0.5} alignItems="center">
                <ascii-font font="block" text="night" color={colors.primary} />
                <ascii-font font="block" text="code" />
            </box>
        </box>
    );
};