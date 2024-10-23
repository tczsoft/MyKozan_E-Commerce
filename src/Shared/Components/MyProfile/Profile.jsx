import React, { useState } from 'react';

function Profile() {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveClick = () => {

        setIsEditing(false);
    };

    return (
        <>
            <section className='max-w-[70rem] px-5 mx-auto lg:mt-0 md:mt-36 mt-28'>
                <div className='my-10 '>
                    <div className='max-w-[50rem] mx-auto border border-[#00712d] rounded-2xl'>
                        <div className='text-center space-y-3 p-3 '>
                            <div className='w-20 h-20 rounded-full bg-[#e38734] mx-auto flex justify-center items-center'>
                                YP
                            </div>

                            <p className="md:text-xl text-base">Yuvaraj</p>

                            <p className="md:text-xl text-base">p.yuvaraj0203@gmail.com</p>
                        </div>
                        <div className='p-3 my-10'>
                            <form className='space-y-4 grid grid-cols-1'>
                                <div className='flex flex-wrap gap-3'>
                                    <div className='flex flex-col w-fit mx-auto'>
                                        <label> First Name</label>
                                        <input
                                            className='p-2 rounded-md border'
                                            type="text"
                                            disabled={!isEditing}
                                            defaultValue="Yuvaraj"
                                        />
                                    </div>
                                    <div className='flex flex-col w-fit mx-auto'>
                                        <label> Last Name</label>
                                        <input
                                            className='p-2 rounded-md border'
                                            type="text"
                                            disabled={!isEditing}
                                            defaultValue="P"
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-wrap gap-3'>
                                    <div className='flex flex-col w-fit mx-auto'>
                                        <label> Email</label>
                                        <input
                                            className='p-2 rounded-md border'
                                            type="text"
                                            disabled={!isEditing}
                                            defaultValue="p.yuvaraj0203@gmail.com"
                                        />
                                    </div>
                                    <div className='flex flex-col w-fit mx-auto'>
                                        <label> Mobile Number</label>
                                        <input
                                            className='p-2 rounded-md border'
                                            type="text"
                                            disabled={!isEditing}
                                            defaultValue="1234567890"
                                        />
                                    </div>
                                </div>
                                <div className='text-center'>

                                    {isEditing ? (
                                        <button
                                            type="button"
                                            onClick={handleSaveClick}
                                            className='p-2 rounded-lg text-white bg-[#e38734] hover:bg-[#00712d] w-fit'
                                        >
                                            Save Changes
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleEditClick}
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
