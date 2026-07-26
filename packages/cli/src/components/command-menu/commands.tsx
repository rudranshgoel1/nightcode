import { ThemeDialogContent, GroqKeyDialogContent } from "../dialogs";
import { openBrowser } from "../../lib/browser";
import type { Command } from "./types";

// clerk auth
const CLERK_SIGN_IN_URL = "https://sought-mule-22.accounts.dev/sign-in";
const CLERK_SIGN_UP_URL = "https://sought-mule-22.accounts.dev/sign-up";

export const COMMANDS: Command[] = [
    {
        name: "new",
        description: "Start a new conversation",
        value: "/new",
        action: (ctx) => {
            ctx.navigate("/");
        }
    },
    {
        name: "agents",
        description: "Switch agents",
        value: "/agents",
        action: (ctx) => {
            ctx.dialog.open({
                title: "Select Mode",
                children: <text>Agent selection coming soon...</text>
            });
        },
    },
    {
        name: "models",
        description: "Select AI model for generation",
        value: "/models",
        action: (ctx) => {
            ctx.dialog.open({
                title: "Select Model",
                children: <text>Model selection coming soon...</text>
            });
        }
    },
    {
        name: "sessions",
        description: "Browse past sessions",
        value: "/sessions",
        action: (ctx) => {
            ctx.toast.show({ message: "Loading sessions..." });
        }
    },
    {
        name: "theme",
        description: "Change color theme",
        value: "/theme",
        action: (ctx) => {
            ctx.dialog.open({
                title: "Select Theme",
                children: <ThemeDialogContent />
            })
        }
    },
    {
        name: "login",
        description: "Sign in with your browser",
        value: "/login",
        action: (ctx) => {
            openBrowser(CLERK_SIGN_IN_URL);
            ctx.toast.show({ message: "Opening browser to sign in..." });
            ctx.dialog.open({
                title: "Connect Groq",
                children: <GroqKeyDialogContent />
            });
        }
    },
    {
        name: "signup",
        description: "Create an account in your browser",
        value: "/signup",
        action: (ctx) => {
            openBrowser(CLERK_SIGN_UP_URL);
            ctx.toast.show({ message: "Opening browser to sign up..." });
            ctx.dialog.open({
                title: "Connect Groq",
                children: <GroqKeyDialogContent />
            });
        }
    },
    {
        name: "logout",
        description: "Sign out of your account",
        value: "/logout",
        action: (ctx) => {
            ctx.toast.show({ variant: "success", message: "Signed out" });
        }
    },
    {
        name: "upgrade",
        description: "Buy more credits",
        value: "/upgrade",
        action: (ctx) => {
            ctx.toast.show({ message: "Opening credits checkout..." });
        }
    },
    {
        name: "usage",
        description: "Open billing portal in your browser",
        value: "/usage",
        action: (ctx) => {
            ctx.toast.show({ message: "Opening billing portal..." });
        }
    },
    {
        name: "exit",
        description: "Quit the application",
        value: "/exit",
        action: (ctx) => {
            ctx.exit();
        },
    },
];