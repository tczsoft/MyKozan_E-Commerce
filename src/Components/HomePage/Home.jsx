import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import HeroSection from '../../Shared/Components/Home/HeroSection';
import Products from '../../Shared/Components/Home/Products';
import About from '../../Shared/Components/Home/About';
import Foot from '../../core/Mobile/Foot';
function Home() {
  return (
    <>
      <HeroSection />
      <About/>
      <Products />
      <div className='md:hidden block sticky bottom-0 bg-white p-2 z-50 w-full border rounded-sm'>
        <Foot/>
      </div>
    </>
  )
}
export default Home
