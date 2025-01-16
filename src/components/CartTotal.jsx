import React, {useContext, useEffect} from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import useCartTotal from '../utils/useCartTotal';
const CartTotal = () => {

  const { currency, delivery_fee } = useContext(ShopContext);  
  const totalAmount = useCartTotal();
  
  return (
    <div className='w-full'>
      <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTAL'}></Title>
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency}{totalAmount}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Shipping Fee</p>
            <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Total</p>
            <p>{currency}{totalAmount === 0 ? 0: totalAmount + delivery_fee }.00</p>
        </div>
        <hr />
      </div>
    </div>
  )
}

export default CartTotal
