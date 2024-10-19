import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
const productDetails = [
  {
    image: "/assets/Images/Products/product4.png",
    rating: "4.6",
    reviews: "2,264 Ratings & 195 Reviews",
    price: "$8.99",
    specifications: [
      { key: "Sales Package", value: "Pack of 1 Cloth Dryer Stand" },
      { key: "Pack of", value: "1" },
    ],
    general: [
      { key: "Material", value: "Plastic" },
      { key: "Shape", value: "Piggy Bank" },
      { key: "Place of Origin", value: "China" },
      { key: "Brand Name", value: "No" },
      { key: "Modal Number", value: "No" },
      { key: "Design", value: "Customized Designs" },
      { key: "MOQ", value: "50 Pcs" },
      { key: "Product name", value: "Reusable Wooden Money Box with Counter" },
      { key: "Usage", value: "Coin Saving Bank" },
      { key: "Function", value: "Save Money Bank" },
    ],
  },
  {
    image: "/assets/Images/Products/product5.png",
    rating: "4.7",
    reviews: "1,500 Ratings & 100 Reviews",
    price: "$8.99",
    specifications: [
      { key: "Sales Package", value: "Pack of 1 Wooden Box" },
      { key: "Pack of", value: "2" },
    ],
    general: [
      { key: "Material", value: "Wood and Metal" },
      { key: "Shape", value: "Rectangular Box" },
      { key: "Place of Origin", value: "India" },
      { key: "Brand Name", value: "No" },
      { key: "Modal Number", value: "Model123" },
      { key: "Design", value: "Handcrafted Designs" },
      { key: "MOQ", value: "30 Pcs" },
      { key: "Product name", value: "Reusable Wooden Money Box with Counter" },
      { key: "Usage", value: "Coin and Note Saving Box" },
      { key: "Function", value: "Money Storage" },
    ],
  },
  {
    image: "/assets/Images/Products/product6.png",
    rating: "4.7",
    reviews: "1,500 Ratings & 100 Reviews",
    price: "$8.99",
    specifications: [
      { key: "Sales Package", value: "Pack of 1 Wooden Box" },
      { key: "Pack of", value: "2" },
    ],
    general: [
      { key: "Material", value: "Wood and Metal" },
      { key: "Shape", value: "Rectangular Box" },
      { key: "Place of Origin", value: "India" },
      { key: "Brand Name", value: "No" },
      { key: "Modal Number", value: "Model123" },
      { key: "Design", value: "Handcrafted Designs" },
      { key: "MOQ", value: "30 Pcs" },
      { key: "Product name", value: "Reusable Wooden Money Box with Counter" },
      { key: "Usage", value: "Coin and Note Saving Box" },
      { key: "Function", value: "Money Storage" },
    ],
  },
];
function Doodle() {
  const [currentProductImage, setCurrentProductImage] = useState(productDetails[0].image);
  const [cart, setCart] = useState([]);
  const [zoom, setZoom] = useState({ backgroundPosition: '0% 0%', backgroundSize: '100%' });
  const handleImageClick = (index) => {
    setCurrentProductImage(productDetails[index].image);
  };
  const handleAddToCart = () => {
    const currentProduct = productDetails.find(product => product.image === currentProductImage);
    if (cart.includes(currentProduct)) {
      toast.success('Already added to Cart');
    } else {
      setCart([...cart, currentProduct]);
      toast.success('Added To Cart Successfully');
    }
  };
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoom({ backgroundPosition: `${x}% ${y}%`, backgroundSize: '200%' });
  };
  const handleMouseLeave = () => {
    setZoom({ backgroundPosition: '0% 0%', backgroundSize: '100%' });
  };
  return (
    <section className='mx-auto max-w-[70rem] px-5 my-10 lg:mt-0 mt-28'>
      <div className="grid lg:grid-cols-10 grid-cols-5 lg:gap-10 gap-4">
        <div className='col-span-1  flex flex-col gap-3 '>
          {productDetails.map((product, index) => (

            <img
              key={index}
              className='w-full cursor-pointer hover:scale-105 duration-200 hover:border h-[65px] hover:border-black'
              src={product.image}
              alt={`product-${index + 1}`}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
        <div className='col-span-4   flex flex-col'>
          <div
            className='relative overflow-hidden w-full  lg:h-[370px] md:h-[500px] h-[300px]  cursor-zoom-in '
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundImage: `url(${currentProductImage})`,
              backgroundSize: zoom.backgroundSize,
              backgroundPosition: zoom.backgroundPosition,
              backgroundRepeat: 'no-repeat'
            }}
          >
            <img
              className='absolute top-0 left-0 w-full h-full object-cover'
              src={currentProductImage}
              alt="selected product"
              style={{ opacity: 0 }}
            />
          </div>
          <div className='flex justify-between px-4 mt-4'>
            <button
              className='border py-2 lg:px-4 px-2 rounded-lg flex gap-1 text-white hover:scale-105 duration-200 bg-[#E38734]'
              onClick={handleAddToCart}
            >
              <span className=''><img className='md:block hidden' src="/assets/Images/Header/Shopping Cart.png" alt="cart" /></span><span className=''>Add to Cart</span>
            </button>
            <Link to='/order'>
              <button className='border py-2 px-3  rounded-lg hover:scale-105 duration-200 text-white bg-[#00712D]'>
                Buy Now
              </button>
            </Link>
          </div>
        </div>
        <div className='col-span-5 flex flex-col gap-3'>
          <p className="text-xl text-gray-400">
            {productDetails[0].general.find(g => g.key === "Product name").value}
          </p>
          <div className='flex items-center gap-3'>
            <div className='flex gap-4 bg-[#00712D] py-2 px-4 rounded-lg'>
              <p className="text-white text-xl">{productDetails[0].rating}</p>
              <img className='h-4 mt-1' src="/assets/Images/WishList/Star (2).png" alt="star" />
            </div>
            <p className='text-lg text-gray-400'>{productDetails[0].reviews}</p>
          </div>
          <p className="text-[#E38734] text-lg">
            <span className='text-2xl font-bold'>{productDetails[0].price}</span> (Min. 50 Pcs)
          </p>
          <div className='border mt-5'>
            <div className="border-b-2 p-4">
              <p className="text-xl font-bold">Specifications</p>
            </div>
            <div>
              <p className="px-4 py-2 text-xl">In The Box</p>
              <div className='grid grid-cols-3 p-4 text-gray-400 gap-1 grid-rows-2'>
                {productDetails[0].specifications.map((spec, index) => (
                  <React.Fragment key={index}>
                    <p className="col-span-1">{spec.key}</p>
                    <p className="col-span-2">{spec.value}</p>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className='border'>
            <div>
              <p className="px-4 py-2 text-xl">General</p>
              <div className='grid grid-cols-3 text-gray-400 p-4 gap-1 grid-rows-2'>
                {productDetails[0].general.map((gen, index) => (
                  <React.Fragment key={index}>
                    <p className="col-span-1">{gen.key}</p>
                    <p className="col-span-2">{gen.value}</p>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Doodle;
