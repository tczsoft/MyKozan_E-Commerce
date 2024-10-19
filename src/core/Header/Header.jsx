import React, { useState, useEffect, } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Hamburger from 'hamburger-react';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import useAuth from '../../Shared/Services/Store/useAuth';
import useCartStore from "../../Shared/Services/Store/UseCart";
import ProductLists from '../../Shared/Components/Products/ProductLists'

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [iOpen, setIsOpen] = useState(false);


  const toggleSearch = () => {
    setIsOpen(!iOpen);
  }



  const [isSearchActive, setSearchActive] = useState(false);
  const { cart } = useCartStore();
  const { isLoggedIn, logout, getUserDetails } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setOpen(!isOpen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleSearchFocus = () => setSearchActive(true);
  const handleSearchBlur = () => setSearchActive(false);

  const isActive = (path) => location.pathname === path;
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white border-b-2 shadow-sm md:py-3 " >
        <div className="max-w-[70rem] px-5 mx-auto flex justify-between items-center z-50">
          <Link to='/'>
            <img className="w-[150px] hidden md:block" src="/assets/Images/Header/My_Kozan1.png" alt="logo" />
          </Link>

          <div className="relative hidden md:block w-[30vw] cursor-pointer">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full rounded-md px-2 py-1 border focus:outline-[#E38734]`}
              />
            </form>
          </div>

          <div className="hidden gap-5 md:flex">
            <Link to="/product">
              <img className="cursor-pointer h-7 opacity-85" src="/assets/Images/Header/Shop.png" alt="shop" title="shop" />
            </Link>
            <Link to="/cart">
              <div className="flex">

                <div className="relative">
                  <img
                    className="cursor-pointer h-7 opacity-85"
                    src="/assets/Images/Header/Shopping Cart (1).png"
                    alt="cart"
                    title="Cart"
                  />


                  <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-green-600 rounded-full -top-2 -right-2">
                    {cart.length}
                  </div>
                </div>
              </div>
            </Link>
            <Link to={isLoggedIn ? '/' : '/login'} onClick={isLoggedIn ? logout : null}>
              <div className="relative">
                {isLoggedIn ? (
                  <RiLogoutCircleRLine className="text-2xl text-[#E38734]" title="Logout" />
                ) : (
                  <> <img className="cursor-pointer h-7 opacity-85" src="/assets/Images/Header/Login.png" alt="login" />
                    <div className="absolute top-14 ">
                      <ProductLists />
                    </div></>)}
              </div>
            </Link>
          </div>
          <div className='hidden md:block'>


            <Hamburger toggled={isOpen} toggle={toggleMenu} />
          </div>
        </div>


        <div className='flex items-center justify-between block px-3 md:hidden'>
          <div>

            <Hamburger toggled={isOpen} toggle={toggleMenu} />
          </div>
          <Link to='/'>
            <img className="w-[150px] " src="/assets/Images/Header/My_Kozan1.png" alt="logo" />
          </Link>

          <div className="relative flex items-center">

            <div className="cursor-pointer">
              <img
                src="/assets/Images/Header/Search (1).png"
                alt="search"
                className="w-7 h-7"
              />
            </div>



          </div>

        </div>





        <div
          className={`fixed top-0 right-0 h-full bg-white shadow-lg w-[260px] transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} z-50`}
        >
          <div className="p-4">
            <div className="flex justify-between " >
              <div className='hidden 2xl:hidden xl:block lg:block md:block '>
                <Hamburger toggled={isOpen} toggle={toggleMenu} />
              </div>
              <h2 className="text-2xl font-bold text-[#E38734] ml-auto">Menu</h2>
            </div>
            <nav className="mt-10 space-y-4 text-base text-right md:text-lg ">
              <Link to="/" className={`block ${isActive('/') ? 'text-[#e38734]' : 'hover:text-[#E38734] cursor-pointer'}`} onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/product" className={`block ${isActive('/product') ? 'text-[#E38734]' : 'hover:text-[#E38734] cursor-pointer'}`} onClick={toggleMenu}>
                Products
              </Link>
              <Link to="/cart" className={`block ${isActive('/cart') ? 'text-[#E38734]' : 'hover:text-[#E38734] cursor-pointer'}`} onClick={toggleMenu}>
                Cart
              </Link>
              {isLoggedIn && ( 
                
                  <Link
                    to='/yourorder'
                    className={`block ${isActive('/yourorder') ? 'text-[#E38734]' : 'hover:text-[#E38734] cursor-pointer'}`}
                    onClick={toggleMenu}
                  >
                    Your Orders
                  </Link>
               
              )}
              <Link to={isLoggedIn ? '/' : '/login'} onClick={isLoggedIn ? logout : toggleMenu} className={`block ${isActive('/login') ? ' text-[#E38734]' : 'hover:text-[#E38734] cursor-pointer'} 
            `}>
                {isLoggedIn ? 'Logout' : 'Login'}

              </Link>
            </nav>
          </div>
        </div>
        {isOpen && <div className="fixed inset-0 z-40 bg-black opacity-50" onClick={toggleMenu}></div>}

        {isSearchActive && (
          <div className="fixed inset-0 z-40 bg-black opacity-50" onClick={handleSearchBlur}></div>
        )}
      </header>
    </>
  );
}




