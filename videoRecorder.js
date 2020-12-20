import cp from "child_process";
import fs from 'fs';

import schedule from "node-schedule";
import moment from "moment";

import getSunTime from "./sunTime.js";


export default async () => {
  const { sunriseTime, durationAsSeconds, testTime } = await getSunTime();

  //raspistill --width 1920 --height 1080 --timeout 10000 --timelapse 1000 --output image%09d.jpg

  schedule.scheduleJob(sunriseTime, () => {
    const directoryName = moment().format('YYYY-MM-DD');
    fs.mkdirSync(directoryName);
    cp.spawnSync('raspistill', [
      '--width', 1920,
      '--height', 1080,
      '--timeout', durationAsSeconds * 1000,
      '--timelapse', 10 * 1000,
      '--output', `${directoryName}/image%05d.jpg`
    ]);

    cp.spawnSync('ffmpeg', [
      '-r', 60,
      '-i', `${directoryName}/image%05d.jpg`,
      '-r', 60,
      '-c:v', 'libx264',
      `${directoryName}/timelapse.mp4`
    ])
  });
}
