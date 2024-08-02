import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Escrow from './Escrow'; 

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <div>Main Page</div>} />
        <Route path="/escrow" component={Escrow} />
        <Route path="*" component={() => <div>404 Not Found</div>} />
      </Switch>
    </Router>
  );
};

export default App;