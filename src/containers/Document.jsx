import React from 'react';

const Document = ({ Html, Head, Body, children, renderMeta }) => (
  <Html lang="ja">
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style data-ssr dangerouslySetInnerHTML={{ __html: renderMeta.styles }} />
    </Head>
    <Body>{children}</Body>
  </Html>
);

export default Document;
