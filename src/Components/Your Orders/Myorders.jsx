import React, { useState } from 'react';
import { FaRegCheckCircle, FaFilePdf } from 'react-icons/fa';
import { MdEditSquare } from "react-icons/md";

const MyOrders = () => {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');


  const [selectedOption, setSelectedOption] = useState('');



  const [isTextAreaVisible, setTextAreaVisible] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setTextAreaVisible(value === 'option1'); // Show text area only if "Cancel Order" is selected
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    alert(`Selected option: ${selectedOption}`);
  };

  const orders = [
    {
      id: 1,
      orderId: 'DMark_240924_151318',
      orderDate: '22/10/2024',
      totalAmount: '$',
      billingName: 'Yuvaraj',
      email: 'yuvarajtcz01@gmail.com',
      deliveryAddress: 'villupuram-605 601',
      status: 'Paid',
    },

  ];

  const openModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const closeModal = () => {

    setIsModalOpen(false);
    setSelectedOrderId('');
    setTextAreaVisible(false); // Close the text area
    setSelectedOption(''); // Reset selected option
    setModalOpen(false); // Close the modal
  };




  const details = [
    {
      id: 1,
      totalOrders: 5,
      totalProcess: 5,
      totalDelivered: 5,
      TotalPending: 6,

    }



  ]



  return (
    <section className="my-10 px-4 max-w-[70rem] mx-auto md:my-36 lg:mt-0 mt-28">
      <h1 className="text-2xl font-bold mb-6 ">My Orders</h1>
      <div className='space-y-4'>

        {details.map((detail) => (
          <div key={detail.id} className='grid md:grid-cols-4 grid-cols-1 text-center gap-4 mt-5 font-semibold text-gray-500 md:text-xl text-base'>
            <div className='border rounded-xl py-3 border-[#E38734]'>
              <p className="text-green-500">{detail.totalOrders}</p>
              <p className="">Total Orders</p>
            </div>
            <div className='border  rounded-xl  py-3 border-[#E38734]'>
              <p className="text-orange-400">{detail.totalProcess}</p>
              <p className="">Order Processing</p>
            </div>
            <div className='border  rounded-xl  py-3 border-[#E38734]'>
              <p className="text-green-700">{detail.totalDelivered}</p>
              <p className="">Total Delivered</p>
            </div>
            <div className='border  rounded-xl  py-3 border-[#E38734]'>
              <p className="text-red-600">{detail.TotalPending}</p>
              <p className="">Pending Orders</p>
            </div>
          </div>
        ))}



        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
          {orders.map((order) => (
            <div key={order.id} className="max-w-sm p-4 bg-white rounded-lg shadow-md border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold">Order ID: {order.orderId}</h3>
                <span className="text-green-500 font-semibold">{order.status}</span>
              </div>
              <p className="text-gray-500 text-sm">Order Date: {order.orderDate}</p>
              <p className="text-gray-500 text-sm">Total Amount: {order.totalAmount}</p>
              <div className="mt-4 text-sm">
                <p className="font-semibold">Billing Name: {order.billingName}</p>
                <p>Email: {order.email}</p>
                <p>Delivery Address: {order.deliveryAddress}</p>
              </div>
              <div className="flex items-center gap-4 mt-6">
                <MdEditSquare className='text-black text-2xl cursor-pointer hover:scale-105' onClick={() => openModal(order.orderId)} />
                <FaFilePdf className="text-red-600 text-xl cursor-pointer hover:scale-105" />
              </div>
              <button className="w-full mt-4 bg-green-100 text-green-700 font-semibold py-2 rounded-lg cursor-default">
                Order Placed
              </button>
            </div>
          ))}
        </div>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Update Order</h2>
            <p className="mb-6">Order ID: {selectedOrderId}</p>
            <form>

              <select id="options" className=' border-black border-2' value={selectedOption} onChange={handleChange}>
                <option value="">Select</option>
                <option value="option1">Cancel Order</option>

              </select>

              <div
                className={`transition-all duration-500 my-5 ease-in-out ${isTextAreaVisible ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
              >
                <textarea
                  placeholder="Please specify the reason for cancellation..."
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={4}
                />
              </div>

            </form>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
              <button onSubmit={handleSubmit} className="px-4 py-2 bg-[#E38734] text-white rounded hover:bg-[#b47339]">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyOrders;
