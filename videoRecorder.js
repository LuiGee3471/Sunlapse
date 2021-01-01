import cp from "child_process";
import fs from 'fs';

import schedule from "node-schedule";
import moment from "moment";

export default (sunTime) => {
  const { sunriseTime, duration } = sunTime;
  const height = 1080; // 1080p
  const width = height * 16 / 9;

  //raspistill --width 1920 --height 1080 --timeout 10000 --timelapse 1000 --output image%09d.jpg
  schedule.scheduleJob(sunriseTime, () => {
    console.log('Capture start');
    const today = moment().format('YYYY-MM-DD');
    fs.mkdirSync(today);
    console.log(`raspistill --width ${width} --height ${height} --timeout ${duration.asMilliseconds()} --timelapse ${duration.asHours().toFixed(3) * 1000} --awb off --awbgains 1.1,1.5, --output ${today}/image%06d.jpg`);
    cp.spawnSync('raspistill', [
      '--width', width,
      '--height', height,
      '--timeout', duration.asMilliseconds(),
      '--timelapse', duration.asHours().toFixed(3) * 1000 * 3, // 20초
      '--awb', 'off',
      '--awbgains', '1.0,1.4',
      '--output', `${today}/image%04d.jpg`
    ]);
    console.log('Capture end');

    console.log('Timelapse on');
    cp.spawnSync('ffmpeg', [
      '-framerate', 60,
      '-i', `${today}/image%04d.jpg`,
      '-c:v', 'h264_omx',
      '-b:v', '1.3M',
      '-pix_fmt', 'yuv420p',
      `/var/opt/sunlapse/timelapse-${today}.mp4`
    ]);
    console.log('Timelapse end');

    fs.rmdirSync(today, { recursive: true });
  });
}
