import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { apisendotpforgotpassword, apiupdatepassword, apiverifyotpforgotpassword } from '../../Shared/Services/apiAuth/apiRegister';

function Forgot() {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
    otp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSendMail = async () => {
    try {
      const response = await apisendotpforgotpassword({ Email: data.email });
      if (response.status === 'OTP Sent') {
        toast.success('OTP sent to your email!');
        setShowOtpInput(true);
      } else {
        toast.error('Email does not exist or is an inactive account');
      }
    } catch (err) {
      toast.error('Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await apiverifyotpforgotpassword({ Email: data.email, OTP: data.otp });
      if (response.status === 'Sucessfully otp verified') {
        toast.success('OTP verified! Please set your new password.');
        setShowNewPasswordInput(true);
      } else {
        toast.error('Invalid OTP');
      }
    } catch (err) {
      toast.error('Error verifying OTP');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await apiupdatepassword({ Email: data.email, Password: data.password });
      if (response.status === 'Sucessfully Password changed') {
        toast.success('Password successfully changed!');
        navigate('/login');
      } else {
        toast.error('Invalid Email');
      }
    } catch (err) {
      toast.error('Error updating password');
    }
  };

  return (
    <section className='max-w-[70rem] px-5 h-[100vh] mx-auto'>
      <div className='flex justify-center items-center'>
        <img className='lg:block hidden' src="/assets/Images/Forgot/forr.png" alt="forgotpassword" />
        <div className='w-full h-fit mx-auto border rounded-lg md:my-0 my-5'>
          <div className='flex justify-center items-center gap-2'>
            <h1 className='lg:text-xl text-lg text-center py-4 font-bold'>Forgot Password</h1>
          </div>
          <div className='p-2 space-y-7'>
          
            {!showOtpInput && !showNewPasswordInput && (
              <>
                <input
                  placeholder='Your Email'
                  required
                  type='text'
                  className='p-3 w-full border focus:outline-[#E38734]'
                  value={data.email}
                  name='email'
                  onChange={handleChange}
                />
                <button
                  className='w-full bg-[#00712D] rounded-2xl p-3 hover:bg-green-700 text-white text-xl'
                  type='submit'
                  onClick={handleSendMail}
                >
                  Send OTP
                </button>
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
              </>
            )}

        
            {showOtpInput && !showNewPasswordInput && (
              <>
                <input
                  placeholder='Enter OTP'
                  required
                  type='text'
                  className='p-3 w-full border focus:outline-[#E38734]'
                  value={data.otp}
                  name='otp'
                  onChange={handleChange}
                />
                <button
                  className='w-full bg-[#00712D] rounded-2xl p-3 hover:bg-green-700 text-white text-xl'
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </button>
              </>
            )}

         
            {showNewPasswordInput && (
              <>
                <input
                  placeholder='New Password'
                  required
                  type='password'
                  className='p-3 w-full border focus:outline-[#E38734]'
                  value={data.password}
                  name='password'
                  onChange={handleChange}
                />
                <button
                  className='w-full bg-[#00712D] rounded-2xl p-3 hover:bg-green-700 text-white text-xl'
                  onClick={handleResetPassword}
                >
                  Reset Password
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Forgot;
