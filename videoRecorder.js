import cp from "child_process";
import fs from 'fs';

import schedule from "node-schedule";
import moment from "moment";

export default (sunTime) => {
  const { sunriseTime, durationAsMilliseconds } = sunTime;

  //raspistill --width 1920 --height 1080 --timeout 10000 --timelapse 1000 --output image%09d.jpg
  schedule.scheduleJob(sunriseTime, () => {
    console.log('Capture start');
    const today = moment().format('YYYY-MM-DD');
    fs.mkdirSync(today);
    cp.spawnSync('raspistill', [
      '--width', 1920,
      '--height', 1080,
      '--timeout', durationAsMilliseconds,
      '--timelapse', 1 * 1000,
      '--awb', 'off',
      '--awbgains', '1.1,1.5',
      '--output', `${today}/image%06d.jpg`
    ]);
    console.log('Capture end');

    console.log('Timelapse on');
    cp.spawnSync('ffmpeg', [
      '-r', 60,
      '-i', `${today}/image%06d.jpg`,
      '-r', 60,
      '-c:v', 'libx264',
      `timelapse-${today}.mp4`
    ]);
    console.log('Timelapse end');

    fs.rmdirSync(today, { recursive: true });
  });
}
