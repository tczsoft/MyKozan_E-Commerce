import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { apilogin } from '../../Services/apiAuth/apiLogin';
import { IoEye } from 'react-icons/io5';
import { IoMdEyeOff } from 'react-icons/io';
import useAuth from '../../Services/Store/useAuth';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apilogin({ Email: data.email, Password: data.password });
      if (response.status === 'Success') {
        login(response.token);
        toast.success('Login successful!');
        const role = response.role;
        if (role === 'admin') {
          navigate("/admin");
        } 
        else if (role === 'customer'){
          navigate("/");
        }
       
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <section className="flex items-center justify-center px-2 my-20 md:mt-0 mt-36">
      <div className="lg:max-w-[30rem] mx-auto border bg-white shadow-md rounded-lg">
        <div className="flex justify-center items-center gap-2 bg-[#00712D]">
          <h1 className="py-4 text-lg font-bold text-center text-white lg:text-xl">Login</h1>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <p className="font-bold text-gray-600 lg:text-lg text-md">Enter Email / Mobile Number</p>
              <input
                type="text"
                required
                name="email"
                value={data.email}
                onChange={handleOnChange}
                className="w-full border-b-2 border-gray-300 mt-2 outline-none focus:border-[#E38734] transition duration-300"
              />
            </div>
            <div>
              <p className="font-bold text-gray-600 lg:text-lg text-md">Password</p>
              <div className="flex">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full border-b-2 border-gray-300 outline-none focus:border-[#E38734] transition duration-300"
                />
                <div className="pl-2 cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                  <span className="text-xl text-gray-500">{showPassword ? <IoMdEyeOff /> : <IoEye />}</span>
                </div>
              </div>
              <Link to="/forgot" className="block mt-3 text-sm text-right text-gray-500 hover:underline hover:text-red-600">
                Forgot Password?
              </Link>
            </div>
            <p className="text-gray-500 lg:text-base text-md">
              By continuing, you agree to{" "}
              <span className="text-[#00712D]">My Kozan LLC</span> terms of Use and
              <Link to="/privacy">
                <span className="text-[#00712D] hover:underline"> Privacy Policy</span>
              </Link>
            </p>
            <div className="mt-10 text-center">
              <button
                type="submit"
                className="p-3 w-full bg-[#E38734] hover:scale-105 duration-200 lg:text-xl text-lg text-white rounded-lg"
              >
                Sign In
              </button>
            </div>
            <div className="flex items-center justify-center mt-5">
              <p className="text-sm text-center md:text-base">New to My Kozan LLC?</p>
              <Link to="/signin">
                <span className="font-semibold cursor-pointer">
                  <div className="flex items-center justify-center">
                    <img className="md:w-12 md:h-12 w-9 h-9 -hue-rotate-60" src="/assets/Images/sign/nnn.gif" alt="" />
                    <p className="text-sm md:text-base"> Create an Account</p>
                  </div>
                </span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
