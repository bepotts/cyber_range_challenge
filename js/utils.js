
"use strict";

/***
 * Constructs the URL that will be used to get temperature from Yahoo
 * @param zipCode is the zipCode whose temperature will be queried
 * @returns {string} url that will be used for a REST call
 */
function constructUrl(zipCode: string): string{

  const baseUrl = 'http://query.yahooapis.com/v1/public/yql?q=';
  const yqlQuery = 'select item.condition from weather.forecast where woeid in'
    + ' (select woeid from geo.places(1) where text="' + zipCode + '")';
  const tailUrl = '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%'
    + '2Falltableswithkeys&callback=';
  return baseUrl + encodeURIComponent(yqlQuery) + tailUrl;
}

/***
 * Converts given Fahrenheit temperature to celsius.
 *
 * @param temp is the given temperature
 */
function convertFahrenheitToCelsius(temp: Number): Number {
  return (5/9) * (temp - 32);
}

module.exports = constructUrl;
