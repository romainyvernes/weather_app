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
  !*** ./src/api.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "api": () => (/* binding */ api)
/* harmony export */ });
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


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXJfYXBwLy4vc3JjL2FwaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNBOztBQUVBLDBCQUEwQixrQ0FBa0M7QUFDNUQ7QUFDQTtBQUNBLCtEQUErRCxJQUFJLE9BQU8sSUFBSSxTQUFTLEtBQUssU0FBUyxRQUFRO0FBQzdHO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLCtCQUErQjtBQUMzRDtBQUNBO0FBQ0EsNkRBQTZELEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxTQUFTLFFBQVE7QUFDN0k7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRDtBQUNlIiwiZmlsZSI6ImFwaS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnN0IGFwaSA9ICgoKSA9PiB7XG4gIGNvbnN0IEFQSV9LRVkgPSAnNjkwNTVhYTQxNGUyZGEyZmYzMjVkNzc2Y2RjZWQwZGInO1xuXG4gIGNvbnN0IGdldERhdGEgPSBhc3luYyAoe2NpdHksIGxhdCwgbG9uLCB1bml0ID0gJ2ltcGVyaWFsJ30pID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZ1bml0cz0ke3VuaXR9JmFwcGlkPSR7QVBJX0tFWX1gXG4gICAgICApO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgICAgZGF0YS51bml0ID0gdW5pdDtcbiAgICAgIGRhdGEuY2l0eSA9IGNpdHk7XG4gIFxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgIHJldHVybiBlcnI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldENvb3JkcyA9IGFzeW5jICh7Y2l0eSwgc3RhdGUgPSAnJywgY291bnRyeSA9ICcnfSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JHtzdGF0ZSA/ICcsJyA6ICcnfSR7c3RhdGV9JHtjb3VudHJ5ID8gJywnIDogJyd9JHtjb3VudHJ5fSZhcHBpZD0ke0FQSV9LRVl9YFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGF0OiBkYXRhLmNvb3JkLmxhdCxcbiAgICAgICAgbG9uOiBkYXRhLmNvb3JkLmxvbixcbiAgICAgICAgY2l0eTogZGF0YS5uYW1lXG4gICAgICB9O1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICByZXR1cm4gZXJyO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBnZXREYXRhLCBnZXRDb29yZHMgfTtcbn0pKCk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0XG5leHBvcnQgeyBhcGkgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=