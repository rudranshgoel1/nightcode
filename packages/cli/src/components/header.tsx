export function Header() {
    return (
        <box justifyContent="center" alignItems="center">
            <box flexDirection="row" justifyContent="center" gap={0.5} alignItems="center">
                <ascii-font font="block" text="night" color="gray" />
                <ascii-font font="block" text="code" />
            </box>
        </box>
    );
};