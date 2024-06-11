import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { HashRouter } from 'react-router-dom';

import axios from 'axios';
import { RecoilRoot } from 'recoil';

import Router from '@/router';

import Crash from '@/components/Crash';
import Message, { message } from '@/components/Message';

import '@/scripts/axios';
import '@/global.less';

window.onunhandledrejection = (event) => {
  axios
    .post('/api/tilty/bug/report', {
      href: window.location.href,
      error: JSON.stringify(event.reason, ['message', 'arguments', 'type', 'name']),
    })
    .catch((err) => {
      console.error(err);
    });
  message.show({
    content: JSON.stringify(event.reason, ['message', 'arguments', 'type', 'name']),
  });
};

const root = document.getElementById('root');

root && ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RecoilRoot>
      <ErrorBoundary fallbackRender={Crash}>
        <HashRouter>
          <Router />
        </HashRouter>
      </ErrorBoundary>
      <Message />
    </RecoilRoot>
  </React.StrictMode>,
);
