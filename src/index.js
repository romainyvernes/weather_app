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
    currentWeather.wind_speed = Math.round(currentWeather.wind_speed * 3.6);
    
    dom.renderCurrent(currentWeather);
    dom.renderDetails(currentWeather);
  };

  const loadHourly = (data) => {
    const hourlyForecast = data.hourly.slice(0, 12);

    const {timezone} = data;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < hourlyForecast.length; i++) {
      hourlyForecast[i].unit = data.unit;
      
      if (i === 0) {
        hourlyForecast[i].time = 'Now';
      } else {
        hourlyForecast[i].time = format(
          utcToZonedTime(hourlyForecast[i].dt * 1000, timezone),
          'h a',
          { timeZone: timezone }
        );
      }
    }

    hourlyForecast.map((hourObj) => dom.renderHourCard(hourObj));
  };

  const loadDaily = (data) => {
    const dailyForecast = data.daily.reduce((arr, dayData, index) => {
      if (index !== 0) {
        const processedData = processDayData({
          data: dayData,
          unit: data.unit,
          timezone: data.timezone
        });
        const localTime = utcToZonedTime(dayData.dt * 1000, data.timezone);
  
        processedData.day = format(
          localTime, 'eeee', { timeZone: data.timezone }
        );
        
        arr.push(processedData);
      }

      return arr;
    }, []);

    // eslint-disable-next-line array-callback-return
    dailyForecast.map((dayObj) => dom.renderDayCard(dayObj));
  };

  const searchCity = () => {
    const searchField = document.querySelector('input[id="city-input"]');
    const searchInput = searchField.value;

    if (searchInput === '') return;

    api.getCoords({city: searchInput})
    .then(locationData => api.getData(locationData))
    .then(weatherData => {
      dom.clear();
      loadCurrent(weatherData);
      loadDaily(weatherData);
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err.message));
  };

  return { loadCurrent, loadHourly, loadDaily, searchCity };
})();

dom.renderHome();

api.getCoords({city: 'Sydney'})
.then(locationData => {
  const data = locationData;
  data.unit = 'metric';
  return api.getData(data);
})
.then(weatherData => {
  app.loadCurrent(weatherData);
  app.loadHourly(weatherData);

  const searchButton = document.querySelector('.location-search button');
  searchButton.addEventListener('click', app.searchCity);

  document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') app.searchCity();
  });
});
