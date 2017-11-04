import glob from 'glob-promise';
import getJSONFromFile from './getJSONFromFile';

async function getArticleList(globStr) {
  const files = await glob(globStr);
  const promises = files.map(getJSONFromFile);
  const results = (await Promise.all(promises)).sort((a, b) => b.date - a.date);
  return results;
}

export default getArticleList;
