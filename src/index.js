import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

import { TELEGRAM_TOKEN } from "./constants.js";
import { createContext, sendTextHandler, sendVoiceHandler } from "./handlers.js";

const bot = new Telegraf(TELEGRAM_TOKEN);

bot.command("start", async (ctx) => createContext(ctx));
bot.command("new", async (ctx) => createContext(ctx));
bot.on(message("text"), async (ctx) => sendTextHandler(ctx));
bot.on(message("voice"), async (ctx) => sendVoiceHandler(ctx));

bot.launch();

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());
