import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ProductLists = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); 
    return () => clearTimeout(timer); 
  }, []);
  return (
    visible && (
      <div className="bg-[#E38734] px-2 py-2 rounded-md inline-block w-[200px]  text-center animate-shake animate-infinite animate-duration-[2000ms] ">
          <img className="relative w-5  bottom-5 left-3 opacity-30" src="/assets/Images/Header/orange.png" alt="" />
        <button className="bg-black text-white w-full  border font-semibold border-[#a88734] rounded-md">
          Sign in
        </button>
        <p className="text-black text-sm mt-2">
          New customer? <Link to='/signin' className="text-white ">Start here.</Link>
        </p>
      </div>
    )
  );
};
export default ProductLists;
