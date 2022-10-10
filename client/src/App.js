// import logo from './logo.svg';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home.jsx';
import Details from './components/Details/Details.jsx';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/books/:id" component={Details} />
      </React.Fragment>
    </div>
  );
}

export default App;
