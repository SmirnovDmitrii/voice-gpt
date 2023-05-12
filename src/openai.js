import { Configuration, OpenAIApi } from "openai";

export const OpenAi = (apiKey) => {
  const config = new Configuration({ apiKey });
  return new OpenAIApi(config);
};
