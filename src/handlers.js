import { code } from "telegraf/format";
import {context, MODEL, OPENAI_KEY, ROLE} from "./constants.js";
import { OpenAi } from "./openai.js";

const openAi = OpenAi(OPENAI_KEY);

export const createContext = async (ctx) => {
  ctx.session = context;
  await ctx.reply("Отправьте сообщение");
};

export const sendTextHandler = async (ctx) => {
  await ctx.reply(code("Жду ответ от openAi..."));

  try {
    const model = MODEL;
    const messages = [{ role: ROLE.USER, content: ctx.message.text }];
    const response = await openAi.createChatCompletion({ model, messages });
    await ctx.reply(response.data.choices[0].message.content);
  } catch (e) {
    await ctx.reply(`Извините, произошла ошибка ${e.response.status}`);
    console.log("catch sendTextHandler", e);
  }
};

export const sendVoiceHandler = async (ctx) => {
  // todo
};
