import React from 'react';
import { getRouteProps } from 'react-static';

import ContentWrapper from '../components/ContentWrapper';
import MarkdownContent from '../components/MarkdownContent';

const Article = ({ article }) => (
  <ContentWrapper>
    <MarkdownContent ast={article.content} />
  </ContentWrapper>
);

export default getRouteProps(Article);
