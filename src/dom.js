const dom = (() => {
  const renderHome = () => {
    const container = document.querySelector('body');

    const mainContent = document.createElement('main');

    const currentWeather = document.createElement('div');
    currentWeather.className = 'current-weather';

    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'search-wrapper';

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

    const errorDisplay = document.createElement('span');
    errorDisplay.className = 'error-display hide-error';
    errorDisplay.textContent = 
      'Please enter a valid location (city, state, country)';

    searchWrapper.appendChild(inputWrapper);
    searchWrapper.appendChild(errorDisplay);

    const currentData = document.createElement('div');
    currentData.className = 'current-data';

    mainContent.appendChild(currentWeather);
    mainContent.appendChild(searchWrapper);
    mainContent.appendChild(currentData);

    const forecastSelection = document.createElement('div');
    forecastSelection.className = 'forecast-selection-wrapper';

    const hourlyBtn = document.createElement('button');
    hourlyBtn.type = 'button';
    hourlyBtn.className = 'forecast-selection-btn forecast-btn-selected';
    hourlyBtn.id = 'hourly-btn';
    hourlyBtn.textContent = 'Hourly';

    const dailyBtn = document.createElement('button');
    dailyBtn.type = 'button';
    dailyBtn.className = 'forecast-selection-btn';
    dailyBtn.id = 'daily-btn';
    dailyBtn.textContent = 'Daily';

    forecastSelection.appendChild(hourlyBtn);
    forecastSelection.appendChild(dailyBtn);

    const forecastWrapper = document.createElement('div');
    forecastWrapper.className = 'forecast-wrapper';

    const leftArrow = document.createElement('div');
    leftArrow.className = 'forecast-arrow';
    leftArrow.id = 'forecast-left-arrow';

    const leftArrowIcon = document.createElement('i');
    leftArrowIcon.className = 'fas fa-chevron-left';

    leftArrow.appendChild(leftArrowIcon);

    forecastWrapper.appendChild(leftArrow);

    const forecastContent = document.createElement('ul');
    forecastContent.className = 'forecast-content';

    forecastWrapper.appendChild(forecastContent);

    const rightArrow = document.createElement('div');
    rightArrow.className = 'forecast-arrow';
    rightArrow.id = 'forecast-right-arrow';

    const rightArrowIcon = document.createElement('i');
    rightArrowIcon.className = 'fas fa-chevron-right';
    
    rightArrow.appendChild(rightArrowIcon);

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

    const changeTempBtn = document.createElement('button');
    changeTempBtn.type = 'button';
    changeTempBtn.id = 'change-temp-btn';
    changeTempBtn.textContent = `| °${data.unit === 'imperial' ? 'C' : 'F'}`;

    container.appendChild(city);
    container.appendChild(date);
    container.appendChild(iconWrapper);
    container.appendChild(temperature);
    container.appendChild(changeTempBtn);
  };

  const clearContainer = (target) => {
    let firstChild = target.firstElementChild;

    while (firstChild) {
        firstChild.remove();
        firstChild = target.firstElementChild;
    }
  };

  const resetSearch = () => {
    const inputField = document.querySelector('input[id="city-input"]');
    inputField.value = '';
  };

  const clear = () => {
    const currentWeatherWrapper = document.querySelector('.current-weather');
    const currentDataWrapper = document.querySelector('.current-data');
    const forecastContentWrapper = document.querySelector('.forecast-content');

    clearContainer(currentWeatherWrapper);
    clearContainer(currentDataWrapper);
    clearContainer(forecastContentWrapper);
    
    resetSearch();
  };

  const renderDayCard = (data) => {
    const container = document.querySelector('.forecast-content');

    const dayCard = document.createElement('li');
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

  const toggleForecastSelection = () => {
    const selectionBtns = 
        document.querySelectorAll('.forecast-selection-btn');
    selectionBtns.forEach(
      (btn) => btn.classList.toggle('forecast-btn-selected')
    );
  };

  const scrollForecastContent = (direction) => {
    const container = document.querySelector('.forecast-content');
    if (direction === 'right') {
      container.scrollLeft += 50;
    } else {
      container.scrollLeft -= 50;
    }
  };

  const setArrowDisplay = () => {
    const forecast = document.querySelector('.forecast-content');
    const arrows = document.querySelectorAll('.forecast-arrow');
  
    // checks if content within forecast container overflows
    if (forecast.clientWidth < forecast.scrollWidth) {
      // eslint-disable-next-line consistent-return
      arrows.forEach((arrow) => {
        if (arrow.classList.contains('hide-arrow')) {
          arrow.classList.remove('hide-arrow');
        }
      });
    } else {
      // eslint-disable-next-line consistent-return
      arrows.forEach((arrow) => {
        if (!arrow.classList.contains('hide-arrow')) {
          arrow.classList.add('hide-arrow');
        }
      });
    }
  };

  const checkError = () => {
    const error = document.querySelector('.error-display');
    
    if (error.classList.contains('hide-error')) {
      return false;
    }

    return true;
  };

  const showError = () => {
    const error = document.querySelector('.error-display');
    error.classList.remove('hide-error');
  };

  const hideError = () => {
    const error = document.querySelector('.error-display');
    error.classList.add('hide-error');
  };

  return { 
    renderHome, 
    renderCurrent, 
    renderDetails, 
    clear,
    clearContainer,
    renderDayCard,
    renderHourCard,
    toggleForecastSelection,
    scrollForecastContent,
    setArrowDisplay,
    showError,
    hideError,
    checkError,
    resetSearch,
  };
})();

// eslint-disable-next-line import/prefer-default-export
export { dom };