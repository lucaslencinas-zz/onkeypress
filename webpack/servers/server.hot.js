import config from 'config';
import cors from 'cors';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../configs/config.hot';
import renderHTML from './renderHTML';
import { initializeSocketConnection } from './sockets';

require('css-modules-require-hook')({
  generateScopedName: '[hash:base64:5]',
  camelCase: true
});

const app = express();
const server = http.Server(app);
const compiler = webpack(webpackConfig);
const io = socketIO(server);

app.use(cors());
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  historyApiFallback: true
}));
app.use(webpackHotMiddleware(compiler));

app.use('/*', (req, res) => renderHTML(req, res));

server.listen(config.uri.port, config.hostname, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎 App running on http://${config.uri.hostname}:${config.uri.port}/`);
  }
});

initializeSocketConnection(io);
