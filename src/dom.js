const dom = (() => {
  const renderHome = () => {
    const container = document.querySelector('body');

    const mainContent = document.createElement('main');

    const currentWeather = document.createElement('div');
    currentWeather.className = 'current-weather';

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'location-search';

    const locationInput = document.createElement('input');
    locationInput.type = 'text';
    locationInput.id = 'city-input';
    locationInput.placeholder = 'Search city...';

    const searchBtn = document.createElement('button');
    searchBtn.type = 'button';

    const searchIcon = document.createElement('i');
    searchIcon.className = 'fas fa-search';

    searchBtn.appendChild(searchIcon);

    inputWrapper.appendChild(locationInput);
    inputWrapper.appendChild(searchBtn);

    const currentData = document.createElement('div');
    currentData.className = 'current-data';

    mainContent.appendChild(currentWeather);
    mainContent.appendChild(inputWrapper);
    mainContent.appendChild(currentData);

    const forecastSelection = document.createElement('div');
    forecastSelection.className = 'forecast-selection-wrapper';

    const hourlyBtn = document.createElement('button');
    hourlyBtn.type = 'button';
    hourlyBtn.id = 'hourly-btn';
    hourlyBtn.textContent = 'Hourly';

    const dailyBtn = document.createElement('button');
    dailyBtn.type = 'button';
    dailyBtn.id = 'daily-btn';
    dailyBtn.textContent = 'Daily';

    forecastSelection.appendChild(hourlyBtn);
    forecastSelection.appendChild(dailyBtn);

    const forecastWrapper = document.createElement('div');
    forecastWrapper.className = 'forecast-wrapper';

    const leftArrow = document.createElement('i');
    leftArrow.className = 'fas fa-chevron-left';
    leftArrow.id = 'forecast-left-arrow';

    forecastWrapper.appendChild(leftArrow);

    const forecastContent = document.createElement('ul');
    forecastContent.className = 'forecast-content';

    forecastWrapper.appendChild(forecastContent);

    const rightArrow = document.createElement('i');
    rightArrow.className = 'fas fa-chevron-right';
    rightArrow.id = 'forecast-right-arrow';

    forecastWrapper.appendChild(rightArrow);

    container.appendChild(mainContent);
    container.appendChild(forecastSelection);
    container.appendChild(forecastWrapper);
  };

  const renderDetails = (data) => {
    const container = document.querySelector('.current-data');

    let uviLevel;
    switch (Math.round(data.uvi)) {
      case 0:
      case 1:
      case 2:
        uviLevel = 'low';
        break;
      case 3:
      case 4:
      case 5:
        uviLevel = 'moderate';
        break;
      case 6:
      case 7:
        uviLevel = 'high';
        break;
      case 8:
      case 9:
      case 10:
        uviLevel = 'very high';
        break;
      default:
        uviLevel = 'extreme';
        break;
    }

    const labels = {
      'Feels Like': `${Math.round(data.feels_like)}°${
        data.unit === 'imperial' ? 'F' : 'C'
      }`,
      'Humidity': `${data.humidity}%`,
      'Chance of Rain': `${Math.round(data.pop * 100)}%`,
      'Wind Speed': `${Math.round(data.wind_speed)} ${
        data.unit === 'imperial' ? 'mph' : 'km/h'
      }`,
      'UV Index': `${Math.round(data.uvi)} (${uviLevel})`
    };

    // eslint-disable-next-line array-callback-return
    Object.entries(labels).map(([key, value]) => {
      const label = document.createElement('div');
      label.className = 'current-data-label';
      label.textContent = key;

      const dataValue = document.createElement('div');
      dataValue.className = 'current-data-value';
      dataValue.textContent = value;

      container.appendChild(label);
      container.appendChild(dataValue);
    });
  };

  const renderCurrent = (data) => {
    const container = document.querySelector('.current-weather');

    const city = document.createElement('div');
    city.className = 'city-name';
    city.textContent = data.city;

    const date = document.createElement('div');
    date.className = 'current-date';
    date.textContent = `${data.date}, ${data.time}`;

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'icon-wrapper';

    const icon = document.createElement('img');
    icon.src = 
      `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = 'weather-icon';
    icon.id = 'current-weather-icon';

    const description = document.createElement('div');
    description.className = 'current-description';
    description.textContent = data.weather[0].description
      .split(' ')
      .map(word => word[0].toUpperCase() + word.substr(1))
      .join(' ');

    iconWrapper.appendChild(icon);
    iconWrapper.appendChild(description);

    const temperature = document.createElement('div');
    temperature.className = 'current-temperature';
    temperature.textContent = 
      `${Math.round(data.temp)}°${data.unit === 'imperial' ? 'F' : 'C'}`;

    const cToFButton = document.createElement('button');
    cToFButton.type = 'button';
    cToFButton.id = 'c-to-f-btn';
    cToFButton.textContent = `| °${data.unit === 'imperial' ? 'C' : 'F'}`;

    container.appendChild(city);
    container.appendChild(date);
    container.appendChild(iconWrapper);
    container.appendChild(temperature);
    container.appendChild(cToFButton);
  };

  const clearContainer = (target) => {
    let firstChild = target.firstElementChild;

    while (firstChild) {
        firstChild.remove();
        firstChild = target.firstElementChild;
    }
  };

  const clear = () => {
    const currentWeatherWrapper = document.querySelector('.current-weather');
    const inputField = document.querySelector('input[id="city-input"]');
    const currentDataWrapper = document.querySelector('.current-data');
    const forecastContentWrapper = document.querySelector('.forecast-content');

    clearContainer(currentWeatherWrapper);
    clearContainer(currentDataWrapper);
    clearContainer(forecastContentWrapper);
    inputField.value = '';
  };

  const renderDayCard = (data) => {
    const container = document.querySelector('.forecast-content');

    const dayCard = document.createElement('div');
    dayCard.className = 'daily-card';

    const day = document.createElement('div');
    day.className = 'daily-label';
    day.textContent = data.day;

    const icon = document.createElement('img');
    icon.src = 
      `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = 'weather-icon';
    icon.id = 'daily-forecast-icon';

    const temperature = document.createElement('div');
    temperature.className = 'daily-temperature';
    
    const maxTemperature = document.createElement('span');
    maxTemperature.className = 'daily-max-temperature';
    maxTemperature.textContent = 
      `${Math.round(data.temp.max)}°${data.unit === 'imperial' ? 'F' : 'C'}`;

    const minTemperature = document.createElement('span');
    minTemperature.className = 'daily-min-temperature';
    minTemperature.textContent = 
      `${Math.round(data.temp.min)}°${data.unit === 'imperial' ? 'F' : 'C'}`;

    const tempSeparator = document.createElement('span');
    tempSeparator.textContent = ' / ';

    temperature.appendChild(maxTemperature);
    temperature.appendChild(tempSeparator);
    temperature.appendChild(minTemperature);

    dayCard.appendChild(day);
    dayCard.appendChild(icon);
    dayCard.appendChild(temperature);

    container.appendChild(dayCard);
  };

  const renderHourCard = (data) => {
    const container = document.querySelector('.forecast-content');

    const hourCard = document.createElement('li');
    hourCard.className = 'hourly-card';

    const time = document.createElement('div');
    time.className = 'hourly-label';
    time.textContent = data.time;

    const precipitation = document.createElement('div');
    precipitation.className = 'hourly-precipitation';
    precipitation.textContent = `${Math.round(data.pop * 100)}%`;

    const icon = document.createElement('img');
    icon.src = 
      `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = 'weather-icon';
    icon.id = 'hourly-forecast-icon';

    const temperature = document.createElement('div');
    temperature.className = 'hourly-temperature';
    temperature.textContent =
      `${Math.round(data.temp)}°${data.unit === 'imperial' ? 'F' : 'C'}`;

    hourCard.appendChild(time);
    hourCard.appendChild(precipitation);
    hourCard.appendChild(icon);
    hourCard.appendChild(temperature);

    container.appendChild(hourCard);
  };

  return { 
    renderHome, 
    renderCurrent, 
    renderDetails, 
    clear, 
    renderDayCard,
    renderHourCard
  };
})();

// eslint-disable-next-line import/prefer-default-export
export { dom };