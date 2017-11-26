/**
 * File contains helper functions that are used
 * to make the REQUEST flow smoother
 */

// @flow

/**
 * Converts given Fahrenheit temperature to celsius.
 *
 * @param temp is the given temperature
 */
function convertFahrenheitToCelsius(temp: number): number {
  return (5 / 9) * (temp - 32);
}
/**
 * Constructs the URL that will be used to get temperature from Yahoo
 * @param zipCode is the zipCode whose temperature will be queried
 * @returns {string} url that will be used for a REST call
 */
function constructUrl(zipCode: string): string {
  const baseUrl = 'http://query.yahooapis.com/v1/public/yql?q=';
  const yqlQuery = `select item.condition from weather.forecast where woeid in 
     (select woeid from geo.places(1) where text="${zipCode}")`;
  const tailUrl = '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%'
    + '2Falltableswithkeys&callback=';
  return baseUrl + encodeURIComponent(yqlQuery) + tailUrl;
}

/**
 * Builds properly formatted JSON object
 * @param temp is the temperature
 * @param scale is the scale that the temperature will be displayed in
 * @returns JSON object
 */
function buildJSON(temp: string, scale: string) {
  const jsonObject = {};
  let jsonScale = 'Fahrenheit';
  let jsonTemp = temp;
  if (scale === 'Celsius') {
    // Converts string to Number, performs the calculation, rounds, then converts back to a string
    jsonTemp = Math.round(convertFahrenheitToCelsius(Number(temp))).toString();
    jsonScale = scale;
  }
  jsonObject.temperature = jsonTemp;
  jsonObject.scale = jsonScale;
  return jsonObject;
}

const helpers = {
  constructUrl,
  buildJSON,
};

module.exports = helpers;
