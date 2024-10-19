import React, { useState, useEffect } from "react";
import axios from 'axios';
import { getAllProducts } from "../../Shared/Services/products/apiProducts";
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  if (loading) {
    return <div>Loading products...</div>;
  }

  // const products = [
  //   { Product_Name: 'Reusable Wooden Money Box with Counter...', Images: 'http://192.168.0.107:5173/assets/Images/Products/product6.png', Sale_Price: '5.99', piece: '50' },
  //   { Product_Name: 'E-Writing Doodle Board for Kids...', Images: '/Images/product4.png', Sale_Price: '8.99', piece: '50' },
  //   { Product_Name: 'Selfie Stick', Images: '/Images/product7.png', Sale_Price: '5.99', piece: '50' },
  //   { Product_Name: 'E-Writing Doodle Board for Kids...', Images: '/Images/product5.png', Sale_Price: '8.99', piece: '50' }
  // ]
  return (
    <>
      <section className="w-full mt-10">
        <div className="w-full max-w-screen-lg mx-auto">
          <div className="p-2 text-white bg-[#00712D] w-28 rounded-lg text-center mx-auto text-xl">
            Products
          </div>
          <div className="grid grid-cols-1 gap-5 p-5 my-5 md:grid-cols-2 lg:grid-cols-3 lg:px-0">
            {products.map((item, index) => (
              <div key={index} className="flex flex-col p-4 duration-300 border-2 rounded-3xl group hover:shadow-lg hover:-translate-y-1">
                <div className="w-full mx-auto overflow-hidden rounded-2xl">
                  <img className="w-full object-center object-cover border h-[300px] cursor-pointer rounded-2xl "
                    src={item.Images}
                    alt={item.Product_Name} />
                </div>
                <div>
                  <h3 className="py-4 text-xl text-center opacity-50 lg:min-h-24">{item.Product_Name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className='text-[#E38734] text-3xl font-bold'>${item.Sale_Price}</h2>
                      <p className="text-lg opacity-50">(Min. 50 Pcs)</p>
                    </div>
                    <div >
                      <button className="p-2 px-4 text-white bg-[#00712D] rounded-lg text-center mx-auto font-semibold">Buy now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductPage;
