import dotenv from 'dotenv'
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
