import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NotFound from 'pages/404';

const Home = lazy(() => import('pages/home'));
const Search = lazy(() => import('pages/search'));
const Account = lazy(() => import('pages/account'));
const Blocked = lazy(() => import('pages/blocked'));

const App = () => (
  <Router>
    <Suspense
      fallback={
        <div className="loading-ripple d-flex align-items-center justify-content-center w-100 vh-100">
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        </div>
      }
    >
      <div className="app__main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/blocked" component={Blocked} />

          {/* Others */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </Suspense>
  </Router>
);

export default App;
