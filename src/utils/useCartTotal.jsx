import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
const useCartTotal = () => {
    const { getCartTotal  } = useContext(ShopContext);
    const total = getCartTotal() || 0;
    return total;
}

export default useCartTotal
