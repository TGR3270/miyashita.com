import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AppContainer } from 'react-hot-loader';
import WithStylesContext from './components/WithStylesContext';

// Your top level component
import App from './App';

// Export your top level component as JSX (for static rendering)
export default App;

// Render your app
if (typeof document !== 'undefined') {
  const onInsertCss = styles => styles._insertCss();
  const render = Comp => {
    ReactDOM.hydrate(
      <AppContainer>
        <WithStylesContext onInsertCss={onInsertCss}>
          <Comp />
        </WithStylesContext>
      </AppContainer>,
      document.getElementById('root'),
    );
  };

  // Render!
  render(App);

  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept('./App', () => {
      // eslint-disable-next-line global-require
      render(require('./App').default);
    });
  }
}
