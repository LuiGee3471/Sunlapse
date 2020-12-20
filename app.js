import schedule from 'node-schedule';

import videoScheduler from "./videoRecorder.js";

schedule.scheduleJob('0 0 2 * * *', () => {
    console.log('Start app');
    videoScheduler();
});
