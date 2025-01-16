import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import useCartTotal from '../utils/useCartTotal';

const PlaceOrder = () => {

  const { navigate, backendUrl, token, cartProducts, delivery_fee, clearCartProduct } = useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState('POD');
  const cartAmount = useCartTotal();
  const [formData, setFormData] = useState({
    first_name: 'pratik',
    last_name: 'shinde',
    email: 'pratikshinde1000@gmail.com',
    street: 'street no 123',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    pincode: '431203',
    contact: '9527573539'
  });


  const handleChange = (event) => {
    const name = event.target.name,
      value = event.target.value;
    setFormData((state) => { return { ...state, [name]: value } })
  }

  const handleSubmit = async (event) => {
    try {
      console.log('handle Submit');
      event.preventDefault();

      if(cartProducts?.length === 0){
        const error = 'Cart Is Empty!';
        throw error;
      }

      const data = {
        address: { ...formData },
        paymentMethod: paymentMethod,
        cartData: cartProducts,
        cartAmount: (cartAmount + delivery_fee),
        paymentMode: paymentMethod,
        paymentStatus: 'PENDING',
        status: 'ORDER_PLACED',
      }
      console.log('final order', data);
      const response = await axios.post(`${backendUrl}/api/order/create`, data, { headers: { token } });
      console.log('response', response?.data);
      if (response?.data) {
        toast.success(response?.data?.data?.message || 'Order created');
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          street: '',
          city: 'Pune',
          state: 'Maharashtra',
          country: 'India',
          pincode: '431203',
          contact: '9527573539'
        })
        clearCartProduct();
        navigate('/orders')
      }
    } catch (error) {
      console.log('error', error);
      toast.error(error?.response?.data?.error || 'Unable to place order');
    }

  }




  return (
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input value={formData?.first_name} onChange={handleChange} type="text" name='first_name' placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
          <input value={formData?.last_name} onChange={handleChange} type="text" name='last_name' placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
        </div>
        <input value={formData?.email} onChange={handleChange} type="email" name='email' placeholder='Email ID' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
        <input value={formData?.street} onChange={handleChange} type="text" name='street' placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
        <div className='flex gap-3'>
          <input value={formData?.city} onChange={handleChange} type="text" name='city' placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
          <input value={formData?.state} onChange={handleChange} type="text" name='state' placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
        </div>
        <div className='flex gap-3'>
          <input value={formData?.country} onChange={handleChange} type="text" name='country' placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
          <input value={formData?.pincode} onChange={handleChange} type="text" name='pincode' placeholder='Pincode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
        </div>
        <input value={formData?.contact} onChange={handleChange} type="number" maxLength={10} name='contact' placeholder='Contact' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
      </div>

      {/* Right Side */}

      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex flex-col lg:flex-row gap-3'>
            <div onClick={() => setPaymentMethod('STRIPE')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'STRIPE' ? 'bg-green-300' : ''}`}></p>
              <img className='h-5 mx-5' src={assets.stripe_logo} alt='' />
            </div>

            <div onClick={() => setPaymentMethod('RAZORPAY')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'RAZORPAY' ? 'bg-green-300' : ''}`}></p>
              <img className='h-5 mx-5' src={assets.razorpay_logo} alt='' />
            </div>

            <div onClick={() => setPaymentMethod('POD')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'POD' ? 'bg-green-300' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>PAY ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>



        </div>

      </div>

    </form>
  )
}

export default PlaceOrder
