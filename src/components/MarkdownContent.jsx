import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import unified from 'unified';
import remarkHtml from 'remark-html';

import styles from './MarkdownContent.css';

const processor = unified()
  .use(remarkHtml)
  .freeze();

const MarkdownContent = props => (
  <div className={styles.markdownBody}>
    <div dangerouslySetInnerHTML={{ __html: props.html || processor.stringify(props.ast) }} />
  </div>
);

export default withStyles(styles)(MarkdownContent);
