import React from 'react'
import Swiper2 from '../Swiper/Swiper2'
import Swiper1 from '../Swiper/Swiper1'
import Swiper3 from '../Swiper/Swiper3'
import { Link } from 'react-router-dom'
function Products() {
    return (
        <>
            <section className='my-10'>
                <h1 className='text-center md:text-3xl text-xl border bg-[#00712D] w-fit mx-auto text-white p-2 rounded-lg ' >Products</h1>
                <section className='grid lg:grid-cols-1 grid-cols-2 gap-2 lg:mx-0 mx-2 '>
                    <section className='mx-auto lg:max-w-[70rem] max-w-[18rem] md:px-5'>
                        <div className='bg-[#00712D] grid lg:grid-cols-5 grid-cols-1 lg:gap-0 gap-2 md:py-5 py-3 rounded-lg my-3 '>
                            <div className='px-5 lg:col-span-1 col-span-4 lg:order-first order-last flex justify-center items-center'>
                                <div className='flex flex-col space-y-3 min-h-[8rem] h-full justify-between lg:text-left text-center'>
                                    <div>
                                        <p className="text-white md:text-xl text-sm lg:line-clamp-none line-clamp-2">
                                            Reusable Wooden Money Box with Counter...
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-white lg:text-base text-[11px] mb-2">
                                            <span className='md:text-lg text-base font-bold'>$5.99</span> (Min. 50 Pcs)
                                        </p>

                                        <Link to='/checkout' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                            <button className='bg-[#E38734] px-5 py-2 rounded-lg lg:text-xl text-sm font-semibold hover:scale-105 duration-200'>
                                                Buy Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center w-full flex-wrap lg:px-5  col-span-4 '>
                                <Swiper1 />
                            </div>
                        </div>
                    </section>

                    <section className='mx-auto lg:max-w-[70rem] max-w-[18rem] md:px-5'>
                        <div className='bg-[#FFF3C1] grid lg:grid-cols-5   grid-cols-1   lg:gap-0 gap-2  md:py-5 py-3 rounded-lg my-3 '>
                            <div className='flex justify-center w-full flex-wrap  col-span-4 lg:px-10    gap-5 '>
                                <Swiper2 />
                            </div>
                            <div className=' px-5  lg:col-span-1 col-span-4 flex justify-center items-center'>
                                <div className='text-[#00712D] flex flex-col space-y-3 min-h-[8rem] h-full justify-between  lg:text-left text-center'>
                                    <div>


                                        <p className="md:text-xl text-sm lg:line-clamp-none line-clamp-2">E-Writing Doodle
                                            Board for
                                            Kids...</p>

                                    </div>
                                    <div>


                                        <p className=" lg:text-base text-[11px] mb-2"> <span className='md:text-lg text-base  font-bold ' >$8.99 </span>
                                            (Min. 50 Pcs)</p>
                                        <Link to='/checkout'>
                                            <button className='bg-[#E38734] px-5 py-2 rounded-lg lg:text-xl  text-sm  font-semibold text-black  hover:scale-105 duration-200 '>Buy Now</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='mx-auto lg:max-w-[70rem] max-w-[18rem] md:px-5'>
                        <div className='bg-[#00712D]  grid lg:grid-cols-5   grid-cols-1  lg:gap-0 gap-2  rounded-lg md:py-5 py-3 my-3 '>
                            <div className=' px-3  col-span-4  lg:col-span-1  lg:order-first order-last flex justify-center items-center'>
                                <div className='flex flex-col space-y-3 min-h-[8rem] h-full justify-between lg:text-left text-center'>
                                    <p className="text-white md:text-xl text-sm lg:line-clamp-none line-clamp-2">Selfie Stick

                                    </p>


                                    <div>
                                        <p className="text-white  lg:text-base text-[11px] mb-2"> <span className='md:text-lg text-base font-bold' >$5.99 </span>
                                            (Min. 50 Pcs)</p>

                                        <Link to='/checkout' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                            <button className='bg-[#E38734] md:px-5 px-5 py-2 rounded-lg lg:text-xl  font-semibold text-sm hover:scale-105 duration-200'>Buy Now</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center items-center md:w-full flex-wrap  col-span-4 lg:px-1    md:py-0   gap-5 '>
                                <Swiper3 />
                            </div>
                        </div>
                    </section>
                </section>
            </section>
        </>
    )
}
export default Products
