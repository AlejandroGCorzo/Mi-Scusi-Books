// import logo from './logo.svg';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home.jsx';
import Details from './components/Details/Details.jsx';
import UserLogin from './components/UserLogin/UserLogin.jsx';
import Nav from './components/HeaderNav/HeaderNav.jsx';
import CreateBook from './components/CreateBook/01-CreateBook.jsx';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Nav onSearch="" />
        <Route exact path="/" component={Home} />
        <Route path="/books/:id" component={Details} />
        <Route path="/login" component={UserLogin} />
        <Route path="/create" component={CreateBook} />
      </React.Fragment>
    </div>
  );
}

export default App;
