import axios from "axios";
import apiurl from "../api/apiendpoint";
import { gettoken } from "../Token/token";





const getAuthHeaders = () => ({
    headers: { 'Authorization': `Bearer ${gettoken()}` }
  });


  const createOrder = async (orderData) => {
    const res = await axios.post(`${apiurl()}/api/orders`, orderData, getAuthHeaders());
    return res.data;
};

  


const createProduct = async (data) => {
  const res = await axios.post(`${apiurl()}/products/products`, data, getAuthHeaders());
  return res.data;
};

// const getAllProducts = async () => {
//   const res = await axios.get(`${apiurl()}/products/products`);
//   return res.data;
// };

const getAllProducts = async (params) => {
  const res = await axios.get(`${apiurl()}/products/getallproducts`, { params });
  return res.data;  
};

const searchProducts = async () => {
  const res = await axios.get(`${apiurl()}/products/products/search`);
  return res.data;
};

const getProductbyId = async (id) => {
  const res = await axios.get(`${apiurl()}/products/products/getproductbyid`, { params: { _id: id } });
  return res.data;
};

const updateProduct = async (id, data) => {
  const res = await axios.put(`${apiurl()}/products/products/update`, data, {
    ...getAuthHeaders(),
    params: { _id: id }
  });
  return res.data;
};

// const updateProduct = async (id, productData) => {
//     try {
//       const response = await axios.put(`${apiurl}/products/products/update?id=${id}`, productData);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

const deleteProduct = async (id) => {
  const res = await axios.delete(`${apiurl()}/products/products/delete`, {
    ...getAuthHeaders(),
    params: { _id: id }
  });
  return res.data;
};

export { createProduct , getAllProducts , searchProducts , getProductbyId , updateProduct , deleteProduct, createOrder  }












