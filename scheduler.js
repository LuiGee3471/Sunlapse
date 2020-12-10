import schedule from "node-schedule";
import moment from "moment";

import getSunTime from "./sun-time.js";

export default async function () {
  const { sunrise, duration } = await getSunTime();
  console.log(sunrise, duration);

  schedule.scheduleJob(sunrise, function () {
    const command = `ffmpeg -i /dev/video0 -t ${duration} -filter:v 'setpts=${(
      (5 * 60) /
      duration
    ).toFixed(4)}*PTS' ${moment().format("YYYY_MM_DD")}.mp4`;

    console.log(command);
  });
}
