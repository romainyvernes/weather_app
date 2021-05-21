const api = (() => {
  const API_KEY = secret.API_KEY;

  const getData = async ({city, country, lat, lon, unit = 'imperial'}) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      const data = await response.json();

      data.unit = unit;
      data.city = city;
      data.country = country;
  
      return data;
    } catch(err) {
      return err;
    }
  };

  const getCoords = async ({location}) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
      );
      const data = await response.json();
  
      return {
        lat: data.coord.lat,
        lon: data.coord.lon,
        city: data.name,
        country: data.sys.country
      };
    } catch(err) {
      return err;
    }
  };

  return { getData, getCoords };
})();

// eslint-disable-next-line import/prefer-default-export
export { api };
