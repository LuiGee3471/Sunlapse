import cp, { spawnSync } from "child_process";

import schedule from "node-schedule";
import moment from "moment";

import getSunTime from "./sun-time.js";

export default async function () {
  const { sunriseTime, durationAsSeconds, testTime } = await getSunTime();

  schedule.scheduleJob(testTime, function () {
    const command = `ffmpeg -t ${durationAsSeconds} -i test.mp4 -f mpegts pipe: | ffmpeg -i pipe: -filter:v 'setpts=${
      1 / durationAsSeconds / 60 / 5
    }*PTS' ${moment().format("YYYY_MM_DD")}.mp4 -y`;

    const recordOptions = [
      "-t", 30,
      // "-i", "/dev/video0",
      "-i", "test.mp4",
      // "-t", durationAsSeconds,
      // "-c:v", "h264_omx",
      // "-c:v", "h264_videotoolbox",
      // "-b:v", "5M",
      "-f", "mpegts",
      "pipe:"
    ];

    const lapseOptions = [
      "-i", "pipe:",
      // "-c:v", "h264_omx",
      // "-c:v", "h264_videotoolbox",
      // "-b:v", "5M",
      // "-filter:v", `${1 / (durationAsSeconds / 60 / 5)}*PTS`
      "-filter:v", "setpts=0.25*PTS",
      `${moment().format("YYYY_MM_DD")}.mp4`,
      '-y'
    ];

    cp.spawnSync('sh', ['-c', command]);
  });
}
