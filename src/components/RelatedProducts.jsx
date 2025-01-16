import React, { useState, useContext, useEffect } from 'react';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { ShopContext } from '../context/ShopContext';


const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        let productsCopy = products.slice();
        productsCopy = productsCopy.filter(item => item.category === category && item.subCategory === subCategory);
        setRelatedProducts(productsCopy.slice(0, 5));
    }, [products])

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={'PRODUCTS'}></Title>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>

                {
                    relatedProducts.map((item, index) => {
                        return <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                    })
                }

            </div>

        </div>
    )
}

export default RelatedProducts
