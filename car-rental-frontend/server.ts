import * as path from 'path';
import * as express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: process.env['TARGET'] || 'localhost:3000',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  })
);

app.use(express.static('./dist/car-rental-frontend'));

app.use('*', (req, res) => {
  res.sendFile(path.resolve('./dist/car-rental-frontend/index.html'));
});

app.listen(process.env['PORT'] || 4200);
