import React from 'react';

const MyOrders = () => {

  const orders = [
    {
      id: 1,
      title: 'Arrives tomorrow',
      deliveryTime: '7am - 7pm',
      status: 'Dispatched',
    },
   
  ];

  return (
    <section className="my-10 px-4 max-w-[70rem] mx-auto md:my-36 ">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <p className="text-gray-500 mb-4">{orders.length} orders</p>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
          <span className="font-semibold">{orders[0].status}</span>
        </div>

        {orders.map((order) => (
          <div key={order.id} className="border-b border-gray-200 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{order.title}</h2>
                <p className="text-gray-400">{order.deliveryTime}</p>
              </div>
              <div className="flex space-x-4">
                <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                  Track Order
                </button>
                <button className="border border-gray-300 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100">
                  View Order Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyOrders;
