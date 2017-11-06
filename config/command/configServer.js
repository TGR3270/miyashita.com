import express from 'express';
import cors from 'cors';

import { findAvailablePort, getConfig } from 'react-static/lib/utils';

// Starts an express development sever to communicate between browser and node environments
export async function startConfigServer() {
  const config = getConfig();
  // scan a range
  const port = process.env.PORT || (await findAvailablePort(8000));
  process.env.STATIC_ENDPOINT = `http://127.0.0.1:${port}`;

  const configApp = express();
  configApp.use(cors());

  configApp.get('/siteProps', async (req, res, next) => {
    try {
      const siteProps = await config.getSiteProps({ dev: true });
      res.json(siteProps);
    } catch (err) {
      res.status(500);
      next(err);
    }
  });

  configApp.get('/getRoutes', async (req, res, next) => {
    try {
      const routes = await config.getRoutes({ dev: true });

      // Once all of the routes have been resolved, listen on individual
      // route endpoints
      routes.forEach(route => {
        const routePath = route.path
          .split('/')
          .map(d => encodeURIComponent(d))
          .join('/');
        configApp.get(`/route${routePath}`, async (req, res, next) => {
          try {
            const initialProps = await route.getProps({ dev: true });
            res.json(initialProps);
          } catch (err) {
            res.status(500);
            next(err);
          }
        });
      });

      res.json(routes.filter(d => d.hasGetProps).map(d => d.path));
    } catch (err) {
      res.status(500);
      next(err);
    }
  });

  configApp.listen(port, err => {
    if (err) {
      throw err;
    }
  });
}
