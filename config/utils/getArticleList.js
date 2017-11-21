import glob from 'glob-promise';
import getJSONFromFile from './getJSONFromFile';
import pathToRegexp from 'path-to-regexp';
import sanitize from 'sanitize-filename';
import slugize from 'hexo-util/lib/slugize';

async function getArticleList(globStr, defaultValues = {}) {
  const files = await glob(globStr);
  const promises = files.map(getJSONFromFile);
  const results = (await Promise.all(promises))
    .map(info => ({ ...defaultValues, ...info }))
    .map(info => ({
      ...info,
      permalink: decodeURIComponent(
        pathToRegexp.compile(info.permalink || '/:title')({
          ...info,
          title: sanitize(slugize(info.title, { separator: '-', transform: 1 }), {
            replacement: '-',
          }),
        }),
      ),
    }))
    .sort((a, b) => b.date - a.date);
  return results;
}

export default getArticleList;
