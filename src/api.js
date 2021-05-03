const api = (() => {
  const API_KEY = '69055aa414e2da2ff325d776cdced0db';

  const getData = async ({city, lat, lon, unit = 'imperial'}) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      const data = await response.json();

      data.unit = unit;
      data.city = city;
  
      return data;
    } catch(err) {
      return err;
    }
  };

  const getCoords = async ({city, state = '', country = ''}) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}${state ? ',' : ''}${state}${country ? ',' : ''}${country}&appid=${API_KEY}`
      );
      const data = await response.json();
  
      return {
        lat: data.coord.lat,
        lon: data.coord.lon,
        city: data.name
      };
    } catch(err) {
      return err;
    }
  };

  return { getData, getCoords };
})();

// eslint-disable-next-line import/prefer-default-export
export { api };
