import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import { BiArrowToTop } from "react-icons/bi";
import { BiArrowFromTop } from "react-icons/bi";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { MdOutlineZoomIn } from "react-icons/md";


function ProductCard() {


  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();


  const thumbnailRef = useRef(null);

  const [currentProductImage, setCurrentProductImage] = useState(0);
  const [productDetails, setProductDetails] = useState(null);
  const [cart, setCart] = useState([]);
  const [zoom, setZoom] = useState({ backgroundPosition: '0% 0%', backgroundSize: '100%' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
    return <div className="flex justify-center items-center min-h-[70vh]"><div>Loading product details...</div></div> ;
  }
  if (!productDetails) {
    return <div>No product details available.</div>;
  }
  const scrollToThumbnail = (index) => {
    setCurrentProductImage(index);
    if (thumbnailRef.current) {
      const thumbnails = thumbnailRef.current.querySelectorAll('.thumbnail');
      if (thumbnails[index]) {
        // Smoothly scroll to the active thumbnail
        thumbnails[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  const scrollUp = () => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollBy({ top: -65, behavior: 'smooth' }); // Adjust scroll amount if needed
    }
  };

  const scrollDown = () => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollBy({ top: 65, behavior: 'smooth' }); // Adjust scroll amount if needed
    }
  };


  const slides = productDetails.Images.map((image) => ({
    src: `${apiurl()}/${image}`,
  }));












  const handleBuyNow = (product) => {
    if (!isLoggedIn) {
      toast.error("Please log in to Buy items!");
      navigate('/login')
      return;
    }
    localStorage.setItem("buyNowProduct", JSON.stringify(product));
    navigate("/checkout", { state: { product } }); // Navigate to checkout with product state
  };
  return (
    <section className='mx-auto max-w-[70rem] px-5 my-10 lg:mt-0 mt-32'>
      {productDetails &&
        <div className="grid grid-cols-5 gap-4 lg:grid-cols-10 lg:gap-10">
          <div className='px-2'>

            <button
              onClick={scrollUp}
              className='relative   left-1/2  transform -translate-x-1/2 z-10  px-3 py-1  '
            >
              <img src="/assets/Images/Header/Up Squared.png" className='w-8' alt="" />
            </button>

            <div
              className='flex flex-col gap-3 overflow-hidden md:h-[330px] h-[230px] relative'
              ref={thumbnailRef}
            >
              {productDetails.Images && productDetails.Images.length > 0 ? (
                productDetails.Images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    className={`w-full h-[65px] cursor-pointer hover:scale-105 duration-200 
                    ${currentProductImage === imgIndex ? 'border-2 border-black' : 'border-transparent'} 
                    thumbnail`}
                    src={`${apiurl()}/${image}`}
                    alt={`product-${image + 1}`}
                    onClick={() => scrollToThumbnail(imgIndex)}
                  />
                ))
              ) : (
                <p>No Images Available</p>
              )}
            </div>
            <button
              onClick={scrollDown}
              className='relative left-1/2 transform -translate-x-1/2 z-10 px-3 py-1 '
            >
              <img src="/assets/Images/Header/Drop Down.png" className='w-8' alt="" />
            </button>
          </div>
          <div className='col-span-4 '>

            <div className='relative'>


              <img
                className='w-full cursor-zoom-in -z-30  absolute'
                src={`${apiurl()}/${productDetails.Images[currentProductImage]}`}
                alt='product-thumbnail'

              />

              <div className='absolute right-0 p-4'>
                <button type="button" onClick={() => setOpen(true)}>
                  <MdOutlineZoomIn className='text-4xl' color='white' />
                </button>
              </div>

            </div>
            <Lightbox
              open={open}
              close={() => setOpen(false)}
              slides={slides}
              slideIndex={currentImageIndex} // Optionally, to start at the clicked image
              renderThumbnail={(index, { src }) => (
                <img
                  key={index}
                  className="w-24 h-24 cursor-pointer object-cover border-2 border-transparent hover:border-black"
                  src={src}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setOpen(true);
                  }}
                  alt={`thumbnail-${index}`}
                />
              )}
              thumbnailContainerStyle={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px', // Adjust spacing between thumbnails
                justifyContent: 'center', // Center the thumbnails
              }}
            />


          </div>
          <div className='flex flex-col col-span-5 gap-3 space-y-5'>
            <div>
              <p className='mb-2 text-3xl text-gray-400'>
                {productDetails.Product_Name}
              </p>
              <p className="text-base text-[#E38734]"> <span className='text-xl font-bold'>  $ {productDetails.Sale_Price} </span> (min 50 pcs)</p>
              <div className='flex gap-3 mt-4'>
                <button onClick={() => handleBuyNow(productDetails)} className='border py-2 px-3 rounded-lg hover:scale-105 duration-200 text-white bg-[#00712D]'>
                  Buy Now
                </button>
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
              <p className="p-2 text-sm font-semibold text-black md:text-xl border-b-1">Specifications</p>
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
