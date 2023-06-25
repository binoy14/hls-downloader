import { download } from "node-hls-downloader";
import downloadList from "./item";
import fs from "fs/promises";

const OUT_DIR = `${__dirname}/downloads`;

async function run() {
  if (!downloadList.title || !downloadList.episodes.length) {
    throw new Error("Add a title for the show and episodes urls");
  }
  const { title, episodes, httpHeaders } = downloadList;
  console.log("Starting Download, checking for folder or creating");
  try {
    await fs.readdir(`${OUT_DIR}/${title}`).catch(async (error) => {
      if (error.code === "ENOENT") {
        await fs.mkdir(`${OUT_DIR}/${title}`).catch((err) => {
          throw new Error(err);
        });
      } else {
        throw error;
      }
    });

    for (let i = 0; i < episodes.length; i++) {
      const ep = episodes[i];
      // So it starts at index 1
      const epNum = i + 1;
      const epPrefix = epNum >= 10 ? epNum : `0${epNum}`;
      console.log(`Downloading EP ${epPrefix}`);

      await download({
        quality: "best",
        concurrency: 15,
        outputFile: `${title}/Episode${epPrefix}.mp4`,
        streamUrl: ep,
        httpHeaders: httpHeaders ? httpHeaders : undefined,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
}

run();
