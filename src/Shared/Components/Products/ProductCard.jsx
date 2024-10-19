import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getProductbyId } from '../../Services/products/apiProducts';
import UseCart from "../../Services/Store/UseCart";

import { apisavecart } from "../../Services/Cart/apiCart";
import useAuth from '../../Services/Store/useAuth';

import apiurl from '../../Services/api/apiendpoint';


function ProductCard() {
  const { id } = useParams();
  const [currentProductImage, setCurrentProductImage] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [cart, setCart] = useState([]);
  const [zoom, setZoom] = useState({ backgroundPosition: '0% 0%', backgroundSize: '100%' });
  const [loading, setLoading] = useState(true);

  const handleImageClick = (image) => {
    setCurrentProductImage(image);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const product = await getProductbyId(id);
        setProductDetails(product);
        if (product && product.length > 0 && product[0].Images && product[0].Images.length > 0) {
          setCurrentProductImage(product[0].Images[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

    const addToCart = UseCart(state => state.addToCart);
    const cartItems = UseCart((state) => state.cartItems); 
    const { isLoggedIn, userdetails } = useAuth(); 

    const handleAddToCart = async (product) => {
        if (!isLoggedIn) {
            toast.error("Please log in to add items to your cart!");
            return;
        }

        const userDetails = userdetails();
        const cartItemsFromStore = cartItems || []; 

        if (cartItemsFromStore.some((item) => item.product._id === product._id)) {
            toast.error("Product is already in your cart!");
            return;
        }

        try {
            const cartData = { productId: product._id, Email: userDetails.Email, Quantity: 1 };
            await apisavecart(cartData); 

            addToCart(product); 
            toast.success("Product added to cart successfully!");
        } catch (error) {
            toast.error("Failed to add product to cart.");
            console.error("Error adding product to cart:", error);
        }
    };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoom({ backgroundPosition: `${x}% ${y}%`, backgroundSize: '150%', });
  };
  const handleMouseLeave = () => {
    setZoom({ backgroundPosition: '0% 0%', backgroundSize: '100%' });
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (!productDetails) {
    return <div>No product details available.</div>;
  }

  return (
    <section className='mx-auto max-w-[70rem] px-5 my-10'>
      {productDetails.map((product, index) => (
        <div className="grid grid-cols-5 gap-4 lg:grid-cols-10 lg:gap-10">
          <div className='flex flex-col col-span-1 gap-3'>
            {product.Images && product.Images.length > 0 ? (
              product.Images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  className='w-full cursor-pointer hover:scale-105 duration-200 hover:border h-[65px] hover:border-black'
                  src={`${apiurl()}/${product.Images[0]}`}
                  alt={`product-${imgIndex + 1}`}
                  onClick={() => handleImageClick(image)}
                />
              ))
            ) : (
              <p>No Images Available</p>
            )}
          </div>
          <div className='flex flex-col col-span-4'>
            <div
              className='relative overflow-hidden w-full lg:h-[370px] md:h-[500px] h-[370px]'
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundImage: `url(${currentProductImage || ''})`,
                backgroundSize: zoom.backgroundSize,
                backgroundPosition: zoom.backgroundPosition,
                backgroundRepeat: 'no-repeat',
              }}
            >
              <img
                className='absolute top-0 left-0 object-cover w-full h-full'
                src={currentProductImage}
                alt='selected product'
                style={{ opacity: 0 }}
              />
            </div>
            <div className='flex justify-between px-4 mt-4'>
              <button
                className='border py-2 lg:px-4 px-2 rounded-lg flex gap-1 text-white hover:scale-105 duration-200 bg-[#E38734]  '
                onClick={() => handleAddToCart(product)}
              >
                <span className=''>
                  <img src='/assets/Images/Header/Shopping Cart.png' alt='cart' />
                </span>
                Add to Cart
              </button>
              <Link to='/checkout'>
                <button className='border py-2 px-3 rounded-lg hover:scale-105 duration-200 text-white bg-[#00712D]'>
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
          <div className='flex flex-col col-span-5 gap-3'>
            <p className='text-xl text-gray-400'>
              {product.Product_Name}
            </p>
    
          
            
          </div>
        </div>
      ))}
    </section>
  );
}

export default ProductCard;

