import './styles.scss';
import '../node_modules/@fortawesome/fontawesome-free/js/all';
import { format, utcToZonedTime } from 'date-fns-tz';
import { api } from './api';
import { dom } from './dom';

let currentUnit = 'imperial';
let currentLocation = 'Los Angeles';
let currentForecast = 'hourly';

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
    const countryName = new Intl.DisplayNames(['en'], { type: 'region' });

    currentWeather.city = data.city;
    currentWeather.country = countryName.of(data.country);
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

    currentForecast = 'hourly';
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

    currentForecast = 'daily';
  };

  const searchCity = async ({location, unit, forecast = 'hourly'}) => {
    if (location === '') return;
    if (dom.checkError()) dom.hideError();

    try {
      const coords = await api.getCoords({ location });
      const weatherData = await api.getData({ ...coords, unit });

      if (weatherData.cod === '400') {
        dom.showError();
        dom.resetSearch();
        return;
      }

      currentLocation = location;

      dom.clear();
      loadCurrent(weatherData);

      if (forecast === 'hourly') {
        loadHourly(weatherData);
      } else {
        loadDaily(weatherData);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const searchForecast = async () => {
    try {
      const coords = await api.getCoords({ location: currentLocation });
      const weatherData = await api.getData({ ...coords, unit: currentUnit });
      const forecastContainer = document.querySelector('.forecast-content');
      
      dom.clearContainer(forecastContainer);

      return weatherData;
    } catch (err) {
      return err;
    }
  };

  const createChangeUnitEvent = () => {
    const changeTempBtn = document.getElementById('change-temp-btn');
    const unitToSubmit = currentUnit === 'imperial' ? 'metric' : 'imperial';

    changeTempBtn.addEventListener('click', () => {
      app.searchCity({
        location: currentLocation, 
        unit: unitToSubmit,
        forecast: currentForecast
      })
      .then(() => {
        // eslint-disable-next-line no-unused-expressions
        currentUnit === 'imperial' 
        ? currentUnit = 'metric' 
        : currentUnit = 'imperial';

        createChangeUnitEvent();
      });
    });
  };

  const createSearchEvents = () => {
    const searchButton = document.querySelector('.location-search button');
    searchButton.addEventListener('click', () => {
      const searchField = document.getElementById('city-input');
      const searchInput = searchField.value;
      
      app.searchCity({
        location: searchInput, 
        forecast: currentForecast,
        unit: currentUnit
      })
      .then(() => {
        createChangeUnitEvent();
      });
    });

    document.addEventListener('keypress', (event) => {
      const searchField = document.getElementById('city-input');
      const searchInput = searchField.value;
      
      if (event.key === 'Enter') {
        app.searchCity({
          location: searchInput, 
          forecast: currentForecast,
          unit: currentUnit
        })
        .then(() => {
          createChangeUnitEvent();
        });
      };
    });
  };

  const createScrollEvents = () => {
    const arrows = document.querySelectorAll('.forecast-arrow');
    const rightArrow = arrows[1];
    rightArrow.addEventListener('click', () => {
      dom.scrollForecastContent('right');
    });

    const leftArrow = arrows[0];
    leftArrow.addEventListener('click', () => {
      dom.scrollForecastContent('left');
    });
  };

  const createForecastEvents = () => {
    const hourlyBtn = document.getElementById('hourly-btn');
    hourlyBtn.addEventListener('click', (event) => {
      if (event.target.classList.contains('forecast-btn-selected')) return;
      searchForecast()
      .then(weatherData => {
        loadHourly(weatherData);
        dom.toggleForecastSelection();
        dom.setArrowDisplay();
      });
    });

    const dailyBtn = document.getElementById('daily-btn');
    dailyBtn.addEventListener('click', (event) => {
      if (event.target.classList.contains('forecast-btn-selected')) return;
      searchForecast()
      .then(weatherData => {
        loadDaily(weatherData);
        dom.toggleForecastSelection();
        dom.setArrowDisplay();
      });
    });
  };

  return { 
    loadCurrent, 
    loadHourly, 
    loadDaily, 
    searchCity, 
    createChangeUnitEvent,
    createSearchEvents,
    createForecastEvents,
    createScrollEvents
  };
})();

dom.renderHome();

app.searchCity({location: currentLocation, unit: currentUnit})
.then(() => {
  app.createScrollEvents();
  dom.setArrowDisplay();
  app.createSearchEvents();
  app.createChangeUnitEvent();
  app.createForecastEvents();
})
// eslint-disable-next-line no-console
.catch((err) => console.error(err));

window.onresize = () => {
  dom.setArrowDisplay();
};
