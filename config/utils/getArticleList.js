import glob from 'glob-promise';
import getJSONFromFile from './getJSONFromFile';
import { compile } from 'path-to-regexp';

async function getArticleList(globStr, defaultValues = {}) {
  const files = await glob(globStr);
  const promises = files.map(getJSONFromFile);
  const results = (await Promise.all(promises))
    .map(info => ({ ...defaultValues, ...info }))
    .map(info => ({
      ...info,
      permalink: compile(info.permalink || '/:title')(info),
    }))
    .sort((a, b) => b.date - a.date);
  return results;
}

export default getArticleList;
