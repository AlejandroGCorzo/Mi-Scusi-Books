// import logo from './logo.svg';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home.jsx';
import Details from './components/Details/Details.jsx';
import UserLogin from './components/UserLogin/UserLogin.jsx';
import Nav from './components/HeaderNav/HeaderNav.jsx';
import CreateBook from './components/CreateBook/CreateBook.jsx';
import Results from './components/Results/Results';
import Category from './components/Category/Category.jsx';
import UserDetails from './components/UserDetails/UserDetails';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Nav onSearch="" />
        <Route exact path="/" component={Home} />
        <Route path="/book_details/:id" component={Details} />
        <Route path="/login" component={UserLogin} />
        <Route path="/create" component={CreateBook} />
        <Route path="/books/:type/:value" component={Results} />
        <Route path="/categories" component={Category} />
        <Route path="/user_details" component={UserDetails} />
      </React.Fragment>
    </div>
  );
}

export default App;
