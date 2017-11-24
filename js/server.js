/**
 * Server information about the application
 *
 */


import express from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
import WeatherQuery from './weatherQuery';

const app = express();
const compiler = webpack(webpackConfig);
const query = new WeatherQuery();

const url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.' +
  'forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)' +
  '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
}));
app.use(webpackHotMiddleware(compiler));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/location', (request, response) => {

  let rp = require('request-promise');

  rp(url).then((body) => {
    const query = JSON.parse(body).query;
    response.send(JSON.stringify(query) + ' plus Hello world');
  });
});

app.listen(8080, () => {
  console.log('App is listening on port 8080!');
});
