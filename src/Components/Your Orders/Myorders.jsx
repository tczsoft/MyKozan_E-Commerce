
import React, { useState, useEffect, useMemo } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import { MdEditSquare } from "react-icons/md";
import useAuth from '../../Shared/Services/Store/useAuth';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';
import { apidownloadPDF, getallorders, updateOrder } from '../../admin/shared/services/apiorders/apiorders';
import { Dialog } from 'primereact/dialog';
import moment from 'moment-timezone';
import { Pagination } from '@nextui-org/react';

const MyOrders = () => {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [orderStats, setOrderStats] = useState({});
  const [downloadingpdf, setDownloadingpdf] = useState({});
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const { userdetails } = useAuth();
  const email = userdetails()?.Email;
  const rowsPerPage = 6;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!email) {
          toast.error("User email not available.");
          return;
        }
        const params = { email };
        const response = await getallorders(params);
        setOrders(response.resdata);

        const totalOrders = response.resdata.length;
        const totalProcess = response.resdata.filter(order => order.Order_Status === 'Order Processing').length;
        const totalDelivered = response.resdata.filter(order => order.Order_Status === 'Order Delivered').length;
        const totalPending = response.resdata.filter(order => order.Order_Status === 'Payment Pending' || order.Order_Status === 'Order Placed').length;

        setOrderStats({
          totalOrders,
          totalProcess,
          totalDelivered,
          totalPending,
        });
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders.');
      }
    };

    fetchOrders();
  }, [email]);

  const downloadPDF = async (data) => {
    setDownloadingpdf(prev => ({ ...prev, [data]: true }));
    try {
      var resData = await apidownloadPDF(data);
      const pdfBlob = new Blob([resData], { type: 'application/pdf' });
      const pdfFileName = `${data}.pdf`;
      saveAs(pdfBlob, pdfFileName);
    } catch (error) {
      console.error('Error downloading Pdf', error);
      toast.error('Failed to download Pdf');
    } finally {
      setDownloadingpdf(prev => ({ ...prev, [data]: false }));
    }
  };

  const editOrder = (order) => {
    setSelectedOrder(order); // Set the order to be edited
    setEditDialogVisible(true); // Open the dialog
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setSelectedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleOrderUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateOrder(selectedOrder);
      toast.success("Order successfully updated");
      setEditDialogVisible(false);
      const response = await getallorders({ email });
      setOrders(response.resdata);
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order.');
    }
  };

  const pages = Math.ceil(orders.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return orders.slice(start, end);
  }, [page, orders]);
  return (
    <section className="my-10 px-4 max-w-[70rem] mx-auto md:my-36 lg:mt-0 mt-28">
      <h1 className="mb-6 text-2xl font-bold">My Orders</h1>
      <div className='space-y-4'>
        {/* Order statistics */}
        <div className='grid grid-cols-1 gap-4 mt-5 text-base font-semibold text-center text-gray-500 md:grid-cols-4 md:text-xl'>
          <div className='border rounded-xl py-3 border-[#E38734]'>
            <p className="text-green-500">{orderStats.totalOrders || 0}</p>
            <p>Total Orders</p>
          </div>
          <div className='border rounded-xl py-3 border-[#E38734]'>
            <p className="text-orange-400">{orderStats.totalProcess || 0}</p>
            <p>Order Processing</p>
          </div>
          <div className='border rounded-xl py-3 border-[#E38734]'>
            <p className="text-green-700">{orderStats.totalDelivered || 0}</p>
            <p>Total Delivered</p>
          </div>
          <div className='border rounded-xl py-3 border-[#E38734]'>
            <p className="text-red-600">{orderStats.totalPending || 0}</p>
            <p>Pending Orders</p>
          </div>
        </div>

        {/* Order cards */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2'>
          {orders.map((order) => (
            <div key={order._id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
              <div className="mb-3">
                <h3 className="text-lg font-bold text-gray-700">Order ID: {order.Order_id}</h3>
                <span className={`font-semibold ${order.Payment_Status === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>
                  {order.Payment_Status}
                </span>
              </div>
              <p className="mb-2 text-sm text-gray-600">
                <strong>Order Date:</strong> {new Date(order.Order_Date).toLocaleDateString()}
              </p>
              <p className="mb-2 text-sm text-gray-600">
                <strong>Total Amount:</strong> ₹{order.Total_Amount}
              </p>
              <div className="mb-4 text-sm">
                <p className="font-semibold">Billing Name: {order.Billing_Name}</p>
                <p>Email: {order.Email}</p>
                <p>Delivery Address: {order.Delivery_Address}</p>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <MdEditSquare className='text-2xl text-black cursor-pointer hover:scale-105' onClick={() => editOrder(order)} />
                <button
                  title="Download PDF"
                  onClick={() => downloadPDF(order.Order_id)}
                  className="inline-flex items-center text-xl font-medium text-red-600 gap-x-1"
                  disabled={downloadingpdf[order.Order_id]}
                >
                  {downloadingpdf[order.Order_id] ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <FaFilePdf className="text-red-500" />
                  )}
                </button>
              </div>
              <button
                className={`w-full py-2 mt-4 font-semibold rounded-lg cursor-default ${
                  order.Order_Status === "Order Placed"
                    ? "bg-green-100 text-green-700"
                    : order.Order_Status === "Delivered"
                    ? "bg-blue-100 text-blue-700"
                    : order.Order_Status === "Payment Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.Order_Status === "Order Processing"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.Order_Status}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Pagination isCompact showControls showShadow color="secondary" page={page} total={pages} onChange={(page) => setPage(page)}  />
      </div>

      {/* Update Order Dialog */}
      <Dialog header="Update Order" visible={editDialogVisible} onHide={() => setEditDialogVisible(false)} style={{ width: "450px" }} >
        <form onSubmit={handleOrderUpdate} className="flex flex-col p-4">
          <h5 className="font-semibold md:text-lg">Edit Order ID: {selectedOrder?.Order_id}</h5>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Order Status:</label>
            <select name="Order_Status" value={selectedOrder?.Order_Status || ''} onChange={handleOrderChange} className="block w-full p-2 mt-1 border border-gray-300 rounded-md" required>
              <option value="">Select</option>
              <option value="Order Cancel">Order Cancel</option>
              <option value="Order Returned">Order Returned</option>
            </select>
          </div>

          {['Order Cancel', 'Order Returned'].includes(selectedOrder?.Order_Status) && (
            <div className="mt-3">
              <label htmlFor="textarea-label" className="block mb-2 text-sm font-medium text-gray-700">
                {selectedOrder?.Order_Status} Reason
              </label>
              <textarea
                id="textarea-label"
                name="Reason"
                value={selectedOrder?.Reason || ''}
                onChange={handleOrderChange}
                className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-md"
                rows="3"
                placeholder="Type here"
                required
              ></textarea>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <button className="px-4 py-2 mr-2 text-white bg-gray-400 rounded" onClick={() => setEditDialogVisible(false)}>
              Close
            </button>
            <button type="submit" className="px-4 py-2 text-white rounded bg-primary">
              Submit
            </button>
          </div>
        </form>
      </Dialog>

    </section>
  );
};

export default MyOrders;
