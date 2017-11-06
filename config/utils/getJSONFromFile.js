import fs from 'fs-extra';
import path from 'path';
import Remark from 'remark';
import remarkFrontMatter from 'remark-frontmatter';
import remarkInlineLinks from 'remark-inline-links';
import visit from 'unist-util-visit';
import YAML from 'js-yaml';
import moment from 'moment';

const remark = Remark()
  .use(remarkFrontMatter)
  .use(remarkInlineLinks)
  .freeze();

async function getJSONFromFile(filePath) {
  const fileName = path.basename(filePath);

  const ast = remark.parse(await fs.readFile(filePath, 'utf8'));
  const config = { content: ast };

  // YAML Frontmatter
  if (ast.children[0].type === 'yaml') {
    const { value: configStr } = ast.children.shift();
    Object.assign(config, YAML.safeLoad(configStr) || {}, config);
  }
  // Date
  const dateStr = config.date || (fileName.match(/^(\d+[/-]\d+[/-]\d+)/) || [])[1];
  const date = moment(dateStr, ['YYYY-MM-DD HH:mm Z', 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD']);
  Object.assign(config, {
    date: date.toDate(),
    year: date.year(),
    month: date.month() + 1,
    day: date.date(),
  });
  // Thumbnail
  if (!config.thumbnail) {
    visit(ast, 'image', node => {
      if (node.url) {
        config.thumbnail = node.url;
        return true;
      }
      return false;
    });
  }

  return config;
}

export default getJSONFromFile;
