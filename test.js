import moment from 'moment';

import getSunTime from './sunTime.js';
import videoRecorder from './videoRecorder.js';

testSunTime();

function getScheduleObj(time) {
    return {
      year: time.year(),
      month: time.month(),
      date: time.date(),
      hour: time.hour(),
      minute: time.minute(),
      second: time.second(),
    };
}

async function testSunTime() {
    await getSunTime();
}

async function testVideoRecorder() {
    videoRecorder({
        sunriseTime: getScheduleObj(moment().add(2, 'second')),
        durationAsMilliSeconds: 60000
    })
}