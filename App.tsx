import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Escrow from './Escrow';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/escrow" component={Escrow} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

const MainPage: React.FC = () => (
  <div>Main Page</div>
);

const NotFoundPage: React.FC = () => (
  <div>404 Not Found</div>
);

export default App;