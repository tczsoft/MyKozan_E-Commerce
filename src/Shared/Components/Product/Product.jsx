
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Search, ShoppingCart } from "lucide-react";
// import toast from "react-hot-toast";
// import { getAllProducts } from "../../Services/products/apiProducts";
// import UseCart from "../../Services/Store/UseCart";
// import '../Product/Product.css'
// import useAuth from "../../Services/Store/useAuth";
// import { apisavecart } from "../../Services/Cart/apiCart";
// import apiurl from "../../Services/api/apiendpoint";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [rows, setRows] = useState(12);
//   const [first, setFirst] = useState(0);
//   const [globalFilter, setGlobalFilter] = useState("");

//   const addToCart = UseCart(state => state.addToCart);
//   const cartItems = UseCart((state) => state.cartItems);
//   const { isLoggedIn, userdetails } = useAuth();

//   const handleAddToCart = async (product) => {
//     if (!isLoggedIn) {
//       toast.error("Please log in to add items to your cart!");
//       return;
//     }

//     const userDetails = userdetails();
//     const cartItemsFromStore = cartItems || [];

//     if (cartItemsFromStore.some((item) => item.product._id === product._id)) {
//       toast.error("Product is already in your cart!");
//       return;
//     }

//     try {
//       const cartData = { productId: product._id, Email: userDetails.Email, Quantity: 50 };
//       await apisavecart(cartData);
//       addToCart(product);
//       toast.success("Product added to cart successfully!");
//     } catch (error) {
//       toast.error("Failed to add product to cart.");
//       console.error("Error adding product to cart:", error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const params = { first, rows, globalfilter: globalFilter };
//       const res = await getAllProducts(params);
//       setProducts(res.products || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [first, rows, globalFilter]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="w-16 h-16 border-4 border-t-4 border-green-500 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen gap-4">
//         <ShoppingCart className="w-16 h-16 text-gray-400" />
//         <p className="text-xl text-gray-600">No products available at the moment.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen max-w-[75rem] mx-auto px-5">
//       <div className="py-10 mx-auto lg:py-0 max-w-7xl sm:px-6 lg:px-8">
//         <div className="flex justify-between ">
//           <h1 className="hidden mt-4 mb-8 text-base font-bold text-gray-900 md:text-3xl md:mt-0 md:block"> Products</h1>
//           <div className="relative mb-12">
//             <input
//               type="text"
//               value={globalFilter}
//               onChange={(e) => setGlobalFilter(e.target.value)}
//               placeholder="Search products..."
//               className="w-full px-4 py-3 pl-12 transition-all duration-200 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//             />
//             <Search className="absolute left-4 top-3.5 text-gray-400" />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="overflow-hidden transition-all duration-300 bg-white border-2 shadow-sm group rounded-xl shade"
//             >
//               <div className="p-4">
//                 <Link to={`/productdetails/${product._id}`} className="block">
//                   <div className="relative mb-4 overflow-hidden bg-gray-100 rounded-lg aspect-square">
//                     <img
//                       src={`${apiurl()}/${product.Images[0]}`}
//                       alt={product.Product_Name}
//                       className="object-contain w-full h-full transition-transform duration-300 transform group-hover:scale-110"
//                     />
//                   </div>
//                   <h2 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2 h-14">
//                     {product.Product_Name}
//                   </h2>
//                   <div className="flex items-baseline justify-between mb-4">
//                     <p className="text-2xl font-bold text-green-600">
//                       $ {product.Sale_Price || 'N/A'}
//                     </p>
//                     <span className="text-sm text-gray-500">Min. 50 Pcs</span>
//                   </div>
//                 </Link>
//                 <div className="flex gap-4 pt-4 border-t">
//                   <Link
//                     to="/checkout"
//                     state={{ product }}
//                     className="flex-1"
//                   >
//                     <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg transition-colors duration-200 font-medium">
//                       Buy Now
//                     </button>
//                   </Link>
//                   <button
//                     onClick={() => handleAddToCart(product)}
//                     className="p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
//                     title="Add to Cart"
//                   >
//                     <ShoppingCart className="w-6 h-6 text-gray-600" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* <div className="flex justify-center gap-4 mt-12">
//           <button
//             onClick={() => setFirst(Math.max(0, first - rows))}
//             disabled={first === 0}
//             className="px-6 py-2.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => setFirst(first + rows)}
//             disabled={products.length < rows}
//             className="px-6 py-2.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
//           >
//             Next
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Products;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate to handle routing
import { Search, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { getAllProducts } from "../../Services/products/apiProducts";
import UseCart from "../../Services/Store/UseCart";
import '../Product/Product.css'
import useAuth from "../../Services/Store/useAuth";
import { apisavecart } from "../../Services/Cart/apiCart";
import apiurl from "../../Services/api/apiendpoint";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState(12);
  const [first, setFirst] = useState(0);
  const [globalFilter, setGlobalFilter] = useState("");
  
  const addToCart = UseCart(state => state.addToCart);
  const cartItems = UseCart((state) => state.cartItems);
  const { isLoggedIn, userdetails } = useAuth();
  const navigate = useNavigate(); 

  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      toast.error("Please log in to add items to your cart!");
      navigate('/login')
      return;
    }

    const userDetails = userdetails();
    const cartItemsFromStore = cartItems || [];

 
    if (cartItemsFromStore.some((item) => item._id === product._id)) {
      toast.error("Product is already in your cart!");
      return;
    }

    try {
      const cartData = { productId: product._id, Email: userDetails.Email, Quantity: 50 };
      await apisavecart(cartData);
      addToCart(product);
      toast.success("Product added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add product to cart.");
      console.error("Error adding product to cart:", error);
    }
  };

  const handleBuyNow = (product) => {
    if (!isLoggedIn) {
      toast.error("Please log in to Buy items!");
      navigate('/login')
      return;
    }
    localStorage.setItem("buyNowProduct", JSON.stringify(product));
    navigate("/checkout", { state: { product } }); 
  };

  const fetchProducts = async () => {
    try {
      const params = { first, rows, globalfilter: globalFilter };
      const res = await getAllProducts(params);
      setProducts(res.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [first, rows, globalFilter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <ShoppingCart className="w-16 h-16 text-gray-400" />
        <p className="text-xl text-gray-600">No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] max-w-[75rem] mx-auto px-5 mt-32">
      <div className="py-10 mx-auto lg:py-0 max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between ">
          <h1 className="hidden mt-4 mb-8 text-base font-bold text-gray-900 md:text-3xl md:mt-0 md:block"> Products</h1>
          <div className="relative mb-12">
            <input
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-3 pl-12 transition-all duration-200 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="overflow-hidden transition-all duration-300 bg-white border-2 shadow-sm group rounded-xl shade"
            >
              <div className="p-4">
                <Link to={`/productdetails/${product._id}`} className="block">
                  <div className="relative mb-4 overflow-hidden bg-gray-100 rounded-lg aspect-square">
                    <img
                      src={`${apiurl()}/${product.Images[0]}`}
                      alt={product.Product_Name}
                      className="object-contain w-full h-full transition-transform duration-300 transform group-hover:scale-110"
                    />
                  </div>
                  <h2 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2 h-14">
                    {product.Product_Name}
                  </h2>
                  <div className="flex items-baseline justify-between mb-4">
                    <p className="text-2xl font-bold text-green-600">
                      $ {product.Sale_Price || 'N/A'}
                    </p>
                    <span className="text-sm text-gray-500">Min. 50 Pcs</span>
                  </div>
                </Link>
                <div className="flex gap-4 pt-4 border-t">
                  <button
                    onClick={() => handleBuyNow(product)} 
                    className="flex-1 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg transition-colors duration-200 font-medium"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
