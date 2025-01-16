import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { assets } from '../assets/assets';
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
      const response = await axios.get(`${backendUrl}/api/order/list`, { headers: { token } });
      console.log('response', response?.data);
      if (response?.data?.data) {
        // setOrderList(response?.data?.data);
      }

    } catch (error) {
      console.log('error', error);
    }
  }

  console.log('orderList', orderList);


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
                  {/* <p className='sm:text-base font-medium'>Order ID: {item?.order_no}</p> */}
                  <div className='flex gap-1 flex-col text-base text-gray-700'>
                    <p>Total: {currency}{item?.cartAmount}</p>
                    <p>Quantity: {totalQuntity}</p>
                    <p>Size: {sizes}</p>
                    <p>Payment Mode: <span className='text-gray-400'>{item?.paymentMode}</span>  </p>
                    <p>Payment Status: <span className='text-gray-400'>{item?.paymentStatus}</span>  </p>
                    <p>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span> </p>
                  </div>
                </div>
              </div>
              <div className='flex justify-between md:w-8/12 items-center'>

                <div className='flex flex-col item-center w-48'>
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

                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'> {item?.status === 'ORDER_PLACED' ? 'Ready to Ship' : 'Product Delivered'}</p>
                </div>

                <button className='border h-12 px-2 rounded-lg text-base font-medium'>Track Order</button>

              </div>
            </div>
          })
        }
      </div>


    </div>
  )
}

export default Orders
