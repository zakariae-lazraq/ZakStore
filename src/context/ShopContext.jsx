import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext(null);

// eslint-disable-next-line react/prop-types
const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const AddToCart = (itemId, size) => {
    if (!size) {
      toast.error("Please Select Product Size");
      return; //stop the execution
    }
    const cartData = { ...cartItems };
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          // to extract the size
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    return totalCount;
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const product = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          // to extract the size
          if (cartItems[items][item] > 0) {
            totalAmount += product.price * cartItems[items][item];
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    return totalAmount;
  };
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = {};
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };
  const values = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    AddToCart,
    getCartCount,
    cartItems,
    updateQuantity,
    getTotalAmount,
    navigate
  };
  return <ShopContext.Provider value={values}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
