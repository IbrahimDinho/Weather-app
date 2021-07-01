import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Home  from './Home';
import {Settings} from './Settings';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/Settings' component={Settings}/>
        </Switch>
    </Router>
    );
  }
}

export default App;