import moment from 'moment';

import videoScheduler from './videoRecorder.js';

(async function (sunTime) {
    videoScheduler(sunTime);
})({
    sunriseTime: getScheduleObj(moment().add(3, 'second')),
    durationAsSeconds: 60
});

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