import React from 'react'
function Wishlist() {
    return (
        <>
            <section className='mx-auto max-w-[68rem] py-10 px-5 rounded-md  my-10 '>
                <div className='grid grid-cols-6 gap-5'>
                    <div className='col-span-2'>
                        <div className='border grid grid-cols-4 gap-2 items-center px-2'>
                            <img className='col-span-1' src="/Images/Male User.png" alt="user" />
                            <p className="col-span-3 text-xl  text-gray-400 ">Your Name</p>
                        </div>
                        <div className='border mt-3 '>
                            <div className=' border-b-2 grid grid-cols-4 gap-2 items-center px-2 p-3  '>
                                <img className='w-10 col-span-1 ' src="/Images/Favorite Folder.png" alt="user" />
                                <p className=" col-span-3 text-xl  text-gray-400">My Orders</p>
                            </div>
                            <div className='grid grid-cols-4 border-b-2 grid-rows-3 gap-2 items-center px-2 p-3  '>
                                <img className='w-10 col-span-1 ' src="/Images/Users Settings.png" alt="user" />
                                <p className=" col-span-3 text-xl text-gray-400">Account Settings </p>
                                <p className=""></p>
                                <p className=" col-span-3">Profile information</p>
                                <p className=""></p>
                                <p className=" col-span-3">Manage Addresses</p>
                            </div>
                            <div className='grid grid-cols-4 grid-rows-3 border-b-2 gap-2 items-center px-2 p-3  '>
                                <img className='w-10 col-span-1 ' src="/Images/Card Payment.png" alt="user" />
                                <p className=" col-span-3 text-xl text-gray-400">Payments</p>
                                <p className=""></p>
                                <p className=" col-span-3">Gift Cards </p>
                                <p className=""></p>
                                <p className=" col-span-3">Saved Cards </p>
                            </div>
                            <div className='grid grid-cols-4 grid-rows-5 gap-2 items-center px-2 p-3  border-b-2 '>
                                <img className='w-10 col-span-1 ' src="/Images/My Orange.png" alt="user" />
                                <p className=" col-span-3 text-xl text-gray-400">My Resources</p>
                                <p className=""></p>
                                <p className=" col-span-3">All Notifications</p>
                                <p className=""></p>
                                <p className=" col-span-3">My Coupons</p>
                                <p className=""></p>
                                <p className=" col-span-3">My Reviews & Ratings</p>
                                <p className=""></p>
                                <p className=" col-span-3">My Wishlist</p>
                            </div>
                            <div className=' border-b-2 grid grid-cols-4 gap-2 items-center px-2 p-3  '>
                                <img className='w-10 col-span-1 ' src="/Images/Move Up.png" alt="user" />
                                <p className=" col-span-3 text-xl  text-gray-400">Log Out</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-4 border  '>
                        <p className="p-5 border-b-2 w-full text-xl" >My Wishlist(2)</p>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Wishlist
