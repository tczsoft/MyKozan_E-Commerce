import axios from "axios";
import { gettoken } from "../../../../shared/services/Token/token";
import apiurl from '../../../../Shared/Services/api/apiendpoint';

export const getallorders = async(params)=>{
   var res = await axios.get(`${apiurl()}/orders/apigetallorder`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getFilterOptions = async(data)=>{
    var res= await axios.post(`${apiurl()}/orders/getfilteroptions`,{field:data},{headers: {"Authorization" : `Bearer ${gettoken()}`}});
    return res.data;
}

export const saveorders=async(datas)=>{
    var res=await axios.post(`${apiurl()}/orders/apisaveorder`,formData,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
    return res.data;
}

export const updateorders = async(datas)=>{
   var res=await axios.put(`${apiurl()}/orders/apiupdateorder`,formData,{params:{_id:formData._id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const deleteorders = async(id)=>{
   var res = await axios.delete(`${apiurl()}/orders/apideleteorder`,{params:{id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getOrderitemsbyid = async(Order_id)=>{
    var res= await axios.get(`${apiurl()}/orders/apigetorderitemsbyid`,{params:{Order_id:Order_id},headers: {"Authorization" : `Bearer ${gettoken()}`}});
    return res.data;
}
export const apidownloadPDF = async(datas)=>{
    var res = await axios.post(`${apiurl()}/orders/downloadPDF`,{Order_id:datas},{ responseType:'blob', headers: {"Authorization" : `Bearer ${gettoken()}`}});
    return res.data;
 }

 export const updateOrder = async(datas)=>{
    try {
       var res=await axios.put(`${apiurl()}/orders/apiupdateorder`,datas,{params:{_id:datas._id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
       return res.data;
    }
    catch(err){
       console.log(err);
    }
}