import './styles.scss';
import '../node_modules/@fortawesome/fontawesome-free/js/all';
import { format, utcToZonedTime } from 'date-fns-tz';
import { api } from './api';
import { dom } from './dom';

let currentUnit = 'imperial';
let currentLocation = 'Sydney';

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

  const searchCity = async ({location, unit}) => {
    if (location === '') return;

    try {
      const coords = await api.getCoords({ city: location });
      const weatherData = await api.getData({ ...coords, unit });
      dom.clear();
      loadCurrent(weatherData);
      loadHourly(weatherData);
    } catch (err) {
      // eslint-disable-next-line consistent-return
      return err;
    }
  };

  const searchForecast = async () => {
    try {
      const coords = await api.getCoords({ city: currentLocation });
      const weatherData = await api.getData({ ...coords, unit: currentUnit });
      const forecastContainer = document.querySelector('.forecast-content');
      
      dom.clearContainer(forecastContainer);

      return weatherData;
    } catch (err) {
      return err;
    }
  };

  const createChangeTempEvent = () => {
    const changeTempBtn = document.getElementById('change-temp-btn');
    const unitToSubmit = currentUnit === 'imperial' ? 'metric' : 'imperial';

    changeTempBtn.addEventListener('click', () => {
      app.searchCity({
        location: currentLocation, 
        unit: unitToSubmit
      })
      .then(() => {
        // eslint-disable-next-line no-unused-expressions
        currentUnit === 'imperial' 
        ? currentUnit = 'metric' 
        : currentUnit = 'imperial';

        createChangeTempEvent();
      });
    });
  };

  const createSearchEvents = () => {
    const searchButton = document.querySelector('.location-search button');
    searchButton.addEventListener('click', () => {
      const searchField = document.getElementById('city-input');
      const searchInput = searchField.value;
      
      app.searchCity({location: searchInput})
      .then(() => {
        currentLocation = searchInput;
        createChangeTempEvent();
      });
    });

    document.addEventListener('keypress', (event) => {
      const searchField = document.getElementById('city-input');
      const searchInput = searchField.value;
      if (event.key === 'Enter') {
        app.searchCity({location: searchInput})
        .then(() => {
          currentLocation = searchInput;
          createChangeTempEvent();
        });
      };
    });
  };

  const createForecastEvents = () => {
    const hourlyBtn = document.getElementById('hourly-btn');
    hourlyBtn.addEventListener('click', () => {
      searchForecast()
      .then(weatherData => loadHourly(weatherData));
    });

    const dailyBtn = document.getElementById('daily-btn');
    dailyBtn.addEventListener('click', () => {
      searchForecast()
      .then(weatherData => loadDaily(weatherData));
    });
  };

  return { 
    loadCurrent, 
    loadHourly, 
    loadDaily, 
    searchCity, 
    createChangeTempEvent,
    createSearchEvents,
    createForecastEvents
  };
})();

dom.renderHome();

app.searchCity({location: currentLocation, unit: 'metric'})
.then(() => {
  app.createSearchEvents();
  app.createChangeTempEvent();
  app.createForecastEvents();
})
.catch((err) => console.error(err));
