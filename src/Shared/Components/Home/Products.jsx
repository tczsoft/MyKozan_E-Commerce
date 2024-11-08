import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { getAllProducts } from '../../Services/products/apiProducts';
import apiurl from '../../Services/api/apiendpoint';
import useAuth from '../../services/store/useAuth';
import toast from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                setProducts(response.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleBuyNow = (product) => {
        if (!isLoggedIn) {
            toast.error("Please log in to Buy items!");
            navigate('/login');
            return;
        }
        localStorage.setItem("buyNowProduct", JSON.stringify(product));
        navigate("/checkout", { state: { product } });
    };

    const generateProductJSONLD = (product) => ({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.Product_Name,
        "image": product.Images.map(image => `${apiurl()}/${image}`),
        "description": "High-quality product available for bulk purchase",
        "brand": {
            "@type": "Brand",
            "name": "MY KOZAN"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": product.Sale_Price,
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "url": "https://mykozan.com" 
        }
    });

    return (
        <>
        <HelmetProvider>
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>MY KOZAN - Home</title>

                <meta name="keywords"
                    content="MY KOZAN, eCommerce, online store, Doodle Board, Wooden Money Box, Selfie Stick, bulk product sales, best deals on Doodle Boards, Wooden Money Box store, Selfie Stick online, eCommerce Tamil Nadu, best online store for bulk products, Doodle Board for kids, creative gifts, Wooden Money Box for saving, high-quality selfie sticks, gift shop, MY KOZAN store, MY KOZAN products, Tamil Nadu eCommerce store, buy bulk Doodle Boards, shop for Wooden Money Box, selfie sticks online"
                />

                <meta name="description"
                    content="MY KOZAN is an e-commerce web application offering a wide range of high-quality products like Doodle Boards, Wooden Money Boxes, and Selfie Sticks. We specialize in selling products in bulk and providing excellent deals to our customers."
                />

                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/assets/Images/Logo/favi.png" />

                <meta property="og:title"
                    content="MY KOZAN - Your Ultimate Store for Doodle Boards, Wooden Money Boxes, and Selfie Sticks"
                />

                <meta property="og:description"
                    content="MY KOZAN is an e-commerce web application offering a wide range of high-quality products like Doodle Boards, Wooden Money Boxes, and Selfie Sticks. We specialize in selling products in bulk and providing excellent deals to our customers."
                />

                <meta property="og:url" content="https://mykozan.com" />
                <meta property="og:site" content="MY KOZAN" />
                <meta property="og:site_name" content="MY KOZAN" />
                <link rel="canonical" href="https://mykozan.com" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@mykozan" />
                <meta name="twitter:title"
                    content="MY KOZAN | Your Store for Bulk Doodle Boards, Wooden Money Boxes, and Selfie Sticks"
                />
                <meta name="twitter:description"
                    content="Discover our exclusive range of products, including Doodle Boards, Wooden Money Boxes, and Selfie Sticks. Shop in bulk and enjoy fantastic deals at MY KOZAN."
                />
                <meta name="twitter:image" content="/assets/Images/Logo/favi.png" />

                {/* Add structured data for each product */}
                {products.map((product, index) => (
                    <script type="application/ld+json" key={index}>
                        {JSON.stringify(generateProductJSONLD(product))}
                    </script>
                ))}
            </Helmet>
        </HelmetProvider>

            <section className="my-10">
                <h1 className="text-center md:text-3xl text-xl border bg-[#00712D] w-fit mx-auto text-white p-2 rounded-lg">
                    Products
                </h1>

                {/* Product Grid */}
                <section className="grid grid-cols-2 gap-2 mx-2 lg:grid-cols-1 lg:mx-0">
                    {products.map((product, index) => (
                        <section key={index} className="mx-auto lg:max-w-[70rem] max-w-[18rem] md:px-5">
                            <div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-0 gap-2 md:py-5 py-3 rounded-lg my-3 bg-[#00712D]">

                                {/* Conditional Layout */}
                                {index % 2 === 0 ? (
                                    <>
                                        {/* Product Info - Left */}
                                        <div className="flex items-center justify-center order-last col-span-4 px-5 lg:col-span-1 lg:order-first">
                                            <div className="flex flex-col space-y-3 min-h-[8rem] h-full justify-around lg:text-left text-center">
                                                <div>
                                                    <p className="text-sm text-white md:text-xl lg:line-clamp-none line-clamp-2">
                                                        {product.Product_Name}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-white lg:text-base text-[11px] mb-2">
                                                        <span className="text-base font-bold md:text-lg">
                                                            ${product.Sale_Price}
                                                        </span> (Min. 50 Pcs)
                                                    </p>
                                                    <button
                                                        onClick={() => handleBuyNow(product)}
                                                        className="bg-[#E38734] px-5 py-2 rounded-lg lg:text-xl text-sm font-semibold hover:scale-105 duration-200"
                                                    >
                                                        Buy Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Image Swiper - Right */}
                                        <div className="flex flex-wrap justify-center w-full col-span-4 lg:col-span-4 lg:px-5">
                                            <Swiper
                                                slidesPerView={3}
                                                loop={product.Images.length >= 3}
                                                navigation
                                                spaceBetween={30}
                                                autoplay={{
                                                    delay: 1000,
                                                    reverseDirection: true,
                                                    disableOnInteraction: false,
                                                }}
                                                breakpoints={{
                                                    0: {
                                                        slidesPerView: 1,
                                                        spaceBetween: 20,
                                                    },
                                                    600: {
                                                        slidesPerView: 1,
                                                        spaceBetween: 30,
                                                    },
                                                    1024: {
                                                        slidesPerView: 3,
                                                        spaceBetween: 30,
                                                    },
                                                }}
                                                modules={[Pagination, Navigation, Autoplay]}
                                                className="px-5"
                                            >
                                                {product.Images.map((image, idx) => (
                                                    <SwiperSlide key={idx}>
                                                        <Link to='/product'>
                                                            <img
                                                                src={`${apiurl()}/${image}`}
                                                                alt={`Product Image ${idx}`}
                                                                className="cursor-pointer"
                                                            />
                                                        </Link>
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Product Image Swiper - Left */}
                                        <div className="flex flex-wrap justify-center w-full col-span-4 lg:col-span-4 lg:px-5">
                                            <Swiper
                                                slidesPerView={3}
                                                loop={product.Images.length >= 3}
                                                navigation
                                                spaceBetween={30}
                                                autoplay={{
                                                    delay: 1000,
                                                    disableOnInteraction: false,
                                                }}
                                                breakpoints={{
                                                    0: {
                                                        slidesPerView: 1,
                                                        spaceBetween: 20,
                                                    },
                                                    600: {
                                                        slidesPerView: 1,
                                                        spaceBetween: 30,
                                                    },
                                                    1024: {
                                                        slidesPerView: 3,
                                                        spaceBetween: 30,
                                                    },
                                                }}
                                                modules={[Pagination, Navigation, Autoplay]}
                                                className="px-5"
                                            >
                                                {product.Images.map((image, idx) => (
                                                    <SwiperSlide key={idx}>
                                                        <Link to='/product'>
                                                            <img
                                                                src={`${apiurl()}/${image}`}
                                                                alt={`Product Image ${idx}`}
                                                                className="cursor-pointer"
                                                            />
                                                        </Link>
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </div>

                                        {/* Product Info - Right */}
                                        <div className="flex items-center justify-center col-span-4 px-5 lg:col-span-1">
                                            <div className="flex flex-col space-y-3 min-h-[8rem] h-full justify-around lg:text-left text-center">
                                                <div>
                                                    <p className="text-sm text-white md:text-xl lg:line-clamp-none line-clamp-2">
                                                        {product.Product_Name}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-white lg:text-base text-[11px] mb-2">
                                                        <span className="text-base font-bold md:text-lg">
                                                            ${product.Sale_Price}
                                                        </span> (Min. 50 Pcs)
                                                    </p>
                                                    <button
                                                        onClick={() => handleBuyNow(product)}
                                                        className="bg-[#E38734] px-5 py-2 rounded-lg lg:text-xl text-sm font-semibold hover:scale-105 duration-200"
                                                    >
                                                        Buy Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </section>
                    ))}
                </section>
            </section>
        </>
    );
};

export default Products;
