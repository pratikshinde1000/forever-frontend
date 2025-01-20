import { createContext, useEffect, useState } from "react";
import { getRequest, postRequest } from "../services/apiServices";

import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export const ShopContext = createContext({
  products: [],
  currency: "₹",
  delivery_fee: 10,
  showSearch: false,
  search: "",
  setShowSearch: () => { },
  setSearch: () => { },
  cartProducts: [],
  setCartProducts: () => { },
  addToCart: () => { },
  getCartCount: () => { },
  updateCartQuantity: () => { },
  removeCartProduct: () => { },
  getCartTotal: () => { },
  clearCartProduct: () => {},
  placeOrder: () => { },
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  token: '',
  setToken: () => { }
});

const ShopContextProvider = (props) => {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');




  useEffect(() => {
    fetchProducts();
  }, [])

  const isTokenExpired = (accessToken) => {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    const check =  decodedToken.exp < currentTime;
    if(!check){
      return false;
    }else{
      setToken(storedToken);
      return true;
    }
  }

  const getToken = () => {
    if (token) {
      const expiry = isTokenExpired(token);
      if(expiry){
        localStorage.removeItem('token');
        setToken('');
        navigate('/login')
      }
    } else if (!token && localStorage.getItem('token')) {
      const storedToken = localStorage.getItem('token');
      const expiry = isTokenExpired(storedToken);
      if(expiry){
        localStorage.removeItem('token');
        setToken('');
        navigate('/login')
      }else{
        setToken(storedToken);
        return storedToken;
      }
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await getRequest(`${backendUrl}/api/product/get`);
      setProducts(response?.data?.data);
      const token = getToken();
      // console.log('token', token);
      if(token)
        getCartProduct({ headers: { token } });
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Internal Server Error');
    }
  }

  const getCartProduct = async (headers) => {
    try {
      const response = await getRequest(`${backendUrl}/api/cart/get`, headers);
      if (response.data.data) {
        const cartData = response?.data?.data || [];
        console.log('cartData', cartData)
        setCartProducts(cartData)
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  const clearCartProduct = async () => {
    setCartProducts([]);
  }

  useEffect(() => {
    if (token) {
      updateCartProducts(cartProducts, { headers: { token } });
    }
  }, [cartProducts]);

  const updateCartProducts = async (cartData, headers) => {
    try {
      await postRequest(`${backendUrl}/api/cart/update`, { cartData }, headers);
    } catch (error) {
      console.log('error', error);
    }
  }


  const addToCart = (itemId, size, name, price) => {

    if (!size) {
      toast.error('Please select size of the product.');
      return;
    }
    const existingCart = structuredClone(cartProducts);
    const indexValue = existingCart.findIndex(x => x._id == itemId && x.size == size);
    if (indexValue >= 0) {
      existingCart[indexValue] = { _id: itemId, size: size, name: name, price: price, quantity: existingCart[indexValue].quantity + 1 }
      setCartProducts(existingCart);
    } else {
      const newCart = [...existingCart, { _id: itemId, size: size, name: name, price: price, quantity: 1 }];
      setCartProducts(newCart);
    }
  }




  const updateCartQuantity = (itemId, size, quantity = 1, name, price) => {
    if (quantity > 0) {
      const existingCart = structuredClone(cartProducts);
      const indexValue = existingCart.findIndex(x => x._id == itemId && x.size == size);
      if (indexValue >= 0) {
        existingCart[indexValue] = { _id: itemId, size: size, name: name, price: price, quantity: Number(quantity) }
        setCartProducts(existingCart);
      }
    }
  }

  const removeCartProduct = (index) => {
    // console.log('cart Index', index);
    const cloneCart = structuredClone(cartProducts)
    toast.success('Product removed from cart');
    cloneCart.splice(index, 1);
    setCartProducts(cloneCart);
  }

  const getCartTotal = () => {
    let totalAmount = 0;
    cartProducts.map((item) => {
      const product = products.find((x) => x._id === item._id);
      totalAmount += product.price * item.quantity
    });
    return totalAmount;
  }


  const getCartCount = () => {
    let totalCount = cartProducts.reduce((accumulator, current) => {
      accumulator += current.quantity;
      return accumulator;
    }, 0);
    return totalCount;
  }


  const value = {
    products: products,
    currency: "₹",
    delivery_fee: 10,
    showSearch,
    setShowSearch,
    search,
    setSearch,
    cartProducts,
    setCartProducts,
    addToCart,
    getCartCount,
    updateCartQuantity,
    removeCartProduct,
    getCartTotal,
    clearCartProduct,
    navigate,
    backendUrl,
    token,
    setToken
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
