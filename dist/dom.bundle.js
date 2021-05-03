/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dom": () => (/* binding */ dom)
/* harmony export */ });
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXJfYXBwLy4vc3JjL2RvbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsNEJBQTRCO0FBQ25EO0FBQ0EsT0FBTztBQUNQLHFCQUFxQixjQUFjO0FBQ25DLDJCQUEyQixTQUFTO0FBQ3BDLHVCQUF1Qiw0QkFBNEI7QUFDbkQ7QUFDQSxPQUFPO0FBQ1AscUJBQXFCLHFCQUFxQixJQUFJLFNBQVM7QUFDdkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLFVBQVUsSUFBSSxVQUFVOztBQUVsRDtBQUNBO0FBQ0EsMENBQTBDLHFCQUFxQjtBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQyxzQkFBc0I7QUFDdkQ7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRCIsImZpbGUiOiJkb20uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCBkb20gPSAoKCkgPT4ge1xuICBjb25zdCByZW5kZXJIb21lID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICAgIGNvbnN0IG1haW5Db250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWFpbicpO1xuXG4gICAgY29uc3QgY3VycmVudFdlYXRoZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjdXJyZW50V2VhdGhlci5jbGFzc05hbWUgPSAnY3VycmVudC13ZWF0aGVyJztcblxuICAgIGNvbnN0IGlucHV0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGlucHV0V3JhcHBlci5jbGFzc05hbWUgPSAnbG9jYXRpb24tc2VhcmNoJztcblxuICAgIGNvbnN0IGxvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGxvY2F0aW9uSW5wdXQudHlwZSA9ICd0ZXh0JztcblxuICAgIGNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHNlYXJjaEJ0bi50eXBlID0gJ2J1dHRvbic7XG5cbiAgICBjb25zdCBzZWFyY2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIHNlYXJjaEljb24uY2xhc3NOYW1lID0gJ2ZhcyBmYS1zZWFyY2gnO1xuXG4gICAgc2VhcmNoQnRuLmFwcGVuZENoaWxkKHNlYXJjaEljb24pO1xuXG4gICAgaW5wdXRXcmFwcGVyLmFwcGVuZENoaWxkKGxvY2F0aW9uSW5wdXQpO1xuICAgIGlucHV0V3JhcHBlci5hcHBlbmRDaGlsZChzZWFyY2hCdG4pO1xuXG4gICAgY29uc3QgY3VycmVudERhdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjdXJyZW50RGF0YS5jbGFzc05hbWUgPSAnY3VycmVudC1kYXRhJztcblxuICAgIG1haW5Db250ZW50LmFwcGVuZENoaWxkKGN1cnJlbnRXZWF0aGVyKTtcbiAgICBtYWluQ29udGVudC5hcHBlbmRDaGlsZChpbnB1dFdyYXBwZXIpO1xuICAgIG1haW5Db250ZW50LmFwcGVuZENoaWxkKGN1cnJlbnREYXRhKTtcblxuICAgIGNvbnN0IGZvcmVjYXN0Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGZvcmVjYXN0Q29udGVudC5jbGFzc05hbWUgPSAnZm9yZWNhc3QtY29udGVudCc7XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWFpbkNvbnRlbnQpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JlY2FzdENvbnRlbnQpO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlckRldGFpbHMgPSAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LWRhdGEnKTtcblxuICAgIGxldCB1dmlMZXZlbDtcbiAgICBzd2l0Y2ggKE1hdGgucm91bmQoZGF0YS51dmkpKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHV2aUxldmVsID0gJ2xvdyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgY2FzZSA0OlxuICAgICAgY2FzZSA1OlxuICAgICAgICB1dmlMZXZlbCA9ICdtb2RlcmF0ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA2OlxuICAgICAgY2FzZSA3OlxuICAgICAgICB1dmlMZXZlbCA9ICdoaWdoJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDg6XG4gICAgICBjYXNlIDk6XG4gICAgICBjYXNlIDEwOlxuICAgICAgICB1dmlMZXZlbCA9ICd2ZXJ5IGhpZ2gnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHV2aUxldmVsID0gJ2V4dHJlbWUnO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBsYWJlbHMgPSB7XG4gICAgICAnRmVlbHMgTGlrZSc6IGAke01hdGgucm91bmQoZGF0YS5mZWVsc19saWtlKX3CsCR7XG4gICAgICAgIGRhdGEudW5pdCA9PT0gJ2ltcGVyaWFsJyA/ICdGJyA6ICdDJ1xuICAgICAgfWAsXG4gICAgICAnSHVtaWRpdHknOiBgJHtkYXRhLmh1bWlkaXR5fSVgLFxuICAgICAgJ0NoYW5jZSBvZiBSYWluJzogYCR7ZGF0YS5wb3B9JWAsXG4gICAgICAnV2luZCBTcGVlZCc6IGAke01hdGgucm91bmQoZGF0YS53aW5kX3NwZWVkKX0gJHtcbiAgICAgICAgZGF0YS51bml0ID09PSAnaW1wZXJpYWwnID8gJ21waCcgOiAna20vaCdcbiAgICAgIH1gLFxuICAgICAgJ1VWIEluZGV4JzogYCR7TWF0aC5yb3VuZChkYXRhLnV2aSl9ICgke3V2aUxldmVsfSlgXG4gICAgfTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBhcnJheS1jYWxsYmFjay1yZXR1cm5cbiAgICBPYmplY3QuZW50cmllcyhsYWJlbHMpLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbGFiZWwuY2xhc3NOYW1lID0gJ2N1cnJlbnQtZGF0YS1sYWJlbCc7XG4gICAgICBsYWJlbC50ZXh0Q29udGVudCA9IGtleTtcblxuICAgICAgY29uc3QgZGF0YVZhbHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkYXRhVmFsdWUuY2xhc3NOYW1lID0gJ2N1cnJlbnQtZGF0YS12YWx1ZSc7XG4gICAgICBkYXRhVmFsdWUudGV4dENvbnRlbnQgPSB2YWx1ZTtcblxuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkYXRhVmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlckN1cnJlbnQgPSAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXdlYXRoZXInKTtcblxuICAgIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjaXR5LmNsYXNzTmFtZSA9ICdjaXR5LW5hbWUnO1xuICAgIGNpdHkudGV4dENvbnRlbnQgPSBkYXRhLmNpdHk7XG5cbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGF0ZS5jbGFzc05hbWUgPSAnY3VycmVudC1kYXRlJztcbiAgICBkYXRlLnRleHRDb250ZW50ID0gYCR7ZGF0YS5kYXRlfSwgJHtkYXRhLnRpbWV9YDtcblxuICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpY29uLnNyYyA9IFxuICAgICAgYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YS53ZWF0aGVyWzBdLmljb259QDJ4LnBuZ2A7XG4gICAgaWNvbi5hbHQgPSAnd2VhdGhlci1pY29uJztcblxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGVzY3JpcHRpb24uY2xhc3NOYW1lID0gJ2N1cnJlbnQtZGVzY3JpcHRpb24nO1xuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uXG4gICAgICAuc3BsaXQoJyAnKVxuICAgICAgLm1hcCh3b3JkID0+IHdvcmRbMF0udG9VcHBlckNhc2UoKSArIHdvcmQuc3Vic3RyKDEpKVxuICAgICAgLmpvaW4oJyAnKTtcblxuICAgIGNvbnN0IHRlbXBlcmF0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGVtcGVyYXR1cmUuY2xhc3NOYW1lID0gJ2N1cnJlbnQtdGVtcGVyYXR1cmUnO1xuICAgIHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChkYXRhLnRlbXApfcKwJHtcbiAgICAgIGRhdGEudW5pdCA9PT0gJ2ltcGVyaWFsJyA/ICdGJyA6ICdDJ1xuICAgIH1gO1xuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNpdHkpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkYXRlKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRlbXBlcmF0dXJlKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuICB9O1xuXG4gIHJldHVybiB7IHJlbmRlckhvbWUsIHJlbmRlckN1cnJlbnQsIHJlbmRlckRldGFpbHMgfTtcbn0pKCk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0XG5leHBvcnQgeyBkb20gfTsiXSwic291cmNlUm9vdCI6IiJ9