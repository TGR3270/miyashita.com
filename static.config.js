import Document from './src/containers/Document';
import renderToHtml from './config/renderToHtml';
import webpack from './config/webpack';
import getRoutes from './config/getRoutes';

const siteRoot = 'https://miyashita.com';

export default {
  Document,
  renderToHtml,
  webpack,
  getSiteProps: () => ({
    site: {
      title: 'Miyashita Lab',
      root: siteRoot,
    },
  }),
  siteRoot,
  getRoutes,
};
