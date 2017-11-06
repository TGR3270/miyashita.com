import url from 'url';
import path from 'path';
import rehype from 'rehype';
import visit from 'unist-util-visit';

export default async function getYoutubeThumbnail(ast) {
  let youtubeUrl = null;

  visit(ast, 'html', node => {
    let continueFlag = true;
    const ast = rehype.parse(node.value);
    visit(ast, 'element', node => {
      if (node.tagName === 'iframe' && /youtube\.com/.test(node.properties.src)) {
        youtubeUrl = node.properties.src;
        continueFlag = false;
      }
      return continueFlag;
    });
    return continueFlag;
  });

  if (!youtubeUrl) {
    return null;
  }

  const id = path.basename(url.parse(youtubeUrl, true).pathname);
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
