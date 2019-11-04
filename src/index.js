import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import './index.css';
import PickDestination from './PickDestination';
import ShareOrigin from './ShareOrigin';
import Intro from './Intro';
import PageContainer from './PageContainer';
import Adventure from './Adventure';
import SharePage from './SharePage';
import * as serviceWorker from './serviceWorker';

const App = () => (
  <PageContainer>
    <Router>
      <Switch>
        <Route path="/share/:dest_lat/:dest_lon" component={SharePage} exact />
        <Route path="/adventure/:dest_lat/:dest_lon" component={Adventure} exact />
        <Route path="/destination" component={PickDestination} exact />
        <Route path="/origin" component={ShareOrigin} exact />
        <Route path="/" component={Intro} />
      </Switch>
    </Router>
  </PageContainer>
);

ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
