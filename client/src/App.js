// import logo from './logo.svg';
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home.jsx";
import Details from "./components/Details/Details.jsx";
import UserLogin from "./components/UserLogin/UserLogin.jsx";
import Nav from "./components/HeaderNav/HeaderNav.jsx";
import CreateBook from "./components/CreateBook/CreateBook.jsx";
import Books from "./components/Books/Books.jsx";
import Category from "./components/Category/Category.jsx";
import UserDetails from "./components/UserDetails/UserDetails";
import AdminPanel from "./components/AdminPanel/AdminPanel.jsx";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart.jsx";
import AccountCreate from "./components/UserAccountCreate/UserAccountCreate.jsx";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Nav onSearch="" />
        <Route exact path="/" component={Home} />
        <Route path="/book_details/:id" component={Details} />
        <Route path="/login" component={UserLogin} />
        <Route path="/signup" component={AccountCreate} />
        <Route path="/create" component={CreateBook} />
        <Switch>
          <Route
            exact
            path="/books/:theme/:category/:subcategory"
            component={Books}
          />
          <Route exact path="/books/:theme/:category" component={Books} />
          <Route exact path="/books/:theme" component={Books} />
          <Route path="/books" component={Books} />
        </Switch>
        <Route path="/categories" component={Category} />
        <Route path="/user_details/:id" component={UserDetails} />
        <Route path="/admin_panel" component={AdminPanel} />
        <Route path="/shopping/:type" component={ShoppingCart} />
      </React.Fragment>
    </div>
  );
}

export default App;
