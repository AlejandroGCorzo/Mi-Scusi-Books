import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./HeaderNav.css";
import userIcon from "../../sourceImg/user.svg"
import userShopping from "../../sourceImg/shopping-cart.svg"

export default function headerNav(onSearch) {
    const userLogueado = false; //Hasta que no tenga para ver si tengo el usuario logueado uso esta variable
    return(
        <div className='header'>
        <Link to="/" style={{ textDecoration: 'none'}}>
            <div className='logo'>
                <p>Scusi Book's</p>
            </div>
        </Link>

        <SearchBar
          onSearch={onSearch}
        />

        <div>
            {userLogueado ? 
            <div className='iconsContainer'>
                <Link to="/user/id"><img src={userIcon} alt=''/></Link>
                <Link to="/store"><img src={userShopping} alt=''/></Link>
            </div>
            :
            <div className='iconsContainer'>
                <Link to="/login" style={{ textDecoration: 'none'}}><p>Login</p></Link>
                <Link to="/create" style={{ textDecoration: 'none'}}><p>Sign Up</p></Link>
            </div>
            }
        </div>

        </div>
    )
}