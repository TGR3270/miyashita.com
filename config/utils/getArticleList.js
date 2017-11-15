import glob from 'glob-promise';
import getJSONFromFile from './getJSONFromFile';
import pathToRegexp from 'path-to-regexp';
import sanitize from 'sanitize-filename';

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
          title: sanitize(info.title, { replacement: '-' }),
        }),
      ),
    }))
    .sort((a, b) => b.date - a.date);
  return results;
}

export default getArticleList;
