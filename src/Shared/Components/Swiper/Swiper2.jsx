import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
function Swiper2() {
    const toggleMenu = () => {
        if (!isOpen) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setOpen(!isOpen);
    };
    return (
        <>
            <Swiper
                slidesPerView={3}
                loop={true}
                spaceBetween={30}
                navigation
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        centeredSlides: true,
                        spaceBetween: 30,
                    },
                    600: {
                        slidesPerView: 1,
                        centeredSlides: true,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                     
                        spaceBetween: 30,
                    },
                }}
                autoplay={{
                    delay: 1000,
                    reverseDirection: true,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Navigation, Autoplay]}
                  className='px-5 '
            >
                <SwiperSlide>
                    <Link to='/product' onClick={toggleMenu}>
                        <img className='cursor-pointer' src="/assets/Images/Products/product4.png" alt="product1" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/product' onClick={toggleMenu}>
                        <img className='cursor-pointer' src="/assets/Images/Products/product5.png" alt="product1" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/product' onClick={toggleMenu}>
                        <img className='cursor-pointer' src="/assets/Images/Products/product6.png" alt="product1" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/product' onClick={toggleMenu}>
                        <img className='cursor-pointer' src="/assets/Images/Products/product4.png" alt="product1" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/product' onClick={toggleMenu}>
                        <img className='cursor-pointer' src="/assets/Images/Products/product5.png" alt="product1" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/product' onClick={toggleMenu}>
                        <img className='cursor-pointer' src="/assets/Images/Products/product6.png" alt="product1" />
                    </Link>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
export default Swiper2
