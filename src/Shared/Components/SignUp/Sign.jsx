import React, { useState } from 'react';
import { IoEye } from 'react-icons/io5';
import { IoMdEyeOff } from 'react-icons/io';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { apisendotp, apiverifyotp } from '../../Services/apiAuth/apiRegister';

function Sign() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPass, setPass] = useState(false);
  const [otpStage, setOtpStage] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    country: '',
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const response = await apisendotp({
        Email: data.email,
        Password: data.password,
        First_Name: data.name,
        Address: data.address,
        Country: data.country,
        State: data.state,
        City: data.city,
        Zipcode: data.zipcode,


      });

      if (response.status === 'OTP Sent') {
        setOtpStage(true);
        toast.success('OTP sent successfully! Check your email.');
      } else {
        toast.error('Failed to send OTP. Please check your email.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Error sending OTP. Please try again.');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await apiverifyotp({
        Email: data.email,
        OTP: otp,
      });

      if (response.status === 'Sucessfully registered') {
        toast.success('Registration successful! Now you can Login.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpStage) {
      handleRegister();
    } else {
      handleSendOtp();
    }
  };

  return (
    <section className='md:mt-0 mt-36 my-20 px-2 flex justify-center items-center'>
      <div className='lg:max-w-[30rem] mx-auto  border'>
        <div className='flex justify-center items-center gap-2 bg-[#00712D]'>
          <h1 className='text-white lg:text-xl text-lg text-center py-4 font-bold'>SignUp</h1>
        </div>
        <div className='p-6'>
          {!otpStage ? (
            <div className='space-y-6'>
              <div>
                <p className='lg:text-lg text-md text-gray-400'>Name</p>
                <input
                  type='text'
                  required
                  className='border-b-2 focus:border-b-orange-300 w-full border-gray-200 outline-none'
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <p className='lg:text-lg text-md text-gray-400'>Email</p>
                <input
                  type='email'
                  required
                  className='border-b-2 w-full border-gray-200 outline-none'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <p className='lg:text-lg text-md text-gray-400'>Country</p>
                <input
                  type='text'
                  required
                  className='border-b-2 w-full border-gray-200 outline-none'
                  name='country'
                  value={data.country}

                  onChange={handleOnChange}
                />
              </div>
              <div>
                <p className='lg:text-lg text-md text-gray-400'>State</p>
                <input
                  type='text'
                  required
                  className='border-b-2 w-full border-gray-200 outline-none'
                  name='state'
                  value={data.state}

                  onChange={handleOnChange}
                />
              </div>
              <div>
                <p className='lg:text-lg text-md text-gray-400'>Address</p>
                <textarea
                  type='text'
                  required
                  className='border-b-2 w-full border-gray-200 outline-none'
                  name='address'
                  value={data.address}
                  rows={6}
                  onChange={handleOnChange}
                />
              </div>


              <div>
                <p className='lg:text-lg text-md text-gray-400'>city</p>
                <input
                  type='text'
                  required
                  className='border-b-2 w-full border-gray-200 outline-none'
                  name='city'
                  value={data.city}

                  onChange={handleOnChange}
                />
              </div>
              <div>
                <p className='lg:text-lg text-md text-gray-400'>ZipCode</p>
                <input
                  type='text'
                  required
                  className='border-b-2 w-full border-gray-200 outline-none'
                  name='zipcode'
                  value={data.zipcode}

                  onChange={handleOnChange}
                />
              </div>


              <div>
                <p className='lg:text-lg text-md text-gray-400'>Password</p>
                <div className='flex'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className='border-b-2 w-full border-gray-200 outline-none'
                    name='password'
                    value={data.password}
                    onChange={handleOnChange}
                  />
                  <div className='cursor-pointer' onClick={() => setShowPassword((preve) => !preve)}>
                    <span className='text-xl'>{showPassword ? <IoMdEyeOff /> : <IoEye />} </span>
                  </div>
                </div>
              </div>
              <div>
                <p className='lg:text-lg text-md text-gray-400'>Confirm Password</p>
                <div className='flex'>
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    className='border-b-2 w-full border-gray-200 outline-none'
                    name='confirmPassword'
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                  />
                  <div className='cursor-pointer' onClick={() => setPass((preve) => !preve)}>
                    <span className='text-xl'>{showPass ? <IoMdEyeOff /> : <IoEye />} </span>
                  </div>
                </div>
              </div>
              <p className='lg:text-base text-md text-gray-400'>
                By continuing, you agree to <span className='text-[#00712D]'>My Kozan LLC</span> terms of Use and
                <span className='text-[#00712D]'> Privacy Policy</span>
              </p>
              <div className='text-center mt-10'>
                <button
                  type='submit'
                  className='p-3 w-full bg-[#E38734] hover:scale-105 duration-200 lg:text-xl text-lg text-white rounded-lg'
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <div className='space-y-6'>
              <div>
                <p className='lg:text-lg text-md text-gray-400'>Enter OTP</p>
                <input
                  type='text'
                  required
                  className='border-b-2 w-full border-gray-200 outline-none'
                  value={otp}
                  onChange={handleOtpChange}
                />
              </div>
              <div className='text-center mt-10'>
                <button
                  type='submit'
                  className='p-3 w-full bg-[#E38734] hover:scale-105 duration-200 lg:text-xl text-lg text-white rounded-lg'
                  onClick={handleSubmit}
                >
                  Verify & Register
                </button>
              </div>
            </div>
          )}
          <div className='flex flex-wrap justify-center items-center mt-5'>
            <p className='text-center md:text-base text-sm'>Already Have an Account ?</p>
            <Link to='/login'>
              <span className='font-semibold cursor-pointer'>
                <div className='flex justify-center items-center'>
                  <img className='md:w-12 md:h-12 w-9 h-9 -hue-rotate-60' src='/assets/Images/sign/nnn.gif' alt='' />
                  <p className='md:text-base text-sm'> Login</p>
                </div>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sign;
