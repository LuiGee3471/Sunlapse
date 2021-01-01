import fs from 'fs';

import schedule from 'node-schedule';

import getSunTime from './sunTime.js';
import videoScheduler from "./videoRecorder.js";

console.log('Start app');
schedule.scheduleJob('0 0 4 * * *', async () => {
    try {
        const sunTime = await getSunTime();
        videoScheduler(sunTime);
    } catch (error) {
        console.error(error);
    }
});
