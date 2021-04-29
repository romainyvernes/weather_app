import './styles.css';

const app = (() => {
  const API_KEY = '69055aa414e2da2ff325d776cdced0db';

  const getData = async ({lat, lon}) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await response.json();

    console.log(data);
  };

  return { getData };
})();

window.onload = () => {
  app.getData({lat: 33.44, lon: -94.04});
};
