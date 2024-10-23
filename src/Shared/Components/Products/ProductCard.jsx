import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getProductbyId } from '../../Services/products/apiProducts';
import UseCart from "../../Services/Store/UseCart";
import { apisavecart } from "../../Services/Cart/apiCart";
import useAuth from '../../Services/Store/useAuth';
import apiurl from '../../Services/api/apiendpoint';
import '../Products/Pro.css'
import ReactImageMagnify from 'react-image-magnify';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

function ProductCard() {
  const { id } = useParams();
  const [currentProductImage, setCurrentProductImage] = useState(0);
  const [productDetails, setProductDetails] = useState(null);
  const [cart, setCart] = useState([]);
  const [zoom, setZoom] = useState({ backgroundPosition: '0% 0%', backgroundSize: '100%' });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const product = await getProductbyId(id);
        console.log(product)
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
    <section className='mx-auto max-w-[70rem] px-5 my-10 lg:mt-0 mt-32'>
      {productDetails &&
        <div className="grid grid-cols-5 gap-4 lg:grid-cols-10 lg:gap-10">
          <div className='flex flex-col col-span-1 gap-3'>
            {productDetails.Images && productDetails.Images.length > 0 ? (
              productDetails.Images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  className='w-full cursor-pointer hover:scale-105 duration-200 hover:border h-[65px] hover:border-black'
                  src={`${apiurl()}/${image}`}
                  alt={`product-${image + 1}`}
                  onClick={() => setCurrentProductImage(imgIndex)}
                />
              ))
            ) : (
              <p>No Images Available</p>
            )}
          </div>
          <div className=' col-span-4'>
            {/* <div
              className='relative overflow-hidden w-full lg:h-[420px] md:h-[560px] z-30 h-[320px]'
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundImage: `url(${apiurl()}/${productDetails.Images[currentProductImage]})`,
                backgroundSize: zoom.backgroundSize,
                backgroundPosition: zoom.backgroundPosition,
                backgroundRepeat: 'no-repeat',

              }}
            > */}

            <div className="relative flex justify-center">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: 'Product Image',
                    isFluidWidth: true,
                    src: `${apiurl()}/${productDetails.Images[currentProductImage]}`,
                    width: 1200,
                    height: 900,
                  },
                  largeImage: {
                    src: `${apiurl()}/${productDetails.Images[currentProductImage]}`,
                    width: 1200,
                    height: 900,
                  },
                  enlargedImagePosition: 'beside',
                  enlargedImageContainerDimensions: {
                    width: '150%',
                    height: '150%',
                  },

                  shouldUsePositiveSpaceLens: true
                }}
              />
            </div>



            {/* <img
                className='w-full cursor-zoom-in -z-30'
                src={`${apiurl()}/${productDetails.Images[currentProductImage]}`}
                alt='product-thumbnail'
              
              />  */}



            {/* </div> */}
          </div>
          <div className='flex flex-col col-span-5 space-y-5 gap-3'>
            <div>
              <p className='text-3xl text-gray-400 mb-2'>
                {productDetails.Product_Name}
              </p>
              <p className="text-base text-[#E38734]"> <span className='text-xl font-bold'>  $ {productDetails.Sale_Price} </span> (min 50 pcs)</p>
              <div className='flex  gap-3  mt-4'>
                <Link to='/checkout'>
                  <button className='border py-2 px-3 rounded-lg hover:scale-105 duration-200 text-white bg-[#00712D]'>
                    Buy Now
                  </button>
                </Link>
                <button
                  className='border py-2 lg:px-4 px-2 rounded-lg flex gap-1 text-white hover:scale-105 duration-200 bg-[#E38734]  '
                  onClick={() => handleAddToCart(productDetails)}
                >
                  <span className=''>
                    <img src='/assets/Images/Header/Shopping Cart.png' alt='cart' />
                  </span>
                  Add to Cart
                </button>

              </div>
            </div>
            <div className='border border-gray-100 '>
              <p className="md:text-xl text-sm font-semibold p-2 text-black  border-b-1">Specifications</p>
              <div className='p-2' dangerouslySetInnerHTML={
                { __html: productDetails.Product_Description }
              } />
            </div>
          </div>
        </div>
      }
    </section>
  );
}
export default ProductCard;
