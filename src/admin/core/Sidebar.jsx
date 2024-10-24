import { Link, NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users,
  Menu
} from "lucide-react";
import { useState } from "react";
import useAuth from "../../shared/services/store/useAuth";

export default function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false); 
  const { userdetails, logout } = useAuth()
  return (
    <>
      {/* Mobile Header */}
      <div className="sticky inset-x-0 top-0 z-20 px-4 bg-white border-b lg:hidden sm:px-6 md:px-8 ">
        <div className="flex items-center py-4">
          <button 
            type="button" 
            className="p-2 rounded-lg hover:bg-gray-100" 
            onClick={() => setSidebarOpen(!isSidebarOpen)} 
            aria-controls="application-sidebar" 
            aria-label="Toggle navigation"
          >
            <Menu className="text-gray-600 size-5" />
          </button>
          <span className="ml-3 text-xl font-bold text-gray-800">Admin Panel</span>
        </div>
      </div>

      {/* Sidebar */}
      <div 
        id="application-sidebar" 
        className={`fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white shadow-lg border-r transition-transform duration-300 transform lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="px-6 py-4 border-b border-gray-200">
          <Link to='/' className="flex items-center gap-2" href="#" aria-label="Brand">
            <img src="/assets/Images/Header/My_Kozan1.png" alt="" className="" />
            {/* <span className="text-lg font-bold text-gray-800">MyApp</span> */}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-4">
          <NavLink 
            to='/admin/dashboard'
            className={({ isActive }) => (`
              flex items-center gap-x-3 py-2 px-4 rounded-lg text-sm font-medium transition-all
              ${isActive 
                ? 'bg-[#f0dccb] text-[#E38734]'

                : 'text-gray-600 hover:bg-[#f0dccb] hover:text-[#E38734]'
              }
            `)}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink 
            to='/admin/products'
            className={({ isActive }) => (`
              flex items-center gap-x-3 py-2 px-4 rounded-lg text-sm font-medium transition-all
              ${isActive 
                ? 'bg-[#f0dccb] text-[#E38734]' 
                : 'text-gray-600 hover:bg-[#f0dccb] hover:text-[#E38734]'
              }
            `)}
          >
            <Package className="w-5 h-5" />
            <span>Products</span>
          </NavLink>

          <NavLink 
            to='/admin/orders'
            className={({ isActive }) => (`
              flex items-center gap-x-3 py-2 px-4 rounded-lg text-sm font-medium transition-all
              ${isActive 
                ? 'bg-[#f0dccb] text-[#E38734]' 
                : 'text-gray-600 hover:bg-[#f0dccb] hover:text-[#E38734]'
              }
            `)}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Orders</span>
          </NavLink>

          <NavLink 
            to='/admin/customers'
            className={({ isActive }) => (`
              flex items-center gap-x-3 py-2 px-4 rounded-lg text-sm font-medium transition-all
              ${isActive 
                ? 'bg-[#f0dccb] text-[#E38734]' 
                : 'text-gray-600 hover:bg-[#f0dccb] hover:text-[#E38734]'
              }
            `)}
          >
            <Users className="w-5 h-5" />
            <span>Customers</span>
          </NavLink>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
              <Users className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">{userdetails()?.Email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile (optional, closes sidebar when clicking outside) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}
