import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import unified from 'unified';
import reactRenderer from 'rehype-react';

import styles from './MarkdownContent.css';
import AwesomeIframe from './AwesomeIframe';
import OptimizeImage from './OptimizeImage';
import Link from './Link';

const MarkdownImage = props => <OptimizeImage maxWidth={512} {...props} />;

const processor = unified()
  .use(reactRenderer, {
    createElement: React.createElement,
    components: {
      iframe: AwesomeIframe,
      img: MarkdownImage,
      a: Link,
    },
  })
  .freeze();

const MarkdownContent = props => {
  const MarkdownJSX = processor().stringify(props.ast);
  return <div className={styles.markdownBody}>{MarkdownJSX}</div>;
};

export default withStyles(styles)(MarkdownContent);
