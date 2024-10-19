import React from 'react'
import { Link } from 'react-router-dom'
import useCartStore from '../../Shared/Services/Store/UseCart';
function Foot() {
    const toggleMenu = () => {
        if (!isOpen) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setOpen(!isOpen);
    };
    const { cart } = useCartStore();
    return (
        <>
            <section className=''>
                <div className='flex justify-around  items-center mt-2  w-full'>
                    <Link to='/' onClick={toggleMenu}>
                        <div className='flex flex-col justify-center items-center '>
                            <img className='h-6' src="/assets/Images/Footer/Home.png" alt="home" />
                            <p className="text-sm mt-1">Home</p>
                        </div>
                    </Link>
                    <Link to="/cart" onClick={toggleMenu}>
                        <div className="flex items-center relative">
                            <img
                                className="cursor-pointer h-7 opacity-85"
                                src="/assets/Images/Header/Shopping Cart (1).png"
                                alt="cart"
                                title="Cart"
                            />
                            {cart.length > 0 && (
                                <div className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full  bg-[#00712D]  text-white text-xs font-semibold">
                                    {cart.length}
                                </div>
                            )}
                        </div>
                        <p className="text-sm mt-1">Cart</p>
                    </Link>
                    <Link to='/login' onClick={toggleMenu}>
                        <div className="flex  flex-col justify-center items-center  ">
                            <img className='h-6' src="/assets/Images/Header/User.png" alt="user" />
                            <p className="text-sm mt-1">Profile</p>
                        </div>
                    </Link>
                </div>
            </section>
        </>
    )
}
export default Foot
