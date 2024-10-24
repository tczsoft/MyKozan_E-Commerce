import { FaUserTag, FaInbox, FaCog, FaShippingFast } from "react-icons/fa";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Dashboardcard() {
  // Sample chart data for orders overview
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Orders',
        data: [30, 150, 120, 180, 200, 170],
        fill: false,
        backgroundColor: '#00712D',
        borderColor: '#00712D',
      },
    ],
  };

  return (
    <div className="min-h-screen p-10 bg-white bg-opacity-30 backdrop-blur-md">
      {/* Grid Section */}
      <div className="grid gap-6 mb-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Customers */}
        <div className="relative p-5 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg border border-b-4 border-[#00712D] hover:scale-105 transition-transform">
          <div className="flex items-center justify-center w-12 h-12 mb-5 bg-white rounded-full shadow-lg">
            <FaUserTag className="text-2xl text-[#00712D]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">30</h1>
            <h3 className="text-sm text-gray-600">No of Customers</h3>
          </div>
        </div>

        {/* Card 2: Orders Received */}
        <div className="relative p-5 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg border border-b-4 border-[#00712D] hover:scale-105 transition-transform">
          <div className="flex items-center justify-center w-12 h-12 mb-5 bg-white rounded-full shadow-lg">
            <FaInbox className="text-2xl text-[#00712D]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">250</h1>
            <h3 className="text-sm text-gray-600">Orders Received</h3>
          </div>
        </div>

        {/* Card 3: Order Processing */}
        <div className="relative p-5 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg border border-b-4 border-[#00712D] hover:scale-105 transition-transform">
          <div className="flex items-center justify-center w-12 h-12 mb-5 bg-white rounded-full shadow-lg">
            <FaCog className="text-2xl text-[#00712D]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">150</h1>
            <h3 className="text-sm text-gray-600">Order Processing</h3>
          </div>
        </div>

        {/* Card 4: Total Delivery */}
        <div className="relative p-5 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg border border-b-4 border-[#00712D] hover:scale-105 transition-transform">
          <div className="flex items-center justify-center w-12 h-12 mb-5 bg-white rounded-full shadow-lg">
            <FaShippingFast className="text-2xl text-[#00712D]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">30</h1>
            <h3 className="text-sm text-gray-600">Total Delivery</h3>
          </div>
        </div>
      </div>

      {/* Additional Section: Orders Overview Chart */}
      <div className="p-6 bg-white shadow-lg bg-opacity-20 backdrop-blur-lg rounded-xl">
        <h2 className="mb-4 text-xl font-bold text-black">Orders Overview</h2>
        <Line data={data} />
      </div>
    </div>
  );
}
