import { homedir } from "node:os";
import { join } from "node:path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const CONFIG_DIR = join(homedir(), ".nightcode");
const CONFIG_PATH = join(CONFIG_DIR, "config.json");

type Config = {
    groqApiKey?: string;
};

function readConfig(): Config {
    if (!existsSync(CONFIG_PATH)) return {};
    try {
        const raw = readFileSync(CONFIG_PATH, "utf-8");
        return JSON.parse(raw) as Config;
    } catch {
        return {};
    }
}

function writeConfig(config: Config): void {
    if (!existsSync(CONFIG_DIR)) {
        mkdirSync(CONFIG_DIR, { recursive: true });
    }
    writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
}

export function getGroqApiKey(): string | undefined {
    return readConfig().groqApiKey || process.env.GROQ_API_KEY || undefined;
}

export function setGroqApiKey(apiKey: string) {
    const config = readConfig();
    config.groqApiKey = apiKey;
    writeConfig(config);
}

export { CONFIG_PATH };
