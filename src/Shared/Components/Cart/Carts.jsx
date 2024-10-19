
import React, { useEffect, useState } from "react";
import useCart from "../../Services/Store/UseCart";
import { Link, useNavigate } from "react-router-dom";
import { deleteAllcartItems, deletecartItem, getcartItems, updatecartItem } from "../../Services/Cart/apiCart";
import useAuth from "../../Services/Store/useAuth";
import apiurl from "../../Services/api/apiendpoint";

function Cart() {
    const { removeFromCart, clearCart, updateQuantity } = useCart();
    const [loading, setLoading] = useState(true);
    const { userdetails } = useAuth();
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const quantityOptions = [
        { label: "Package of 50 Pieces", value: 50 },
        { label: "Package of 100 Pieces", value: 100 },
        { label: "Package of 250 Pieces", value: 250 },
        { label: "Package of 500 Pieces", value: 500 },
    ];

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const email = userdetails().Email;
                const response = await getcartItems(email);
                const cartItems = Array.isArray(response.response) ? response.response : [];
                setCart(cartItems);

                const calculatedTotalPrice = calculateTotalPrice(cartItems);
                setTotalPrice(calculatedTotalPrice);
                localStorage.setItem("totalPrice", calculatedTotalPrice.toFixed(2));
            } catch (error) {
                console.error("Error fetching cart items:", error);
                setCart([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [setCart, userdetails]);

    const handleCheckout = () => {
        localStorage.setItem("totalPrice", totalPrice.toFixed(2)); 
        localStorage.setItem("mykozanCart", JSON.stringify(cart)); 
        navigate("/checkout");
    };

    const handleQuantityChange = async (productId, event) => {
        const newQuantity = parseInt(event.target.value);
        const email = userdetails().Email;
        const previousCart = [...cart]; 
        const updatedCart = cart.map((item) =>
            item?.productId?._id === productId
                ? { ...item, Quantity: newQuantity }
                : item
        );
        setCart(updatedCart);
        try {
            const response = await updatecartItem(productId, newQuantity, email);
            const updatedTotalPrice = calculateTotalPrice(updatedCart);
            setTotalPrice(updatedTotalPrice); 
            localStorage.setItem("totalPrice", updatedTotalPrice.toFixed(2));
            localStorage.setItem("mykozanCart", JSON.stringify(updatedCart));
            updateQuantity(productId, newQuantity);
        } catch (error) {
            console.error("Failed to update quantity in the backend:", error);
            setCart(previousCart);
            const revertedTotalPrice = calculateTotalPrice(previousCart);
            setTotalPrice(revertedTotalPrice);
            localStorage.setItem("totalPrice", revertedTotalPrice.toFixed(2));
        }
    };

    const handleRemoveItem = async (productId) => {

        try {
            console.log(productId)
            const response = await deletecartItem(productId);
            removeFromCart(productId);
            const updatedCart = cart.filter((item) => item._id !== productId);
            setCart(updatedCart);
            const updatedTotalPrice = calculateTotalPrice(updatedCart);
            setTotalPrice(updatedTotalPrice);
            localStorage.setItem("totalPrice", updatedTotalPrice.toFixed(2));
            localStorage.setItem("mykozanCart", JSON.stringify(updatedCart));
            console.log("Updated localStorage after removal:", localStorage.getItem("mykozanCart"));
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };
    
    
    
    
    const handleClearCart = async () => {
        try {
            await deleteAllcartItems( userdetails().Email);
            clearCart();
            setCart([]);
            setTotalPrice(0);
            localStorage.removeItem("totalPrice");
            localStorage.removeItem("mykozanCart");
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };
    

    const calculateTotalItems = () => {
        return cart.reduce((total, item) => total + (parseInt(item.Quantity) || 0), 0);
    };

    const calculateTotalPrice = (cartItems) => {
        return cartItems.reduce((total, item) => {
            const salePrice = item?.productId?.Sale_Price || 0;
            const quantity = parseInt(item.Quantity) || 0;
            return total + salePrice * quantity;
        }, 0);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl">Loading cart items...</div>
            </div>
        );
    }

    if (!cart || cart.length === 0) {
        return (
            <div className="h-screen mt-32 text-center">
                <h1 className="mb-4 text-xl">Your cart is empty</h1>
                <Link to="/product">
                    <button className="bg-[#00712D] text-white py-2 px-4 rounded hover:bg-[#005f26] transition-colors">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <section className="my-10 max-w-[40rem] mx-auto md:my-32 px-5 md:mt-32 mt-32">
            <h1 className="text-center text-2xl border bg-[#00712D] text-white p-2 rounded-lg">
                Shopping Cart
            </h1>
            <div className="grid gap-4 mt-6">
                {cart.map((item) => (
                    <div key={item._id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-16 h-16">
                                <img
                                  
                                    src={`${apiurl()}/${item?.productId?.Images?.[0]}`}
                                    alt={item?.productId?.Product_Name || "Product"}
                                    className="object-cover w-full h-full rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-lg font-semibold">
                                    {item?.productId?.Product_Name || "Unknown Product"}
                                </h2>
                                {/* <p className="text-gray-600">
                                    Price: ${item?.productId?.Sale_Price?.toFixed(2) || "0.00"}
                                </p> */}
                                <p className="text-gray-600">
                                    Price: ${Number(item?.productId?.Sale_Price).toFixed(2) || "0.00"}
                                </p>

                                <select
                                    value={item.Quantity}
                                    onChange={(e) => handleQuantityChange(item?.productId?._id, e)}
                                    className="px-2 py-1 bg-white border rounded"
                                >
                                    {quantityOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            onClick={() => handleRemoveItem(item._id)} 
                            className="px-3 py-1 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-8">
                <div className="space-y-2">
                    <h2 className="font-semibold">Total Items: {calculateTotalItems()}</h2>
                    <button
                       onClick={handleClearCart}
                        className="px-4 py-2 text-white transition-colors bg-gray-500 rounded hover:bg-gray-600"
                    >
                        Clear Cart
                    </button>
                </div>
                <div className="space-y-2">
                    <h2 className="font-semibold">Total: ${totalPrice.toFixed(2)}</h2>
                    <button
                        onClick={handleCheckout}
                        className="bg-[#00712D] text-white py-2 px-6 rounded hover:bg-[#005f26] transition-colors"
                    >
                        Checkout
                    </button>
                </div>
            </div>

            <Link to="/product" className="block mt-8 text-center">
                <button className="bg-[#00712D] text-white py-2 px-4 rounded hover:bg-[#005f26] transition-colors">
                    Continue Shopping
                </button>
            </Link>
        </section>
    );
}

export default Cart;
