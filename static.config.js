import Document from './src/containers/Document';
import renderToHtml from './config/renderToHtml';
import webpack from './config/webpack';
import getRoutes from './config/getRoutes';

export default {
  Document,
  renderToHtml,
  webpack,
  getSiteProps: () => ({
    title: 'React Static',
  }),
  getRoutes,
};
