import apiurl from "../api/apiendpoint";
import { gettoken } from "../token/token";
import axios from "axios";
export const apiSaveorder = async (orderdata,ordermasterdata ) => {
    try {
        const res = await axios.post(`${apiurl()}/orders/create`,{orderdata,ordermasterdata} , {  headers: {"Authorization" : `Bearer ${gettoken()}`}},);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err; 
    }
};