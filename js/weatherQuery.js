/***
 * Class performs the weather queries using Yahoo's Weather
 * API.
 */
class WeatherQuery {

  /**
   * Class constructor.
   */
  constructor() {
    // Intentionally left blank.
  }

  /**
   * Accepts a zip code and returns a JSON
   * containing the temperature at given zip code.
   *
   * @param zipCode is the zip code whose temperature will be queried.
   */
  processWeatherLocation(zipCode: string) {
    let YQL = require('yql');

    const query = new YQL('select * from weather.forecast where (location = ' + zipCode + ')');

    query.exec(function (err, data) {
      let location = data.query.results.channel.location;
      let condition = data.query.results.channel.item.condition;

      console.log('The current weather in ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees.');
    });
  }
}

export default WeatherQuery;