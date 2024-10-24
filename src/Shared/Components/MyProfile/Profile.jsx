import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getallcustomers, updateCustomers } from '../../../admin/shared/services/apicustomers/apicustomers';
import useAuth from '../../services/store/useAuth';


function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({ First_Name: '', Last_Name: '', Email: '', Mobile_Number: '' });
    const [updatedUserData, setUpdatedUserData] = useState({});
    const { userdetails } = useAuth();
    const userEmail = userdetails()?.Email;


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (userEmail) {
                    const params = { email: userEmail };
                    const response = await getallcustomers(params);
                    if (response.resdata.length > 0) {
                        const customer = response.resdata[0];
                        const nameParts = customer.First_Name.split(' ');
                        setProfileData({ First_Name: nameParts[0], Last_Name: customer.Last_Name || '', Email: customer.Email, Mobile_Number: customer.Mobile_Number || '' });
                    } else {
                        toast.error("Profile not found.");
                    }
                } else {
                    toast.error("No user details found.");
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                toast.error("Failed to fetch profile data.");
            }
        };
        fetchProfile();
    }, [userEmail]);




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };
    if (!profileData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }
    const handleUpdateProfile = async () => {
        try {
            const params = {
                Email: profileData.Email,
                First_Name: profileData.First_Name,
                Last_Name: profileData.Last_Name,
                Mobile_Number: profileData.Mobile_Number
            };

            const res = await updateCustomers(params);
            if (res && res.message === 'Customer updated successfully') {
                toast.success('Profile updated successfully!');
            } else {
                toast.error('Failed to update profile');
            }
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Error occurred while updating profile');
        }
    };

    return (
        <>
            <section className='max-w-[70rem] px-5 mx-auto lg:mt-0 md:mt-36 mt-28'>
                <div className='my-10'>
                    <div className='lg:max-w-[50rem]  mx-auto border border-[#00712d] rounded-2xl'>
                        <div className='p-3 space-y-3 text-center'>
                            <div className='w-20 h-20 rounded-full bg-[#e38734] mx-auto flex justify-center items-center'>
                                {profileData.First_Name[0]?.toUpperCase()}{profileData.Last_Name[0]?.toUpperCase()}
                            </div>

                            <p className="text-base md:text-xl">{profileData.First_Name} {profileData.Last_Name}</p>

                            <p className="text-base md:text-xl">{profileData.Email}</p>
                        </div>
                        <div className='p-3 my-10'>
                            <form className='grid grid-cols-1 space-y-4'>
                                <div className='flex flex-wrap gap-3'>
                                    <div className='flex flex-col mx-auto w-fit'>
                                        <label> First Name</label>
                                        <input
                                            className='p-2 border rounded-md'
                                            type="text"
                                            name="First_Name"
                                            value={profileData.First_Name}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className='flex flex-col mx-auto w-fit'>
                                        <label> Last Name</label>
                                        <input
                                            className='p-2 border rounded-md'
                                            type="text"
                                            name="Last_Name"
                                            value={profileData.Last_Name}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-wrap gap-3'>
                                    <div className='flex flex-col mx-auto w-fit'>
                                        <label> Email</label>
                                        <input
                                            className='p-2 border rounded-md'
                                            type="text"
                                            name="Email"
                                            value={profileData.Email}
                                            disabled
                                        />
                                    </div>
                                    <div className='flex flex-col mx-auto w-fit'>
                                        <label> Mobile Number</label>
                                        <input
                                            className='p-2 border rounded-md'
                                            type="text"
                                            name="Mobile_Number"
                                            value={profileData.Mobile_Number}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className='text-center'>
                                    {isEditing ? (
                                        <button
                                            type="button"
                                            onClick={handleUpdateProfile}
                                            className='p-2 rounded-lg text-white bg-[#e38734] hover:bg-[#00712d] w-fit'
                                        >
                                            Save Changes
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                            className='p-2 rounded-lg text-white bg-[#e38734] hover:bg-[#00712d] w-fit'
                                        >
                                            Edit Profile
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Profile;
