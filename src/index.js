import { Telegraf, session } from "telegraf";
import { message } from "telegraf/filters";

import { TELEGRAM_TOKEN } from "./constants.js";
import { createContext, createSpeechContext, sendTextHandler, sendVoiceHandler } from "./handlers.js";

const bot = new Telegraf(TELEGRAM_TOKEN);

bot.use(session());

let useTTS = false;

bot.command("start", async (ctx) => {
  useTTS = false;
  createContext(ctx);
});
bot.command("new", async (ctx) => {
  useTTS = false;
  createContext(ctx);
});
bot.command("speech", async (ctx) => {
  useTTS = true;
  createSpeechContext(ctx);
});
bot.on(message("text"), async (ctx) => sendTextHandler(ctx, useTTS));
bot.on(message("voice"), async (ctx) => sendVoiceHandler(ctx, useTTS));

bot.launch();

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());
