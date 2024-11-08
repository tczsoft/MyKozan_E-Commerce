// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function HeroSection() {

    const [isOpen, setOpen] = useState(false);

    const toggleMenu = () => {
        if (!isOpen) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setOpen(!isOpen);
    };

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
            </Helmet>
        </HelmetProvider>

            <section className="mx-auto md:max-w-[70rem] w-full md:px-5 lg:py-10 py-8 mt-20 md:mt-24 lg:mt-32">
                <div className="grid lg:grid-cols-2 grid-cols-1 py-5 text-white lg:gap-0 gap-2  md:px-0 px-5  md:rounded-xl bg-[#E38734] md:mt-0 ">
                    <div className="flex items-center justify-center">
                        <div className=''>
                            <div className="text-3xl sm:text-4xl md:text-5xl">
                                Boost Your <br className='hidden lg:block' /> Store&apos;s Success
                            </div>
                            <div className="font-semibold md:text-3xl ">
                                with our handpicked, <br />
                            </div>
                            <div className="font-bold md:text-3xl">High Profit Products !</div>
                            <div className='hidden mt-4 text-center md:block lg:text-start lg:mt-0'>
                                <Link to='/product' onClick={toggleMenu}>
                                    <button className='p-2 text-sm font-semibold text-white duration-200 bg-black rounded-lg cursor-pointer lg:px-4 lg:py-3 lg:text-base lg:mt-10 hover:scale-105'>
                                        Shop Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className='grid grid-cols-3 gap-3 lg:gap-0'>
                            <div className='flex justify-center '>
                                <div className='space-y-10'>
                                    <img className='transition-all duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]' src="/assets/Images/HeroSection/image1.png" alt="" />
                                    <img className='transition-all duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]' src="/assets/Images/HeroSection/image4.png" alt="" />
                                </div>
                            </div>
                            <div className='flex justify-center '>
                                <img className='transition-all duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]' src="/assets/Images/HeroSection/image2.png" alt="" />
                            </div>
                            <div className='flex justify-center'>
                                <div className='space-y-10 '>
                                    <img className='transition-all duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]' src="/assets/Images/HeroSection/image3.png" alt="" />
                                    <img className='transition-all duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]' src="/assets/Images/HeroSection/image5.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='block mt-4 text-center lg:mt-0 md:hidden'>
                        <Link to='/product' onClick={toggleMenu}>
                            <button className='bg-[#00712D] text-white font-semibold lg:px-4 lg:py-3 p-2 lg:text-base text-sm rounded-lg lg:mt-10 hover:scale-105 duration-200'>
                                Shop Now
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HeroSection;
