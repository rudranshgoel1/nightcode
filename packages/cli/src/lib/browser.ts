export function openBrowser(url: string): void {
    const platform = process.platform;
    const command =
        platform === "darwin" ? "open" : platform === "win32" ? "start" : "xdg-open";

    try {
        Bun.spawn({
            cmd: platform === "win32" ? ["cmd", "/c", command, url] : [command, url],
            stdout: "ignore",
            stderr: "ignore",
        });
    } catch {
        // if browser fails, cli still works (why wouldn't it cro)
    }
}
