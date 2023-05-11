import { Configuration, OpenAIApi } from "openai";

export const OpenAi = (key) => {
  const config = new Configuration({
    apiKey: key,
  });
  return new OpenAIApi(config);
};
