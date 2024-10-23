// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../Product/Product.css";
// import toast from "react-hot-toast";
// import { getAllProducts } from "../../Services/products/apiProducts";  
// import UseCart from "../../Services/Store/UseCart";
// import useAuth from "../../Services/Store/useAuth";
// import { apisavecart } from "../../Services/Cart/apiCart";
// import apiurl from "../../Services/api/apiendpoint";

// function Products() {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [rows, setRows] = useState(10);  
//     const [first, setFirst] = useState(0); 
//     const [globalFilter, setGlobalFilter] = useState("");  

//     const addToCart = UseCart(state => state.addToCart);
//     const cartItems = UseCart((state) => state.cartItems); 
//     const { isLoggedIn, userdetails } = useAuth(); 


//     const handleAddToCart = async (product) => {
//         if (!isLoggedIn) {
//             toast.error("Please log in to add items to your cart!");
//             return;
//         }

//         const userDetails = userdetails();
//         const cartItemsFromStore = cartItems || []; 

//         if (cartItemsFromStore.some((item) => item.product._id === product._id)) {
//             toast.error("Product is already in your cart!");
//             return;
//         }

//         try {
//             const cartData = { productId: product._id, Email: userDetails.Email, Quantity: 50 };
//             await apisavecart(cartData); 

//             addToCart(product); 
//             toast.success("Product added to cart successfully!");
//         } catch (error) {
//             toast.error("Failed to add product to cart.");
//             console.error("Error adding product to cart:", error);
//         }
//     };




//     const fetchProducts = async () => {
//         try {
//             const params = {
//                 first,
//                 rows,
//                 globalfilter: globalFilter,
//             };
//             const res = await getAllProducts(params);  
//             setProducts(res.products || []);  
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         } finally {
//             setLoading(false);
//         }
//     };


//     useEffect(() => {
//         fetchProducts();
//     }, [first, rows, globalFilter]);


//     const handleNextPage = () => {
//         setFirst(first + rows);  
//     };

//     const handlePrevPage = () => {
//         setFirst(first > 0 ? first - rows : 0);  
//     };

//     if (loading) {
//         return <div className="text-center">Loading products...</div>; 
//     }

//     if (products.length === 0) {
//         return <div className="text-center">No products available at the moment.</div>;
//     }

//     return (
//         <section className="my-10 max-w-[68rem] mx-auto md:mt-36 mt-24">
//             <h1 className="text-center md:text-2xl text-xl border bg-[#00712D] w-fit mx-auto text-white p-2 rounded-lg">
//                 Products
//             </h1>
//             <div className="mb-5 text-center">
//                 <input
//                     type="text"
//                     value={globalFilter}
//                     onChange={(e) => setGlobalFilter(e.target.value)}
//                     placeholder="Search products..."
//                     className="p-2 border rounded"
//                 />
//             </div>

//             <div className="grid grid-cols-1 gap-6 mx-4 mt-6 lg:grid-cols-3 md:grid-cols-2">
//                 {products.map((product) => (
//                     <div
//                         key={product._id}
//                         className="relative md:w-full lg:h-[360px] hover:shadow-md border rounded-lg overflow-hidden group"
//                     >
//                         <Link to={`/productsdetail/${product._id}`}>
//                             <div className="relative w-full flex justify-center items-center pt-[10px] z-10">
//                                 <img
//                                     src={`${apiurl()}/${product.Images[0]}`}
//                                     alt={product.Product_Name}
//                                     className="max-w-full rare lg:group-hover:max-w-[60%]"
//                                 />
//                             </div>
//                             <div className="relative p-[5px] flex justify-center items-center flex-col z-10 cursor-default">
//                                 <h2 className="mb-2 font-semibold text-center md:text-lg">
//                                     {product.Product_Name}
//                                 </h2>
//                                 <p className="text-center text-gray-700">
//                                     <span className="text-[#E38734] font-bold md:text-xl">
//                                         {product.Sale_Price || 'N/A'}
//                                     </span>
//                                     <span className="block text-sm">(Min. 50 Pcs)</span>
//                                 </p>
//                             </div>
//                         </Link>
//                         <div className="flex items-center justify-around mb-5 lg:mb-0">
//                             <Link to="/checkout" state={{ product }}>
//                                 <button className="bg-[#00712D] hover:scale-105 mt-4 md:text-base text-sm duration-200 text-white py-2 px-4 rounded-lg w-full transition">
//                                     Buy Now
//                                 </button>
//                             </Link>
//                             <img
//                                 onClick={() => handleAddToCart(product)}
//                                 src="/assets/Images/Products/Add Shopping Cart.png"
//                                 alt="Add to cart"
//                                 className="w-8 h-8 mt-5 transition duration-200 cursor-pointer hover:scale-105"
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Pagination Controls */}
//             <div className="flex justify-center mt-8">
//                 <button onClick={handlePrevPage} className="px-4 py-2 mr-2 bg-gray-300 rounded">
//                     Previous
//                 </button>
//                 <button onClick={handleNextPage} className="px-4 py-2 bg-gray-300 rounded">
//                     Next
//                 </button>
//             </div>
//         </section>
//     );
// }

// export default Products;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      toast.error("Please log in to add items to your cart!");
      return;
    }

    const userDetails = userdetails();
    const cartItemsFromStore = cartItems || [];

    if (cartItemsFromStore.some((item) => item.product._id === product._id)) {
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
    <div className="min-h-screen max-w-[75rem] mx-auto px-5">
      <div className="  lg:py-0 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between ">
          <h1 className="mb-8 md:text-3xl text-base font-bold text-gray-900 md:mt-0 mt-4 md:block hidden"> Products</h1>
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
              className="overflow-hidden transition-all duration-300 bg-white shadow-sm group  border-2 rounded-xl  shade"
            >
              <div className="p-4">
                <Link to={`/productsdetail/${product._id}`} className="block">
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
                  <Link
                    to="/checkout"
                    state={{ product }}
                    className="flex-1"
                  >
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg transition-colors duration-200 font-medium">
                      Buy Now
                    </button>
                  </Link>
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

        {/* <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={() => setFirst(Math.max(0, first - rows))}
            disabled={first === 0}
            className="px-6 py-2.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            Previous
          </button>
          <button
            onClick={() => setFirst(first + rows)}
            disabled={products.length < rows}
            className="px-6 py-2.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Products;


