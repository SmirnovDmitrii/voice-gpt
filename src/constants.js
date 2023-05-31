import dotenv from "dotenv";
dotenv.config();

export const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
export const OPENAI_KEY = process.env.OPENAI_KEY;
export const MODEL = process.env.MODEL;
export const context = { messages: [] };
export const ROLE = {
  USER: "user",
  ASSISTANT: "assistant",
  SYSTEM: "system",
};
export const englishStartMessage =
  "I want you to act as a spoken English teacher and improver. I will speak to you in English and you will reply to me in English to practice my spoken English. I want you to keep your reply neat, limiting the reply to 100 words. I want you to strictly correct my grammar mistakes, typos, and factual errors. I want you to ask me a question in your reply. Now let's start practicing, you could ask me a question first. Remember, I want you to strictly correct my grammar mistakes, typos, and factual errors.";
