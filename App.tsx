import React, { Fragment, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { IntlProvider, FormattedMessage } from 'react-intl';
import Header from './pages/Header';
import messages from './lang';

function App() {
  const [lan, setLan] = useState('cn-zh');
  const msg = messages[lan];

  return (
    <IntlProvider locale={lan} key={lan} messages={msg}>
      <Fragment>
        <div>
          <button onClick={() => setLan('cn-zh')}>
            <FormattedMessage id="CHINESE" />
          </button>
          <button onClick={() => setLan('us-en')}>
            <FormattedMessage id="ENGLISH" />
          </button>
        </div>
        <Header />
        <Outlet />
      </Fragment>
    </IntlProvider>
  );
}

export default App;
