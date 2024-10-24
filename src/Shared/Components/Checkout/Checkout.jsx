
// // import React, { useState, useEffect, useCallback } from 'react';
// // import ShippingForm from './ShippingForm';
// // import { apigetallShipping, deleteShipping, saveShipping, updateShipping } from '../../Services/apishipping/apishipping';
// // import toast from 'react-hot-toast';
// // import { MdDelete, MdModeEdit, MdLocationOn, MdShoppingBag, MdAdd } from "react-icons/md";
// // import useCartStore from '../../Services/Store/UseCart';
// // import { apiSaveorder } from '../../Services/Order/apiorder';
// // import { deleteAllcartItems } from '../../Services/Cart/apiCart';
// // import useAuth from '../../Services/Store/useAuth';
// // import { useNavigate } from 'react-router-dom';
// // import apiurl from '../../Services/api/apiendpoint';

// // const Checkout = () => {
// //     const [selectedAddress, setSelectedAddress] = useState(null);
// //     const [totalPrice, setTotalPrice] = useState(0);
// //     const [subtotal, setSubtotal] = useState(0);
// //     const [showNewAddressModal, setShowNewAddressModal] = useState(false);
// //     const [cartItems, setCartItems] = useState([]);
// //     const [formdata, setFormdata] = useState({});
// //     const [loading, setLoading] = useState(false);
// //     const [shippingdata, setShippingData] = useState([]);
// //     const [isEditMode, setIsEditMode] = useState(false);
// //     const { clearCart } = useCartStore();
// //     const { userdetails } = useAuth();
// //     const navigate = useNavigate();
// //     const getShippingdata = useCallback(async () => {
// //         const addresses = await apigetallShipping({});
// //         setShippingData(addresses);
// //     }, []);

// //     useEffect(() => {
// //         getShippingdata();
// //         const storedCartItems = localStorage.getItem('mykozanCart');
// //         const storedSubtotal = localStorage.getItem('totalPrice');
// //         if (storedCartItems) setCartItems(JSON.parse(storedCartItems));
// //         if (storedSubtotal) setSubtotal(parseFloat(storedSubtotal));
// //     }, [getShippingdata]);

// //     const handlePlaceOrder = async () => {
// //         if (!selectedAddress) {
// //             toast.error('Please provide an address and select a payment method.');
// //             return;
// //         }

// //         const orderdata = {
// //             Billing_Name: `${selectedAddress.First_Name} ${selectedAddress.Last_Name}`,
// //             Username: selectedAddress.Username || localStorage.getItem('username'),
// //             Email: selectedAddress.Email || localStorage.getItem('Email'),
// //             Mobile_Number: selectedAddress.Mobile_Number,
// //             Delivery_Address: `${selectedAddress.Address}, ${selectedAddress.City}, ${selectedAddress.State}, ${selectedAddress.Zipcode}`,
// //             Total_Amount: subtotal,
// //             Shipping_Cost: 0,
// //             City: selectedAddress.City,
// //             Delivery_Address_id: selectedAddress._id,
// //             Description: 'Order placed through website',
// //         };
// //         const ordermasterdata = cartItems.map(item => ({
// //             Product_Name: item.productId.Product_Name,
// //             Images: item.productId.Images || [],
// //             Sale_Price: item.productId.Sale_Price,
// //             Discount: item.productId.Discount || 0,
// //             Quantity: item.Quantity,
// //         }));

// //         try {
// //             setLoading(true);
// //             const response = await apiSaveorder(orderdata, ordermasterdata);
// //             if (response) {
// //                 toast.success('Order placed successfully!');
// //                 clearCart();
// //                 await deleteAllcartItems(userdetails().Email);
// //                 navigate('/')
// //                 localStorage.removeItem('mykozanCart');
// //                 localStorage.removeItem('totalPrice');
// //                 // Optionally, navigate to order confirmation or another page
// //             }
// //         } catch (error) {
// //             toast.error('Error placing order');
// //             console.error('Error placing order:', error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };



    // const handleEditAddress = (address) => {
    //     setFormdata(address);
    //     setIsEditMode(true);
    //     setShowNewAddressModal(true);
    // };

    // const handleDeleteAddress = (_id) => {
    //     deleteShipping(_id)
    //         .then(() => {
    //             toast.success("Address deleted successfully");
    //             return getShippingdata();
    //         })
    //         .catch(() => {
    //             toast.error("Error deleting address");
    //         });
    // };


    // const handleAddressChange = (e) => {
    //     setFormdata({
    //         ...formdata,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    // const handlesave = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     const action = isEditMode ? updateShipping : saveShipping;
    //     const successMessage = isEditMode ? "Address updated successfully" : "Address saved successfully"
    //     try {
    //         await action(formdata);
    //         toast.success(successMessage);
    //         await getShippingdata();
    //     } catch (error) {
    //         toast.error("Error saving address");
    //     } finally {
    //         setShowNewAddressModal(false);
    //         setLoading(false);
    //     }
    // };


// //     return (
// //         <div className="min-h-screen lg:py-0 py-10  max-w-[70rem] mx-auto">
// //             <div className="px-4 mx-auto sm:px-6 lg:px-8">
// //                 <div className="mx-auto ">
// //                     {/* Header */}
// //                     <div className="mb-6 lg:mb-12 ">
// //                         <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

// //                     </div>

// //                     <div className="grid grid-cols-2 overflow-hidden bg-white rounded-lg shadow-xl">
// //                         {/* Address Selection Section */}
// //                         <div className="p-1 md:p-6 ">
// //                             <div></div>
// //                             <div className="flex items-center justify-between mb-6">
// //                                 <h2 className="flex items-center text-sm font-semibold text-gray-900 md:text-x">
// //                                     <MdLocationOn className="w-6 h-6 mr-2 text-[#E38734]" />
// //                                     Delivery Address
// //                                 </h2>
// //                                 <button
// //                                     onClick={() => {
// //                                         setFormdata({});
// //                                         setIsEditMode(false);
// //                                         setShowNewAddressModal(true);
// //                                     }}
// //                                     className="flex items-center text-sm  transition-colors text-[#00712D] hover:text-[#346347]"
// //                                 >
// //                                     <MdAdd className="w-5 h-5 mr-1 text-[#00712D]" />
// //                                     Add New Address
// //                                 </button>
// //                             </div>

// //                             <div className="grid grid-cols-1 gap-4">
// //                                 {shippingdata && shippingdata.length > 0 ? (
// //                                     shippingdata.map((address, index) => (
// //                                         <div
// //                                             key={index}
// //                                             onClick={() => setSelectedAddress(address)}
// //                                             className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${selectedAddress?._id === address._id
// //                                                 ? 'border-[#00712D] bg-[#e9fff2]'
// //                                                 : 'border-gray-200 hover:border-[#00712D]'
// //                                                 }`}
// //                                         >
// //                                             <div className="flex items-start justify-between">
// //                                                 <div className="flex-1">
// //                                                     <div className="flex items-center mb-2">
// //                                                         <h3 className="font-semibold text-gray-900">
// //                                                             {address.First_Name} {address.Last_Name}
// //                                                         </h3>
// //                                                         <span className="px-2 py-1 ml-2 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
// //                                                             {address.Address_Type}
// //                                                         </span>
// //                                                     </div>
// //                                                     <p className="text-sm leading-relaxed text-gray-600">
// //                                                         {address.Address}, {address.City}, {address.State},
// //                                                         <br />
// //                                                         {address.Country} - {address.Zipcode}
// //                                                     </p>
// //                                                     <p className="mt-1 text-sm text-gray-500">Phone: {address.Phone}</p>
// //                                                 </div>
// //                                                 <div className="flex space-x-2">
// //                                                     <button
// //                                                         onClick={(e) => {
// //                                                             e.stopPropagation();
// //                                                             handleEditAddress(address);
// //                                                         }}
// //                                                         className="p-2 text-gray-400 transition-colors hover:text-blue-600"
// //                                                     >
// //                                                         <MdModeEdit className="w-5 h-5" />
// //                                                     </button>
// //                                                     <button
// //                                                         onClick={(e) => {
// //                                                             e.stopPropagation();
// //                                                             handleDeleteAddress(address._id);
// //                                                         }}
// //                                                         className="p-2 text-gray-400 transition-colors hover:text-red-600"
// //                                                     >
// //                                                         <MdDelete className="w-5 h-5" />
// //                                                     </button>
// //                                                 </div>
// //                                             </div>
// //                                         </div>
// //                                     ))
// //                                 ) : (
// //                                     <div className="py-6 text-center rounded-lg bg-gray-50">
// //                                         <p className="text-gray-500">No addresses available</p>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         </div>

// //                         {/* Order Summary Section */}
// //                         <div className="p-6 ">
// //                             <h2 className="flex items-center mb-6 text-xl font-semibold text-gray-900 ">
// //                                 <MdShoppingBag className="w-6 h-6 mr-2 text-[#E38734]" />
// //                                 Order Summary
// //                             </h2>
// //                             <p className="text-lg ">You Pay : <span className="text-[#E38734]"> $ {subtotal.toFixed(2)}</span></p>
// //                             <p className="">(Including delivery and other charges)</p>



// //                             <div className="p-6 bg-white ">
// //                                 <button
// //                                     onClick={handlePlaceOrder}
// //                                     disabled={loading || !selectedAddress}
// //                                     className={`w-full flex justify-center items-center px-6 py-3 rounded-md text-white text-lg font-medium transition-all duration-200 ${loading || !selectedAddress
// //                                         ? 'bg-gray-400 cursor-not-allowed'
// //                                         : 'bg-[#00712D] hover:bg-[rgb(227,135,52)]'
// //                                         }`}
// //                                 >
// //                                     {loading ? (
// //                                         <>
// //                                             <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                                             </svg>
// //                                             Processing...
// //                                         </>
// //                                     ) : (
// //                                         'Place Order'
// //                                     )}
// //                                 </button>
// //                                 {!selectedAddress && (
// //                                     <p className="mt-2 text-sm text-center text-red-500">Please select a delivery address</p>
// //                                 )}
// //                             </div>
//             //                 {/* <div className="space-y-4">
//             //                     {cartItems && cartItems.length > 0 ? (
//             //                         cartItems.map((item) => (
//             //                             <div key={item._id} className="flex items-center justify-between py-4 border-b border-gray-200">
//             //                                 <div className="flex items-center">
//             //                                     <img

//             //                                         src={`${apiurl()}/${item?.productId?.Images?.[0]}`}
//             //                                         alt={item.productId.Product_Name}
//             //                                         className="object-cover w-16 h-16 rounded-md"
//             //                                     />
//             //                                     <div className="ml-4">
//             //                                         <h3 className="text-sm font-medium text-gray-900">{item.productId.Product_Name}</h3>
//             //                                         <p className="mt-1 text-sm text-gray-500">Quantity: {item.Quantity}</p>
//             //                                     </div>
//             //                                 </div>
//             //                                 <div className="text-right">
//             //                                     <p className="text-sm font-medium text-gray-900">
//             //                                         ${(item.productId.Sale_Price * item.Quantity).toFixed(2)}
//             //                                     </p>
//             //                                     {item.productId.Discount > 0 && (
//             //                                         <p className="text-xs text-green-600">Save {item.productId.Discount}%</p>
//             //                                     )}
//             //                                 </div>
//             //                             </div>
//             //                         ))
//             //                     ) : (
//             //                         <p className="text-center text-gray-500">No items in cart</p>
//             //                     )}


//             //                     <div className="pt-4">
//             //                         <div className="flex justify-between text-base font-medium text-gray-900">
//             //                             <p>Total</p>
//             //                             <p>${subtotal.toFixed(2)}</p>
//             //                         </div>
//             //                     </div>
//             //                 </div> */}
//             //             </div>

//             //             {/* Place Order Button */}

//             //         </div>
//             //     </div>
//             // </div>

// //             {showNewAddressModal && (
// //                 <ShippingForm
// //                     visible={showNewAddressModal}
// //                     setVisible={setShowNewAddressModal}
// //                     formdata={formdata}
// //                     handlechange={handleAddressChange}
// //                     handlesave={handlesave}
// //                     loading={loading}
// //                 />
// //             )}
// //         </div>
// //     );
// // };

// // export default Checkout;





import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ShippingForm from './ShippingForm';
import { apigetallShipping, deleteShipping, saveShipping, updateShipping } from '../../Services/apishipping/apishipping';
import toast from 'react-hot-toast';
import { MdDelete, MdModeEdit, MdLocationOn, MdShoppingBag, MdAdd } from "react-icons/md";
import useCartStore from '../../Services/Store/UseCart';
import { apiSaveorder } from '../../Services/Order/apiorder';
import { deleteAllcartItems } from '../../Services/Cart/apiCart';
import useAuth from '../../Services/Store/useAuth';
import apiurl from '../../Services/api/apiendpoint'; // Import the API URL

const Checkout = () => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [showNewAddressModal, setShowNewAddressModal] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [formdata, setFormdata] = useState({});
    const [loading, setLoading] = useState(false);
    const [shippingdata, setShippingData] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const { clearCart } = useCartStore();
    const { userdetails } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const getShippingdata = useCallback(async () => {
        const addresses = await apigetallShipping({});
        setShippingData(addresses);
    }, []);

    useEffect(() => {
        getShippingdata();
        const storedCartItems = localStorage.getItem('mykozanCart');
        const storedSubtotal = localStorage.getItem('totalPrice');

        if (location.state?.product) {
            const product = location.state.product;
            setCartItems([{ productId: product, Quantity: 50 }]);
            setSubtotal(product.Sale_Price * 50); 
        } else if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
            if (storedSubtotal) setSubtotal(parseFloat(storedSubtotal));
        }
    }, [getShippingdata, location.state]);

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error('Please provide an address and select a payment method.');
            return;
        }

        const orderdata = {
            Billing_Name: `${selectedAddress.First_Name} ${selectedAddress.Last_Name}`,
            Username: selectedAddress.Username || localStorage.getItem('username'),
            Email: selectedAddress.Email || localStorage.getItem('Email'),
            Mobile_Number: selectedAddress.Mobile_Number,
            Delivery_Address: `${selectedAddress.Address}, ${selectedAddress.City}, ${selectedAddress.State}, ${selectedAddress.Zipcode}`,
            Total_Amount: subtotal,
            Shipping_Cost: 0,
            City: selectedAddress.City,
            Delivery_Address_id: selectedAddress._id,
            Description: 'Order placed through website',
        };
        const ordermasterdata = cartItems.map(item => ({
            Product_Name: item.productId.Product_Name,
            Images: item.productId.Images || [],
            Sale_Price: item.productId.Sale_Price,
            Discount: item.productId.Discount || 0,
            Quantity: item.Quantity,
        }));

        try {
            setLoading(true);
            const response = await apiSaveorder(orderdata, ordermasterdata);
            if (response) {
                toast.success('Order placed successfully!');
                clearCart();
                await deleteAllcartItems(userdetails().Email);
                navigate('/');
                localStorage.removeItem('mykozanCart');
                localStorage.removeItem('totalPrice');
            }
        } catch (error) {
            toast.error('Error placing order');
            console.error('Error placing order:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddressChange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };

    const handlesave = async (e) => {
        e.preventDefault();
        setLoading(true);
        const action = isEditMode ? updateShipping : saveShipping;
        const successMessage = isEditMode ? "Address updated successfully" : "Address saved successfully"
        try {
            await action(formdata);
            toast.success(successMessage);
            await getShippingdata();
        } catch (error) {
            toast.error("Error saving address");
        } finally {
            setShowNewAddressModal(false);
            setLoading(false);
        }
    };

    
    const handleEditAddress = (address) => {
        setFormdata(address);
        setIsEditMode(true);
        setShowNewAddressModal(true);
    };

    const handleDeleteAddress = (_id) => {
        deleteShipping(_id)
            .then(() => {
                toast.success("Address deleted successfully");
                return getShippingdata();
            })
            .catch(() => {
                toast.error("Error deleting address");
            });
    };


    


    return (
        <div className="min-h-screen lg:py-0 py-10 max-w-[70rem] mx-auto">
            <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <div className="mx-auto">
                    <div className="mb-6 lg:mb-12">
                        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                    </div>

                    <div className="grid grid-cols-2 overflow-hidden bg-white rounded-lg shadow-xl">
                        <div className="p-1 md:p-6">
                            <div></div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="flex items-center text-sm font-semibold text-gray-900 md:text-xl">
                                    <MdLocationOn className="w-6 h-6 mr-2 text-[#E38734]" />
                                    Delivery Address
                                </h2>
                                <button
                                    onClick={() => {
                                        setFormdata({});
                                        setIsEditMode(false);
                                        setShowNewAddressModal(true);
                                    }}
                                    className="flex items-center text-sm transition-colors text-[#00712D] hover:text-[#346347]"
                                >
                                    <MdAdd className="w-5 h-5 mr-1 text-[#00712D]" />
                                    Add New Address
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {shippingdata && shippingdata.length > 0 ? (
                                    shippingdata.map((address, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedAddress(address)}
                                            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${selectedAddress?._id === address._id
                                                ? 'border-[#00712D] bg-[#e9fff2]'
                                                : 'border-gray-200 hover:border-[#00712D]'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center mb-2">
                                                        <h3 className="font-semibold text-gray-900">
                                                            {address.First_Name} {address.Last_Name}
                                                        </h3>
                                                        <span className="px-2 py-1 ml-2 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                                                            {address.Address_Type}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm leading-relaxed text-gray-600">
                                                        {address.Address}, {address.City}, {address.State},
                                                        <br />
                                                        {address.Country} - {address.Zipcode}
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-500">Phone: {address.Phone}</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEditAddress(address);
                                                        }}
                                                        className="p-2 text-gray-400 transition-colors hover:text-blue-600"
                                                    >
                                                        <MdModeEdit className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteAddress(address._id);
                                                        }}
                                                        className="p-2 text-gray-400 transition-colors hover:text-red-600"
                                                    >
                                                        <MdDelete className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-6 text-center rounded-lg bg-gray-50">
                                        <p className="text-gray-500">No addresses available</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-6">
                            <h2 className="flex items-center mb-6 text-xl font-semibold text-gray-900">
                                <MdShoppingBag className="w-6 h-6 mr-2 text-[#E38734]" />
                                Order Summary
                            </h2>

                            <div className="space-y-4">
                                {cartItems && cartItems.length > 0 ? (
                                    cartItems.map((item) => (
                                        <div key={item.productId._id} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <img
                                                    src={`${apiurl()}/${item.productId.Images[0]}`}
                                                    alt={item.productId.Product_Name}
                                                    className="object-cover w-16 h-16 rounded-md"
                                                />
                                                <div className="ml-4">
                                                    <h3 className="text-sm font-medium text-gray-900">{item.productId.Product_Name}</h3>
                                                    <p className="mt-1 text-sm text-gray-500">Quantity: {item.Quantity}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">
                                                ${(item.productId.Sale_Price * item.Quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">No items in cart</p>
                                )}
                            </div>

                            <div className="mt-4 text-lg">
                                You Pay: <span className="text-[#E38734]">${subtotal.toFixed(2)}</span>
                            </div>
                            <p className="">(Including delivery and other charges)</p>

                            <div className="p-6 mt-4 bg-white">
                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={loading || !selectedAddress}
                                    className={`w-full flex justify-center items-center px-6 py-3 rounded-md text-white text-lg font-medium transition-all duration-200 ${loading || !selectedAddress
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-[#00712D] hover:bg-[rgb(227,135,52)]'
                                        }`}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        'Place Order'
                                    )}
                                </button>
                                {!selectedAddress && (
                                    <p className="mt-2 text-sm text-center text-red-500">Please select a delivery address</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showNewAddressModal && (
                <ShippingForm
                    visible={showNewAddressModal}
                    setVisible={setShowNewAddressModal}
                    formdata={formdata}
                    handlechange={handleAddressChange}
                    handlesave={handlesave}
                    loading={loading}
                />
            )}
        </div>
    );
};

export default Checkout;
