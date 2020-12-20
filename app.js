import schedule from 'node-schedule';

import getSunTime from './sunTime.js';
import videoScheduler from "./videoRecorder.js";

schedule.scheduleJob('0 0 2 * * *', async () => {
    console.log('Start app');
    const sunTime = await getSunTime();
    videoScheduler(sunTime);
});
