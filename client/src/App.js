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
import PaymentAcepted from "./components/Paypal/PaymentAcepted.jsx";
import AccountCreate from "./components/AccountCreate/AccountCreate.jsx";
import About from "./components/About/About.jsx";
import NewPassword from "./components/ForgotPassword/NewPassword";
import ActivationMail from "./components/ActivationMail/ActivationMail";
import ProblemReport from "./components/Reports/ProblemReport";
import ReadPdf from "./components/ReadPDF/ReadPDF";
import ReportDone from "./components/Reports/ReportDone/ReportDone";
import LogInSuccessfully from "./components/UserLogin/LogInSuccessfully/LogInSuccessfully";
import ChatBot from "./components/ChatBot/ChatBot"
//
function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Nav onSearch="" />
        <ChatBot />
        <Route exact path="/" component={Home} />
        <Route path="/book_details/:id" component={Details} />
        <Route path="/login" component={UserLogin} />
        <Route path="/signup" component={AccountCreate} />
        <Route path="/create" component={CreateBook} />
        <Route exact path="/book/update/:id" component={CreateBook} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={ProblemReport} />
        <Route path="/report-successfully" component={ReportDone} />
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
        <Route path="/order-successfully" component={PaymentAcepted} />
        <Route path="/log-in-successfully" component={LogInSuccessfully} />
        <Route path="/newPassword" component={NewPassword} />
        <Route path="/readPDF" component={ReadPdf} />
        <Route exact path="/activation-mail/:id" component={ActivationMail} />
      </React.Fragment>
    </div>
  );
}

export default App;
