import React from 'react';
import { Link, NavLink } from 'react-router-dom';
function Footer() {
  return (
    <>
      <footer className="bg-[rgb(227,135,52)] lg:py-20 py-10">
        <div className='mx-auto max-w-[70rem]'>
          <div className='grid md:grid-cols-3 gap-5 px-10'>
            <div className='mx-auto'>
              <Link to='/'>
                <img className='w-[250px] h-[100px]' src="/assets/Images/Footer/My_Kozan.png" alt="logo" />
              </Link>
              <div className='flex gap-5 mt-5'>
                <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
                  <div className='bg-black rounded-sm p-1'>
                    <img className='hover:scale-105 duration-200' src="/assets/Images/Footer/Facebook F (1).png" alt="facebook" />
                  </div>
                </a>
                <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
                  <div className='bg-black rounded-sm p-1'>
                    <img className='hover:scale-105 duration-200' src="/assets/Images/Footer/Instagram (1).png" alt="instagram" />
                  </div>
                </a>
                <a href='https://twitter.com/' target='_blank' rel='noopener noreferrer'>
                  <div className='bg-black rounded-sm p-1'>
                    <img className='hover:scale-105 duration-200' src="/assets/Images/Footer/TwitterX (1).png" alt="twitter" />
                  </div>
                </a>
                <a href='https://in.linkedin.com/' target='_blank' rel='noopener noreferrer'>
                  <div className='bg-black rounded-sm p-1'>
                    <img className='hover:scale-105 duration-200' src="/assets/Images/Footer/LinkedIn.png" alt="linkedin" />
                  </div>
                </a>
              </div>
            </div>
            <div className='text-center text-white md:mt-0 mt-5'>
              <h1 className='text-2xl font-semibold'>Quick Links:</h1>
              <div className='text-lg space-y-2 mt-3'>
                <div>

                  <NavLink to='/' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={({ isActive }) => isActive ? '' : 'hover:underline'}>
                    <p className='hover:underline'>Home</p>
                  </NavLink>
                </div>
                <div>

                  <NavLink to='/product' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={({ isActive }) => isActive ? '' : 'hover:underline'}>
                    <p>Products</p>
                  </NavLink>
                </div>

                <div>
                  <NavLink to='/cart' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={({ isActive }) => isActive ? '' : 'hover:underline'}>
                    <p>Cart</p>
                  </NavLink>
                </div>
                <div>
                  <NavLink to='/login' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={({ isActive }) => isActive ? '' : 'hover:underline'}>
                    <p className='hover:underline'>Login</p>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className='md:text-right text-center text-white md:mt-0 mt-5'>
              <h1 className='text-2xl font-semibold'>Policies:</h1>
              <div className='text-lg space-y-2 mt-3'>
                <NavLink to='/privacy' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={({ isActive }) => isActive ? '' : 'hover:underline'}>
                  <p>Privacy Policy</p>
                </NavLink>
                <p className='hover:underline cursor-pointer'>Shipping Policy</p>
                <p className='hover:underline cursor-pointer'>Refund Policy</p>
                <p className='hover:underline cursor-pointer'>Terms & Conditions</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className='bg-[#FFF69F] text-center py-5 font-semibold  gap-1  flex flex-wrap justify-center md:px-0 px-5'>
        <div className='flex gap-1'>
          © 2024 by MyKozan LLC <span className='md:block hidden'> | </span>
        </div>
        <div>
          Developed by <span className='text-[#C50707] hover:underline' ><a href='http://arrowthought.com/' target='_blank' rel='noopener noreferrer'>Arrow Thought</a></span>
        </div>
      </div>
    </>
  );
}
export default Footer;
