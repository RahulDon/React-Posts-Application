import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Login from './component/login/Login';
import PostsList from './component/PostsList';
import PostDetail from './component/PostDetail';

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/posts" component={PostsList}/>
        <Route path="/details/:id" component={PostDetail}/>
        <Route path="/login" component={Login}/>
      </Switch> 
    </Router>
    </div>
  );
}

export default App;
