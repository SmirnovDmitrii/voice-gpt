import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { OpenAi } from "./openai.js";

const bot = new Telegraf($TELEGRAM_TOKEN);
const openAi = OpenAi($OPENAI_KEY);

bot.on(message("text"), async (ctx) => {
  await ctx.reply(JSON.stringify(ctx.message.text, null, 2));
  const response = await openAi.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: ctx.message.text}]
  });
  await ctx.reply(response.data.choices[0].message.content)
});

bot.on(message("voice"), async (ctx) => {
  // await ctx.reply(JSON.stringify(ctx.message));
});

bot.command("start", async (ctx) => {
  // await ctx.reply("ой все");
});

bot.launch();

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());
