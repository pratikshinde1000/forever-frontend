import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
const Products = () => {


  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [image, setImage] = useState();
  const [size, setSize] = useState('');


  const fetchProducts = () => {
    const product = products.find((x) => x._id === productId);
    console.log("product", product);
    if (product) {
      setImage(product.image[0]);
      setSelectedProduct(product);
      // setSize(product.sizes[0])
    }
  };

  useEffect(() => {
    console.log('size', size);
  }, [size]);

  useEffect(() => {
    window.scrollTo({top: 0, left:0, behavior: 'smooth'})
    fetchProducts();
  }, [productId]);

  return selectedProduct ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}

      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}

        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">

          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">

            {
              selectedProduct.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" />
              ))
            }

          </div>

          <div className="w-full sm:w-[80%]">

            <img src={image} className="w-full h-auto" alt="" />

          </div>

        </div>

        {/* Product Information */}

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{selectedProduct.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_dull_icon} className="w-3 5" alt="" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency} {selectedProduct.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{selectedProduct.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Product Size</p>
            <div className="flex gap-2">
              {
                selectedProduct.sizes.map((x, index) => {
                  return <button onClick={() => setSize(x)} className={`border py-2 px-4 bg-gray-100 ${x === size ? 'border-orange-500' : ''}`} key={index}>{x}</button>
                })
              }
            </div>
            <button onClick={()=> addToCart(selectedProduct._id, size, selectedProduct.name, selectedProduct.price)} className="bg-black text-white py-3 px-8 text-sm uppercase active:bg-gray-700">Add to cart</button>
            <hr className="mt-8 sm:w-4/5" />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original products.</p>
              <p>Cash on delivery is avilable on this product.</p>
              <p>Easy return and 7 days exchange policy.</p>
            </div>
          </div>

        </div>


      </div>

      {/* Description and Reviews Section */}

      <div className="mt-20">
        <div className="flex">

          <b className="border px-5 py-3 text-sm">
            Description
          </b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>

        </div>

        <div className="flex flex-col gap-4 border p-6 text-sm text-gray-500">
          <p>An ecommerce website is any site that facilitates the buying and selling of products and services. Digital marketplaces, online retail stores, and auction sites are considered ecommerce sites because they enable consumers to buy goods.</p>
          <p>E-commerce, or electronic commerce, refers to any type of commercial transaction that takes place over the internet. This can include buying and selling physical goods, as well as digital products and services. Unlike traditional retail stores, e-commerce businesses do not need to have a physical location.</p>
        </div>

      </div>

      {/* Display Related Products */}

      <RelatedProducts category={selectedProduct.category} subCategory={selectedProduct.subCategory} />



    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Products;
