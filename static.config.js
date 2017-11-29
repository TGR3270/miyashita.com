import Document from './src/containers/Document';
import renderToHtml from './config/renderToHtml';
import webpack from './config/webpack';
import getRoutes from './config/getRoutes';
import onBuild from './config/onBuild';

const siteRoot = 'https://miyashita.com';

export default {
  Document,
  renderToHtml,
  webpack,
  getSiteProps: () => ({
    site: {
      title: 'Miyashita Lab',
      description:
        '明治大学 総合数理学部 先端メディアサイエンス学科 / 明治大学大学院 先端数理科学研究科 先端メディアサイエンス専攻 宮下研究室',
      twitter: '@Miyashita_Lab',
      root: siteRoot,
    },
  }),
  siteRoot,
  getRoutes,
  onBuild,
};
