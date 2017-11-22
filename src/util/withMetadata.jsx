import React from 'react';

import PageMetadata from '../components/PageMetadata';

export default function withMetadata(Component) {
  const HOC = props => (
    <div style={{ width: '100%' }}>
      <PageMetadata />
      <Component {...props} />
    </div>
  );

  const componentName = Component.displayName || Component.name || 'Component';
  HOC.displayName = `withMetadata(${componentName})`;

  return HOC;
}
