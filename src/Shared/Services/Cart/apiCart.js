import axios from "axios";
import apiurl from "../api/apiendpoint";

 export const apisavecart = async (cartData) => {
    try {
        const response = await axios.post(`${apiurl()}/cart/savecart`, cartData);
        console.log('Cart saved successfully:', response.data);
    } catch (error) {
        console.error('Error saving cart:', error);
    }
};

export const getcartItems = async (email) => {
    try {
      const response = await axios.get(`${apiurl()}/cart/getallcart`, {params: { Email: email }});
      return response.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw error;
    }
  };

  export const updatecartItem = async (productId, Quantity, Email) => {
    try {
        const response = await axios.put(`${apiurl()}/cart/updatecart`,{ productId, Quantity, Email });
        return response.data;
    } catch (error) {
        console.error('Error updating cart item:', error);
        throw error;
    }
};

export const deletecartItem = async (productId) => {
    try {
      const response = await axios.delete(`${apiurl()}/cart/deletecartone`, { params: { _id: productId }});
      return response.data;
    } catch (error) {
      console.error('Error deleting cart item:', error);
      throw error;
    }
  };
  
  export const deleteAllcartItems = async (Email) => {
    try {
      const response = await axios.delete(`${apiurl()}/cart/deleteallcart`,{params:{Email}});
      return response.data;
    } catch (error) {
      console.error('Error deleting all cart items:', error);
      throw error;
    }
  };
  