import { code } from "telegraf/format";
import { createReadStream, unlink } from "fs";

import { context, MODEL, OPENAI_KEY, ROLE } from "./constants.js";
import { OpenAi } from "./openai.js";
import { toMp3, urlToOgg } from "./oggToMp3.js";

const openAi = OpenAi(OPENAI_KEY);

export const createContext = async (ctx) => {
  ctx.session = { messages: [] };
  await ctx.reply("Отправьте сообщение");
};

export const sendTextHandler = async (ctx) => {
  await ctx.reply(code("Жду ответ от openAi..."));

  try {
    ctx.session ??= context;
    ctx.session.messages.push({ role: ROLE.USER, content: ctx.message.text });
    const response = await openAi.createChatCompletion({ model: MODEL, messages: ctx.session.messages });
    const content = response.data.choices[0].message.content;
    ctx.session.messages.push({ role: ROLE.ASSISTANT, content });
    await ctx.reply(content);
  } catch (e) {
    await ctx.reply(`Извините, произошла ошибка ${e.response.status}`);
    console.log("catch sendTextHandler", e);
  }
};

export const sendVoiceHandler = async (ctx) => {
  await ctx.reply(code("Жду ответ от openAi..."));
  try {
    const { href } = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
    const oggPath = await urlToOgg(href, ctx.message.from.id);
    const mp3Path = await toMp3(oggPath, ctx.message.from.id);

    const responseTranscription = await openAi.createTranscription(createReadStream(mp3Path), "whisper-1");
    await ctx.reply(code(`Вы сказали: ${responseTranscription.data.text}`));

    ctx.session ??= context;
    ctx.session.messages.push({ role: ROLE.USER, content: responseTranscription.data.text });
    const response = await openAi.createChatCompletion({ model: MODEL, messages: ctx.session.messages });
    const content = response.data.choices[0].message.content;
    ctx.session.messages.push({ role: ROLE.ASSISTANT, content });
    await ctx.reply(content);

    unlink(oggPath, (e) => console.log("catch unlink ogg", e));
    unlink(mp3Path, (e) => console.log("catch unlink mp3", e));
  } catch (e) {
    console.log("catch sendVoiceHandler", e);
  }
};
