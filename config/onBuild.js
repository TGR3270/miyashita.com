import fs from 'fs-extra';
import url from 'url';
import path from 'path';
import cheerio from 'cheerio';
import getRoutes from './getRoutes';

async function generateRedirects() {
  const prevRedirects = JSON.parse(
    await fs.readFile(path.resolve(__dirname, './redirects/redirects.json'), 'utf8'),
  );
  const prevSitemap = cheerio
    .load(
      await fs.readFile(path.resolve(__dirname, './redirects/miyashita.com.sitemap.xml'), 'utf8'),
      { xmlMode: true },
    )('loc')
    .map((_, el) => cheerio(el).text())
    .get()
    .map(link => decodeURIComponent(url.parse(link).pathname));
  const currentRoutes = await getRoutes();

  const redirects = [];
  for (const route of currentRoutes) {
    if (!route.getProps) {
      continue;
    }

    const info = await route.getProps();
    if (info.page && info.page._id) {
      const prev = prevRedirects[String(info.page._id)];
      if (prev) {
        const prevPathname = decodeURIComponent(url.parse(prev).pathname);
        const comparePathname =
          url.parse(prev).hostname === 'news.miyashita.com' ? `/news${prevPathname}` : prevPathname;

        if (route.path !== comparePathname) {
          redirects.push(`${prevPathname}  ${route.path}  301`);
        }
        if (prevSitemap.indexOf(prevPathname) !== -1) {
          prevSitemap.splice(prevSitemap.indexOf(prevPathname), 1);
        }
      }
      redirects.push(`/  p=${info.page._id}  ${route.path}  301`);
    }
    if (prevSitemap.indexOf(route.path) !== -1) {
      prevSitemap.splice(prevSitemap.indexOf(route.path), 1);
    }
  }

  const staticRedirects = await fs.readFile(
    path.resolve(__dirname, './redirects/redirects.txt'),
    'utf8',
  );
  const redirectsText = `${staticRedirects}\n${redirects.join('\n')}`;
  await fs.writeFile(path.resolve(__dirname, '../dist/_redirects'), redirectsText, 'utf8');

  console.error(prevSitemap.join('\n'));
}

export default async function onBuild() {
  await generateRedirects();
}
