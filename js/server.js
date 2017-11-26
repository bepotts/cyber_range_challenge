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
import constructUrl from './utils';

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

  let rp = require('request-promise');
  const zipCode = request.params.zipCode;
  const url = constructUrl(zipCode);
  console.log('This is the generated URL: ' + url);

  rp(url).then((body) => {
    const query = JSON.parse(body).query;
    response.send(JSON.stringify(query) + ' plus Hello world');
  });
});

app.listen(8080, () => {
  console.log('App is listening on port 8080!');
});
