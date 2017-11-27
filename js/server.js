/**
 * Server configuration for the application
 */


import express from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
import helpers from './helpers';

const rp = require('request-promise');

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('public'));

// Create index route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Create route that will serve weather JSONs
app.get('/locations/:zipCode', (request, response) => {
  const zipCode = request.params.zipCode;
  const url = helpers.constructUrl(zipCode);
  let scale = '';
  if (typeof request.query.scale !== 'undefined') {
    scale = request.query.scale;
  }

  rp(url).then((body) => {
    const temp = JSON.parse(body).query.results.channel.item.condition.temp;
    response.send(helpers.buildJSON(temp, scale));
  });
});

// Set port to listen to
app.listen(8080, () => {
  console.log('App is listening on port 8080!');
});

// Send 404 error
app.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

// error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('There was an internal error.');
});