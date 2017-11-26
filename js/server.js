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


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/location/:zipCode', (request, response) => {
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

app.listen(8080, () => {
  console.log('App is listening on port 8080!');
});
