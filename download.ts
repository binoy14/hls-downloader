import { download } from "node-hls-downloader";
import downloadList from "./item";
import fs from "fs/promises";

const OUT_DIR = `${__dirname}/downloads`;

async function run() {
  // If the title, episodes, or streamUrl is not specified return an error
  if (!downloadList.title) {
    throw new Error("Title is not specified");
  }
  if (!downloadList.episodes && !downloadList.streamUrl) {
    throw new Error("Episodes or streamUrl is not specified");
  }

  const { title, episodes, streamUrl, httpHeaders } = downloadList;
  const OUT_FINAL_DIR = `${OUT_DIR}/${title}`;

  console.log("Starting Download, checking for folder or creating");
  try {
    await fs.readdir(OUT_FINAL_DIR).catch(async (error) => {
      if (error.code === "ENOENT") {
        await fs
          .mkdir(OUT_FINAL_DIR, {
            recursive: true,
          })
          .catch((err) => {
            throw new Error(err);
          });
      } else {
        throw error;
      }
    });

    if (streamUrl) {
      console.log("Downloading from streamUrl");
      await download({
        quality: "best",
        concurrency: 15,
        outputFile: `${OUT_FINAL_DIR}/${title}.mp4`,
        streamUrl,
        httpHeaders: httpHeaders ? httpHeaders : undefined,
      });
      return;
    }

    for (let i = 0; i < episodes.length; i++) {
      const ep = episodes[i];
      // So it starts at index 1
      const epNum = i + 1;
      const epPrefix = epNum >= 10 ? epNum : `0${epNum}`;
      console.log(`Downloading EP ${epPrefix}`);

      await download({
        quality: "best",
        concurrency: 15,
        outputFile: `${OUT_FINAL_DIR}/Episode${epPrefix}.mp4`,
        streamUrl: ep,
        httpHeaders: httpHeaders ? httpHeaders : undefined,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
}

run();
