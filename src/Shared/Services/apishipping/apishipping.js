import axios from "axios";

import apiurl from "../api/apiendpoint.js";
import { gettoken } from "../token/token.js";


export const apigetallShipping = async (params) => {
    try {
        const res = await axios.get(`${apiurl()}/shipping/getallshipping`, {
            params: params,
            headers: {"Authorization" : `Bearer ${gettoken()}`}});
        return res.data;
    } catch (error) {
        console.error("Error fetching shipping data:", error);
        return null;
    }
};


export const saveShipping = async(datas)=>{
    try {
       const res=await axios.post(`${apiurl()}/shipping/shipping`,datas,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
       return res.data;
    }
    catch(err){
       console.log(err);
    }
}

export const updateShipping = async(datas)=>{
    try {
        const res=await axios.put(`${apiurl()}/shipping/shipping/update`,datas,{params:{_id:datas?._id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
        return res.data;
    }
    catch(err){
       console.log(err);
    }
}

export const deleteShipping = async(_id)=>{
    try {
        const res=await axios.delete(`${apiurl()}/shipping/shipping/delete`,{params:{_id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
        return res.data;
    }
    catch(err){
       console.log(err);
    }
}