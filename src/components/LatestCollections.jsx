import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollections = () => {

  const { products } = useContext(ShopContext);


  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products?.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-col-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          latestProducts?.map((product, index)=> {
            return <ProductItem key={index} name={product.name} id={product._id} image={product.image} price={product.price} ></ProductItem>
          })
        }
      </div>
    </div>
  );
};

export default LatestCollections;
