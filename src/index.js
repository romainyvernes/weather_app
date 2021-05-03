import './styles.scss';
import '../node_modules/@fortawesome/fontawesome-free/js/all';
import { format, utcToZonedTime } from 'date-fns-tz';
import { api } from './api';
import { dom } from './dom';

const app = (() => {
  const processDayData = ({data, unit, timezone}) => {
    const dayData = data;

    const localTime = utcToZonedTime(dayData.dt * 1000, timezone);
    const formattedLocalDate = format(localTime, 'E, MMM do', { 
      timeZone: timezone
    });
    const formattedLocalTime = format(localTime, 'p', { timeZone: timezone });
    const sunrise = format(
      utcToZonedTime(dayData.sunrise * 1000, timezone),
      'p',
      { timeZone: timezone }
    );
    const sunset = format(
      utcToZonedTime(dayData.sunset * 1000, timezone),
      'p',
      { timeZone: timezone }
    );
    
    dayData.unit = unit;
    dayData.date = formattedLocalDate;
    dayData.time = formattedLocalTime;
    dayData.sunrise = sunrise;
    dayData.sunset = sunset;

    return dayData;
  };
  
  const loadCurrent = (data) => {
    const currentWeather = processDayData({
      data: data.current,
      unit: data.unit,
      timezone: data.timezone
    });

    currentWeather.city = data.city;
    currentWeather.pop = data.hourly[0].pop;
    
    dom.renderCurrent(currentWeather);
    dom.renderDetails(currentWeather);
  };

  const loadHourly = (data) => {
    const hourlyForecast = data.hourly.slice(0, 12);

    const {timezone} = data;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < hourlyForecast.length; i++) {
      hourlyForecast[i].unit = data.unit;
      
      hourlyForecast[i].time = format(
        utcToZonedTime(hourlyForecast[i].dt * 1000, timezone),
        'h a',
        { timeZone: timezone }
      );
    }
    
    console.log(hourlyForecast);
    // dom.renderHourly(hourlyForecast);
  };

  const loadDaily = (data) => {
    const dailyForecast = data.daily.reduce((arr, dayData) => {
      arr.push(processDayData({
        data: dayData,
        unit: data.unit,
        timezone: data.timezone
      }));

      return arr;
    }, []);

    console.log(dailyForecast);
    // dom.renderDaily(dailyForecast);
  };

  return { loadCurrent, loadHourly, loadDaily };
})();

dom.renderHome();

api.getCoords({city: 'Sydney'})
.then(locationData => api.getData(locationData))
.then(weatherData => app.loadCurrent(weatherData));
