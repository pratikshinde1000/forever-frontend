import React, { useContext, useState, useEffect } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);

  // console.log('BestSeller', products);

  const [bestSeller, SetBestSeller] = useState([]);

  useEffect(() => {
    const bestProducts = products?.filter((x) => x.bestSeller === true);
    // console.log('best',bestProducts);
    SetBestSeller(bestProducts?.slice(0, 5));
  }, [products]);




  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-col-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller?.map((product, index) => {
          return (
            <ProductItem
              key={index}
              name={product.name}
              id={product._id}
              image={product.image}
              price={product.price}
            ></ProductItem>
          );
        })}
      </div>
    </div>
  );
};

export default BestSeller;
