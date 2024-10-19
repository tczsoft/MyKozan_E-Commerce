import React, { useState } from 'react';
function Orders() {
    const [step, setStep] = useState(1); 
    return (
        <>
            <section className=' max-w-[68rem] md:my-48 my-36 px-2 mx-auto flex justify-center items-center'>
                <div className='w-full flex flex-col gap-5'>
                    <div className={`border ${step === 1 ? 'block' : 'hidden'}`}>
                        <div className='flex gap-4 w-full bg-[#00712D] py-4 px-3'>
                            <div className='text-[#00712D] py-2 px-4 text-xl bg-white font-bold rounded-lg'>1</div>
                            <h1 className='text-white lg:text-xl text-lg flex justify-center items-center font-bold'>
                                Login Or Sign Up
                            </h1>
                        </div>
                        <div className='p-5 max-w-[25rem]'>
                            <div className='space-y-4'>
                                <p className="lg:text-xl text-md text-gray-400">Enter Email/ Mobile Number</p>
                                <input type="text" className='border-b-2 w-full border-gray-200 outline-none' />
                                <p className="lg:text-md text-md text-gray-400">
                                    By continuing, you agree to <span className='text-[#00712D]'>My Kozan LLC</span> terms of Use
                                    and <span className='text-[#00712D]'>Privacy Policy</span>
                                </p>
                            </div>
                            <div className='mt-5'>
                                <button onClick={() => setStep(2)} className='p-3 bg-[#E38734] lg:text-xl text-lg  text-white rounded-lg'>
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`border ${step === 2 ? 'block' : 'hidden'}`}>
                        <div className='flex gap-4 w-full bg-[#00712D] py-4 px-3'>
                            <div className='text-[#00712D] py-2 px-4 text-xl bg-white font-bold rounded-lg'>2</div>
                            <h1 className='text-white lg:text-xl text-lg flex justify-center items-center font-bold'>
                                Delivery Address
                            </h1>
                        </div>
                        <div className='p-5 max-w-[25rem]'>
                            <div className='space-y-4'>
                                <p className="lg:text-xl text-md text-gray-400">Enter Delivery Address</p>
                                <input type="text" className='border-b-2 w-full border-gray-200 outline-none' />
                            </div>
                            <div className='mt-5'>
                                <button onClick={() => setStep(3)} className='p-3 bg-[#E38734] lg:text-xl text-lg  text-white rounded-lg'>
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`border ${step === 3 ? 'block' : 'hidden'}`}>
                        <div className='flex gap-4 w-full bg-[#00712D] py-4 px-3'>
                            <div className='text-[#00712D] py-2 px-4 text-xl bg-white font-bold rounded-lg'>3</div>
                            <h1 className='text-white lg:text-xl text-lg flex justify-center items-center '>
                                Order Summary
                            </h1>
                        </div>
                        <div className='p-5 max-w-[25rem]'>
                            <div className='space-y-4'>
                                <p className="lg:text-xl text-md text-gray-400">Review your order</p>
                            </div>
                            <div className='mt-5'>
                                <button onClick={() => setStep(4)} className='p-3 bg-[#E38734] lg:text-xl text-lg  text-white rounded-lg'>
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`border ${step === 4 ? 'block' : 'hidden'}`}>
                        <div className='flex gap-4 w-full bg-[#00712D] py-4 px-3'>
                            <div className='text-[#00712D] py-2 px-4 text-xl bg-white font-bold rounded-lg'>4</div>
                            <h1 className='text-white lg:text-xl text-lg flex justify-center items-center font-bold'>
                                Payment Option
                            </h1>
                        </div>
                        <div className='p-5 max-w-[25rem]'>
                            <div className='space-y-4'>
                                <p className="lg:text-xl text-md text-gray-400">Choose your payment method</p>
                            </div>
                            <div className='mt-5'>
                                <button className='p-3 bg-[#E38734] lg:text-xl text-lg  text-white rounded-lg'>
                                    Submit Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Orders;
