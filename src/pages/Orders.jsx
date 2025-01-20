import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
// import axios from 'axios';
import { assets } from '../assets/assets';
import { getRequest } from '../services/apiServices';
const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (token) {
      getOrders();
    }
  }, [token])


  const getOrders = async () => {
    try {
      const response = await getRequest(`${backendUrl}/api/order/get`, { headers: { token } });
      console.log('Order List', response?.data);
      if (response?.data?.data) {
        setOrderList(response?.data?.data);
      }

    } catch (error) {
      console.log('getOrders Error', error);
    }
  }



  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          orderList.map((item, index) => {

            const totalQuntity = item.cartData.reduce((acc, curr) => {
              acc += Number(curr.quantity);
              return acc;
            }, 0)

            const sizes = item.cartData.map((item) => {
              return item.size;
            }).toString();


            return <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <div className='flex flex-col w-40'>
                  <img src={assets.order_icon} className='w-16 sm:w-20' alt="" />
                  <p className='sm:text-base font-medium'>{item?.order_no}</p>
                </div>
                <div>
                  <div className='flex gap-1 flex-col text-base text-gray-700 w-52'>
                    <p>Total: {currency}{item?.cartAmount}</p>
                    <p>Quantity: {totalQuntity}</p>
                    <p>Size: {sizes}</p>
                    <p>Payment Mode: <span className='text-gray-400'>{item?.paymentMode}</span>  </p>
                    <p>Payment Status: <span className='text-gray-400'>{item?.paymentStatus}</span>  </p>
                    <p>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span> </p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col items-start' >
                {
                  item?.cartData?.map((element, index) => {
                    const totalPrice = Number(element?.quantity) * Number(element.products.price);
                    if (index === item?.cartData?.lenth - 1) {
                      return <p key={index}> {`${++index}) Name: ${element?.products?.name} (Size: ${element?.size}) Price: ${element?.quantity} * ${element?.products?.price} = ${totalPrice}`} </p>
                    } else {
                      return <p key={index}>{`${++index}) Name: ${element?.products?.name} (Size: ${element?.size})  Price: ${element?.quantity} * ${element?.products?.price} = ${totalPrice}`} </p>
                    }
                  }
                  )
                }
              </div>
              <div className='flex flex-col items-start'>
                <p>Name: {item?.address?.first_name} {item?.address?.last_name}</p>
                <p>Email: {item?.address?.email}</p>
                <p>Contact: {item?.address?.contact}</p>
                <p>Address: {item?.address?.street}, {item?.address?.city}, {item?.address?.state}, {item?.address?.country}, {item?.address?.pincode}. </p>
              </div>
              <div className='flex items-center gap-2'>
                <p className={`min-w-2 h-2 rounded-full ${item?.status === 'ORDER_CANCELLED' ? 'bg-red-500' : 'bg-green-500'}`}></p>
                <p className='text-sm md:text-base'>
                  {item.status.split('_').join(' ')}
                </p>
              </div>

            </div>
          })
        }
      </div>


    </div>
  )
}

export default Orders
