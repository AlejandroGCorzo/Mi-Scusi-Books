import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./ShoppingCart.css";
import CloseIcon from "@mui/icons-material/Close";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import colorMiScusi from "../Palettes/GreenColor.jsx"; // Paleta para color verde
import { ThemeProvider } from "@mui/material/styles";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchShoppingCart, fetchFavorites, keepLog, deleteFavorites, deleteCart, setNotLogedShoppingCart } from "../../redux/StoreUsers/usersActions.js";
import CheckoutPayPal from "../../components/Paypal/PayPal"
import { IconButton, Snackbar } from "@mui/material";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // console.log(children)
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function ShoppingCart(props) {
  var valueIndex = 0;
  if(props.match.params.type === 'favorite') valueIndex = 1;

  const [value, setValue] = React.useState( valueIndex );
  const dispatch = useDispatch();
  const history = useHistory()
  //Cuando tengamos las rutas acá deberian ir los favoritos y añadidos al carrito por ahora solo le paso el topten.
  const {shoppingCart} = useSelector((state) => state.users);
  const {favorites} = useSelector((state) => state.users);
  const { loggedUser, login } = useSelector((state) => state.users);
  const accessToken =
  window.localStorage.getItem("token") ||
  window.sessionStorage.getItem("token");
  const cartToken = window.sessionStorage.getItem('cart')
  const [open, setOpen] = useState(false)
  ////////////////////////////////////////////////////////////////////////////////

  var totalShopping = 0;
  const envio = 8;

  useEffect(() => {
    if (accessToken) {
      // dispatch(keepLog(accessToken));  
      dispatch(fetchFavorites(loggedUser.id));
      dispatch(fetchShoppingCart(loggedUser.id));
    }
    if(accessToken && cartToken && shoppingCart.length === 0){
      dispatch(setNotLogedShoppingCart(cartToken))
    }
    if(cartToken && !accessToken){
      dispatch(setNotLogedShoppingCart(cartToken))
    }

    return () => {
      if(accessToken){
        window.sessionStorage.removeItem('cart');
        
      }
    }
  }, [dispatch, login]);

  shoppingCart?.forEach(e => {
     totalShopping += e.price;
  });

  const handleClickBuy = async () => {
    const { data } = await CheckoutPayPal()
    // console.log("hola", data)
    window.location.href = data
  }

  function deleteFav(libroID){
    dispatch(deleteFavorites(loggedUser.id, libroID, accessToken));
  }

  function deleteCar(libroID){
    if(accessToken){
      dispatch(deleteCart(loggedUser.id, libroID, accessToken));
    } else if(cartToken){
      const cart = JSON.parse(window.sessionStorage.getItem('cart'));
      cart.books = cart.books.filter(el => el.id !== libroID);
      window.sessionStorage.removeItem('cart');
      window.sessionStorage.setItem('cart', JSON.stringify(cart)) 
      dispatch(setNotLogedShoppingCart(JSON.stringify(cart)))
    }
  }

  function handleClose(){
    setOpen(false)
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        style={{ width: "50px" }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="contentCategory">
      
    <Box sx={{ width: '100%' }} >
    <ThemeProvider theme={colorMiScusi}>
        <div className="titleFormShopping">
            <BottomNavigation
                showLabels
                value={value}
                className="bottomNavigation"
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction className="bottomNavigationActionx" label="Shopping Cart" icon={<ShoppingCartIcon />} />
               { loggedUser.id ? <BottomNavigationAction className="bottomNavigationActionx" label="Favorites" icon={<FavoriteIcon />} /> : null}
            </BottomNavigation>
           
        </div>
        </ThemeProvider>
        <div className="contentShoppingDetail">
            <div className="itemsShoppingDetail">
            <TabPanel value={value} index={0} className="tabPanel">
                  {shoppingCart?.map((el) => (
                    <div className="conteinerShopping" key={el.id}>
                        <div className="contenedorx">
                          <div className="contentImage">
                            <img src={el.image} alt="" />
                          </div>
                          <div className="contenedorItems">
                          <span>{el.name[0].toLocaleUpperCase() + el.name.slice(1)}</span>
                          <div>
                            <span>$
                              {el.price.toString().length === 2
                              ? el.price + ".00"
                              : el.price}
                            </span>
                          </div>
                          <Link to={`/book_details/${el.id}`} style={{ textDecoration: "none" }}>
                              <button className="buttonView">View</button>
                          </Link>
                          <div>
                            <button className="buttonDelete" onClick={() => deleteCar(el.id)} >Delete</button>
                          </div>
                              
                          
                        </div>
                      </div>
                    </div>
                  ))}
                </TabPanel>

                <TabPanel value={value} index={1} className="tabPanel">
                  {favorites?.map((el) => (
                    <div className="conteinerShopping" key={el.id}>
                        <div className="contenedorx">
                          <div className="contentImage">
                            <img src={el.image} alt="" />
                          </div>
                          <div className="contenedorItems">
                          <span>{el.name[0].toLocaleUpperCase() + el.name.slice(1)}</span>
                          <div>
                            <span>$
                              {el.price.toString().length === 2
                              ? el.price + ".00"
                              : el.price}
                            </span>
                          </div>
                          <Link to={`/book_details/${el.id}`} style={{ textDecoration: "none" }}>
                              <button className="buttonView">Buy</button>
                          </Link>
                          
                          <div>
                            <button className="buttonDelete" onClick={() => deleteFav(el.id)} >Delete</button>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  ))}
                </TabPanel>
            </div>
        </div>

        <div className="formBackx">
          {value === 0 ?
          <div className="contBuy">
            <div className="textBuy">
                <span>Shipment: ${envio}</span>
                <span>Total with shipping: ${(totalShopping + envio).toFixed(2)}</span>
            </div>
            {/* <Link to="/" style={{ textDecoration: "none" }}> */}
            {
              loggedUser.id ? 
                <button className="buttonBack" onClick={handleClickBuy}>Buy</button>
              : 
                <button className="buttonBack" onClick={() => history.push("/login")}>Log In</button>
            }
            {/* </Link> */}
          </div>: 
          <Link to="/" style={{ textDecoration: "none" }}>
              <button className="buttonBack">Back</button>
          </Link>}
        </div>
    </Box>
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message="Book added to cart"
      action={action}
    />
    </div>
  );
}