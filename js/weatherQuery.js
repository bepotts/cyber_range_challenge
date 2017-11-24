/***
 * Class performs the weather queries using Yahoo's Weather
 * API.
 */

import request from 'request';

class WeatherQuery {


  /**
   * Class constructor.
   */
  constructor() {
    this.url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.' +
      'forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)' +
      '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
  }

  /**
   * Accepts a zip code and returns a JSON
   * containing the temperature at given zip code.
   *
   * @param zipCode is the zip code whose temperature will be queried.
   */
  async processWeatherLocation(zipCode) {

    let rp = require('request-promise');

    rp(this.url).then((body) => {

      console.log('This is the body: ' + body);
      return body;
    });

     // const temp = await request(this.url, (error, response, body) => {
     //   console.log("This is the error: " + error);
     //   console.log("This is the response: " + response);
     //   console.log("This is the body: " + body);
     //   a = body;
     // });

     // console.log('This is about to be the temp');
     // console.log(temp);
    // let YQL = require('yql');
    //
    // const query = new YQL('select * from weather.forecast where (location = ' + zipCode + ')');
    //
    // query.exec(function (err, data) {
    //   let location = data.query.results.channel.location;
    //   let condition = data.query.results.channel.item.condition;
    //
    //   console.log('The current weather in ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees.');
    // });
  }
}

export default WeatherQuery;