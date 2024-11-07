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
    First_Name: '',
    Last_Name: '',
    email: '',
    password: '',
    confirmPassword: '',
    Mobile_Number: '',
    Address: '',
    City: '',
    State: '',
    Country: '',
    Zipcode: '',
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
        First_Name: data.First_Name,
        Last_Name: data.Last_Name,
        Mobile_Number: data.Mobile_Number,
        Address: data.Address,
        Country: data.Country,
        State: data.State,
        City: data.City,
        Zipcode: data.Zipcode,
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
      const response = await apiverifyotp({ Email: data.email, OTP: otp });

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
    <section className="flex items-center justify-center min-h-screen px-6 py-12 bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-xl">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          {otpStage ? 'Verify Your OTP' : 'Sign Up for an Account'}
        </h1>
        <p className="mb-8 text-center text-gray-500">
          {otpStage ? 'Enter the OTP sent to your email to complete the registration.' : 'Create an account by filling in the details below.'}
        </p>

        {!otpStage ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-gray-700">First Name</label>
                <input type="text" name="First_Name" value={data.First_Name} onChange={handleOnChange} required className="w-full px-4 py-2 mt-1 transition duration-300 border-b-2 border-gray-300 outline-none focus:border-[#E38734]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">Last Name</label>
                <input type="text" name="Last_Name" value={data.Last_Name} onChange={handleOnChange} required className="w-full px-4 py-2 mt-1 transition duration-300 border-b-2 border-gray-300 outline-none focus:border-[#E38734]" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-gray-700">Email Address</label>
                <input type="email" name="email" value={data.email} onChange={handleOnChange} required className="w-full px-4 py-2 mt-1 transition duration-300 border-b-2 border-gray-300 outline-none focus:border-[#E38734]" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700">Mobile Number</label>
                <input type="text" name="Mobile_Number" value={data.Mobile_Number} onChange={handleOnChange} required className="w-full px-4 py-2 mt-1 transition duration-300 border-b-2 border-gray-300 outline-none focus:border-[#E38734]" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700">Address</label>
              <textarea name="Address" value={data.Address} onChange={handleOnChange} required className="w-full px-4 py-2 mt-1 transition duration-300 border-b-2 border-gray-300 outline-none focus:border-[#E38734]" ></textarea>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-gray-700">City</label>
                <input type="text" name="City" value={data.City} onChange={handleOnChange} required className="w-full px-4 py-2 mt-1 transition duration-300 border-b-2 border-gray-300 outline-none focus:border-[#E38734]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">State</label>
                <input type="text" name="State" value={data.State} onChange={handleOnChange} required className="w-full px-4 py-2 mt-1 transition duration-300 border-b-2 border-gray-300 outline-none focus:border-[#E38734]" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-gray-700">Country</label>
                <input type="text" name="Country" value={data.Country} onChange={handleOnChange} required className="w-full px-4 py-2 mt-1 transition duration-300 border-b-2 border-gray-300 outline-none focus:border-[#E38734]" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700">Zip Code</label>
                <input type="text" name="Zipcode" value={data.Zipcode} onChange={handleOnChange} required className="w-full px-4 py-2 mt-1 transition duration-300 border-b-2 border-gray-300 outline-none focus:border-[#E38734]" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-gray-700">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} name="password" value={data.password} onChange={handleOnChange} className="w-full px-4 py-2 mt-1 transition duration-300 border-b-2 border-gray-300 outline-none focus:border-[#E38734]" required />
                  <button type="button" className="absolute inset-y-0 text-gray-600 right-3" onClick={() => setShowPassword(!showPassword)} >
                    {showPassword ? <IoMdEyeOff /> : <IoEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700">Confirm Password</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} name="confirmPassword" value={data.confirmPassword} onChange={handleOnChange} required className="w-full px-4 py-2 mt-1 transition duration-300 border-b-2 border-gray-300 outline-none focus:border-[#E38734]" />
                  <button type="button" className="absolute inset-y-0 text-gray-600 right-3" onClick={() => setPass(!showPass)} >
                    {showPass ? <IoMdEyeOff /> : <IoEye />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button type="submit" className="w-full py-3 text-white transition duration-200 bg-blue-500 rounded-md md:w-1/2 hover:bg-blue-600" >
                Register
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700">Enter OTP</label>
              <input type="text" value={otp} onChange={handleOtpChange} required className="w-full px-4 py-2 mt-1 transition duration-300 border-b-2 border-gray-300 outline-none focus:border-[#E38734]" />
            </div>

            <div className="mt-8 text-center">
              <button type="submit" className="w-full py-3 text-white transition duration-200 bg-blue-500 rounded-md md:w-1/2 hover:bg-blue-600" onClick={handleSubmit} >
                Verify OTP & Complete Registration
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-500"> Login </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Sign;
