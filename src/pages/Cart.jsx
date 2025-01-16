import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal  from '../components/CartTotal';
import { toast } from 'react-toastify';

const Cart = () => {
  const { products, currency, cartProducts, updateCartQuantity, removeCartProduct, navigate } = useContext(ShopContext);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cartProducts);
  }, [cartProducts])

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      
      if(cartItems?.length === 0){
        const error = 'Cart Is Empty!';
        throw error;
      }

      navigate('/place-order');

    } catch (error) {
      console.log('error', error);
      toast.error(error || 'Error Occurred!')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='border-t pt-14'>

      <div className='text-2xl mb-3'>

        <Title text1={'YOUR'} text2={'CART'}></Title>

      </div>

      <div>
        {cartItems.map((item, index) => {
          const productData = products.find((x) => x._id === item._id);
          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>

              <div className='flex items-start gap-6'>
                <img src={productData.image[0]} className='w-16 sm:w-20' alt="" />
                <div className=''>
                  <p className='text-xs font-medium sm:font-lg'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input onChange={(e) => e.target.value == '' || e.target.value == 0 ? null : updateCartQuantity(item._id, item.size, e.target.value, productData?.name, productData?.price)} type="number" className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' min={1} defaultValue={item.quantity} required/>
              <img onClick={() => removeCartProduct(index)} src={assets.bin_icon} className='w-4 mr-4 sm:w-5 cursor-pointer' alt="" />
            </div>
          )
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button type='submit' className='uppercase bg-black text-white text-sm my-8 px-8 py-3 rounded'>proceed to checkout</button>
          </div>
        </div>
      </div>



    </form>
  )
}

export default Cart
