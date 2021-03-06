import axios from "axios";
import moment from "moment";

const latitude = 37.561468;
const longitude = 127.040485;

export default async () => {
  const url = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`;
  const response = await axios.get(url);

  const sunriseTime = moment(
    response.data.results.nautical_twilight_begin,
    "hh:mm:ss a"
  )
    .subtract(1, 'day')
    .add(8, "hour");

  const sunsetTime = moment(
    response.data.results.astronomical_twilight_end,
    "hh:mm:ss a"
  )
    .add(8, "hour");

  const duration = moment.duration(sunsetTime.diff(sunriseTime));

  console.log('Sunrise: ' + sunriseTime.format('YYYY-MM-DD HH:mm:ss'));
  console.log('Sunset: ' + sunsetTime.format('YYYY-MM-DD HH:mm:ss'));
  console.log('Duration: ' + duration.asHours() + " hours");

  return {
    sunriseTime: getScheduleObj(sunriseTime),
    duration,
  };
}

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
