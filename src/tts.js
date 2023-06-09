import { https } from "https";

export const texToSpeech = ({ slow, text, voice }) => {
  const options = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    hostname: "translate.google.com",
    method: "POST",
    path: "/_/TranslateWebserverUi/data/batchexecute",
  };

  const body = ({ slow = false, text, voice }) => {
    const values = JSON.stringify([text, voice, slow ? true : null, "null"]);
    const data = JSON.stringify([[["jQ1olc", values, null, "generic"]]]);
    const params = new URLSearchParams({ "f.req": data });
    return params.toString();
  };

  const request = (opts) =>
    new Promise((resolve, reject) => {
      const request = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data = data + chunk));
        res.on("end", () => resolve(data));
      });
      request.write(body(opts));
      request.on("error", reject);
      request.end();
    });

  const toBuffer = (response) => {
    const slice = response.split("\n").slice(1).join("");
    const json = JSON.parse(slice);
    const dataString = json[0][2];
    const dataArray = JSON.parse(dataString);

    if (dataArray === null) throw new Error("Unable to parse audio data. Check your request params.");

    return Buffer.from(dataArray[0], "base64");
  };

  return request({ slow, text, voice }).then(toBuffer);
};
