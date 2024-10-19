import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderDetails = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
        paymentMethod: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePaymentChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            paymentMethod: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    product,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to place order');
            }


            alert('Order placed successfully!');
            navigate('/orders');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('There was an error placing your order. Please try again.');
        }
    };

    return (
        <div className="max-w-[70rem] mx-auto p-6 bg-white rounded-lg shadow-md grid grid-cols-1 mb-10">
            <div className="grid lg:grid-cols-3 grid-cols-1">
                <div>
                    <h1 className="text-2xl font-bold mb-4">Order Details</h1>
                    {product && (
                        <div className="mb-6">
                            <h2 className="text-xl font-bold">{product.Product_Name}</h2>
                            <img src={product.Images[0]} alt={product.Product_Name} className="max-w-full rounded-md" />
                            <p className="mt-2 text-lg font-semibold text-[#E38734]">{product.Sale_Price}</p>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
                    <div>
                        <label className="block mb-1 font-semibold">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="Name"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="Enter Your Mail"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Street</label>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="Street"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="City"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="State"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Zipcode</label>
                        <input
                            type="text"
                            name="zipcode"
                            value={formData.zipcode}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="Zipcode"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="Country"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="Phone Number"
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className="mt-6">
                    <h2 className="text-xl font-bold">Payment Method</h2>
                    <div className="grid lg:grid-cols-3 grid-cols-1 items-center">
                        {/* <div className="flex mt-4">
                            <input type="radio" id="stripe" name="payment" value="stripe" onChange={handlePaymentChange} />
                            <label htmlFor="stripe" className="ml-2">Stripe</label>
                        </div> */}
                        <div className="flex mt-2">
                            <input type="radio" id="razorpay" name="payment" value="razorpay" onChange={handlePaymentChange} />
                            <label htmlFor="razorpay" className="ml-2">Razorpay</label>
                        </div>
                        <div className="flex mt-2">
                            <input type="radio" id="cash" name="payment" value="cash" onChange={handlePaymentChange} />
                            <label htmlFor="cash" className="ml-2">Cash on Delivery</label>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <button className="mt-6 w-fit px-3  bg-black text-white py-2 rounded-md" onClick={handleSubmit}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
