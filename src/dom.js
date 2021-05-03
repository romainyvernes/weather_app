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

    const forecastContent = document.createElement('div');
    forecastContent.className = 'forecast-content';

    container.appendChild(mainContent);
    container.appendChild(forecastContent);
  };

  const renderDetails = (data) => {
    const container = document.querySelector('.current-data');

    let uviLevel;
    switch (Math.round(data.uvi)) {
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
      'Chance of Rain': `${data.pop}%`,
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

    const icon = document.createElement('img');
    icon.src = 
      `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = 'weather-icon';

    const description = document.createElement('div');
    description.className = 'current-description';
    description.textContent = data.weather[0].description
      .split(' ')
      .map(word => word[0].toUpperCase() + word.substr(1))
      .join(' ');

    const temperature = document.createElement('div');
    temperature.className = 'current-temperature';
    temperature.textContent = `${Math.round(data.temp)}°${
      data.unit === 'imperial' ? 'F' : 'C'
    }`;

    container.appendChild(city);
    container.appendChild(date);
    container.appendChild(icon);
    container.appendChild(temperature);
    container.appendChild(description);
  };

  return { renderHome, renderCurrent, renderDetails };
})();

// eslint-disable-next-line import/prefer-default-export
export { dom };