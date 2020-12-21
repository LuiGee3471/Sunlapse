import cp from "child_process";
import fs from 'fs';

import schedule from "node-schedule";
import moment from "moment";

import getSunTime from "./sunTime.js";


export default (sunTime) => {
  const { sunriseTime, durationAsSeconds } = sunTime;

  //raspistill --width 1920 --height 1080 --timeout 10000 --timelapse 1000 --output image%09d.jpg
  console.log('Scheduling', sunriseTime);
  schedule.scheduleJob(sunriseTime, () => {
    console.log('Capture start');
    const directoryName = moment().format('YYYY-MM-DD');
    fs.mkdirSync(directoryName);
    cp.spawnSync('raspistill', [
      '--width', 1920,
      '--height', 1080,
      '--timeout', durationAsSeconds * 1000,
      '--timelapse', 1 * 1000,
      '--awb', 'off',
      '--awbgains', '1.1,1.5',
      '--output', `${directoryName}/image%06d.jpg`
    ]);
    console.log('Capture end');

    console.log('Timelapse on');
    cp.spawnSync('ffmpeg', [
      '-r', 60,
      '-i', `${directoryName}/image%06d.jpg`,
      '-r', 60,
      '-c:v', 'libx264',
      `${directoryName}/timelapse.mp4`
    ]);
    console.log('Timelapse end');
  });
}
