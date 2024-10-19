import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
function Swiper3() {
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
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
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
                modules={[Pagination, Navigation, Autoplay]}
                className='px-5 '
            >
                <SwiperSlide>
                    <Link to='/product' onClick={toggleMenu}>
                        <img className='cursor-pointer' src="/assets/Images/Products/product7.png" alt="product1" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/product' onClick={toggleMenu}>
                        <img className='cursor-pointer' src="/assets/Images/Products/product8.png" alt="product1" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/product' onClick={toggleMenu}>
                        <img className='cursor-pointer' src="/assets/Images/Products/product9.png" alt="product1" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/product' onClick={toggleMenu}>
                        <img className='cursor-pointer' src="/assets/Images/Products/product7.png" alt="product1" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/product' onClick={toggleMenu}>
                        <img className='cursor-pointer' src="/assets/Images/Products/product8.png" alt="product1" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/product' onClick={toggleMenu}>
                        <img className='cursor-pointer' src="/assets/Images/Products/product9.png" alt="product1" />
                    </Link>
                </SwiperSlide>
            </Swiper></>
    )
}
export default Swiper3
