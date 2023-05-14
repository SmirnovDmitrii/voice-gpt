import axios from "axios";
import ffmpeg from "fluent-ffmpeg";
import installer from "@ffmpeg-installer/ffmpeg";
import { createWriteStream } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
ffmpeg.setFfmpegPath(installer.path);

export const toMp3 = async (url, name) => {
  try {
    const outputPath = resolve(dirname(url), `voice${name}.mp3`);
    return new Promise((resolve) => {
      ffmpeg(url)
        .output(outputPath)
        .on("end", () => resolve(outputPath))
        .run();
    });
  } catch (e) {
    console.log("Error toMp3", e.message);
  }
};

export const urlToOgg = async (url, name) => {
  try {
    const oggPath = resolve(__dirname, "../voices", `voice${name}.ogg`);
    const response = await axios({ method: "get", url, responseType: "stream" });
    return new Promise((resolve) => {
      const stream = createWriteStream(oggPath);
      response.data.pipe(stream);
      stream.on("finish", () => resolve(oggPath));
    });
  } catch (e) {
    console.log("Error urlToOgg", e.message);
  }
};
