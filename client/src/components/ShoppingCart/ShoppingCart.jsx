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
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import colorMiScusi from "../Palettes/GreenColor.jsx"; // Paleta para color verde
import { ThemeProvider } from "@mui/material/styles";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchShoppingCart, fetchFavorites, keepLog, deleteFavorites, deleteCart, setNotLogedShoppingCart, addCart } from "../../redux/StoreUsers/usersActions.js";
import { getBooks } from "../../redux/StoreBooks/booksActions.js";
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

  if(props.match.params.type === 'cart' && value === 1) setValue(0);
  if(props.match.params.type === 'favorite' && value === 0) setValue(1);

  const dispatch = useDispatch();
  const history = useHistory()
  //Cuando tengamos las rutas acá deberian ir los favoritos y añadidos al carrito por ahora solo le paso el topten.
  const {shoppingCart} = useSelector((state) => state.users);
  const {favorites} = useSelector((state) => state.users);
  const { books } = useSelector((state) => state.books);
  const { loggedUser, login } = useSelector((state) => state.users);
  const accessToken =
  window.localStorage.getItem("token") ||
  window.sessionStorage.getItem("token");
  const cartToken = window.sessionStorage.getItem('cart')
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState("");
  ////////////////////////////////////////////////////////////////////////////////

  var totalShopping = 0;
  var envio = 8;

  useEffect(() => {
    dispatch(getBooks());
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
    totalShopping += (e.price * e.amount);
    // if(e.format !== "digital") envio = 8;
  });

  const handleClickBuy = async () => {
    const { data } = await CheckoutPayPal(loggedUser.id)
    window.location.href = data
  }

  function deleteFav(libroID){
    dispatch(deleteFavorites(loggedUser.id, libroID, accessToken));
  }

  function addToCart(libroID) {
    if (accessToken) {
      dispatch(addCart(loggedUser.id, libroID, 1, accessToken));
      setMsg("Book added to cart!");
      setOpen(true);
    }
  }

  function deleteCar(libroID){
    if(accessToken){
      dispatch(deleteCart(loggedUser.id, libroID, accessToken));
    } else if(cartToken){
      const cart = JSON.parse(window.sessionStorage.getItem('cart'));
      cart.books = cart.books.filter(el => el.id !== libroID);
      window.sessionStorage.removeItem('cart');
      if(cart.books.length > 0){
        window.sessionStorage.setItem('cart', JSON.stringify(cart)) 
      }
      dispatch(setNotLogedShoppingCart(JSON.stringify(cart)))
    }
  }

  function handleClose(){
    setOpen(false)
  }

  function updateAmount(datBook){
    var newValue = document.getElementById(datBook.id).value;
    const maxStock = books.filter(e => e._id === datBook.id);

    if(newValue <= 0 || newValue > maxStock[0].stock){
      setMsg(`Not enough stock! (Max ${maxStock[0].stock})`)
      setOpen(true)
      return "";
    }

    if (accessToken) {
      dispatch(addCart(loggedUser.id, datBook.id, newValue, accessToken));
    }else{
      const localCart = {
        books: [],
      };
      const cart = JSON.parse(window.sessionStorage.getItem("cart"));
      if (cart) {
        localCart.books = [...cart.books];
      }
      const bookNew = {
        id: datBook.id,
        name: datBook.name,
        price: datBook.price,
        image: datBook.image,
        amount: newValue,
      };
      localCart.books = localCart.books.filter((b) => b.id !== bookNew.id);
      localCart.books.push(bookNew);
      window.sessionStorage.removeItem("cart");
      window.sessionStorage.setItem("cart", JSON.stringify(localCart));
      dispatch(setNotLogedShoppingCart(JSON.stringify(localCart)));
    }
    setMsg("Updated!")
    setOpen(true)
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
                <BottomNavigationAction onClick={() => history.push("/shopping/cart")} className="bottomNavigationActionx" label="Shopping Cart" icon={<ShoppingCartIcon />} />
               { loggedUser.id ? <BottomNavigationAction onClick={() => history.push("/shopping/favorite")} className="bottomNavigationActionx" label="Favorites" icon={<FavoriteIcon />} /> : null}
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
                          <div className="amountContent">
                            <div>
                              <span>Amount: </span>
                              <input id={el.id} type="number" className="input" defaultValue={el.amount}
                                 min={1} max={10}/>
                            </div>
                            <div>
                                <button className="buttonUpdate" onClick={() => updateAmount(el)}>Update</button>
                            </div>
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
                          <div>
                            <button className="buttonView" onClick={() => addToCart(el.id)}>Add to cart</button>
                          </div>
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
                <div className="directionBuy">
                  <span>Shipment: ${envio}</span>
                </div>
                <span>Total with shipping: ${(totalShopping + envio).toFixed(2)}</span>
            </div>
            <div>
            {loggedUser.id ? 
                <button className="buttonBack" onClick={handleClickBuy}>Buy</button>
                : 
                <button className="buttonBack" onClick={() => history.push("/login")}>Log In</button>
            }
            </div>
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
      message={msg}
      action={action}
    />
    </div>
  );
}