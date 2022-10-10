// import logo from './logo.svg';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Details from './components/Details.jsx';
import UserLogin from './components/UserLogin';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/books/:id" component={Details} />
        <Route path="/login" component={UserLogin} />
      </React.Fragment>
    </div>
  );
}

export default App;
