import axios from "axios";
import apiurl from '../../../../Shared/Services/api/apiendpoint';
import { gettoken } from "../../../../shared/services/Token/token";

export const getallproducts = async(params)=>{
   var res=await axios.get(`${apiurl()}/products/getallproducts`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getFilterOptions = async(data)=>{
   var res=await axios.post(`${apiurl()}/products/getfilteroptions`,{field:data},{headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const saveproducts=async(datas)=>{
   try {
      const formData = new FormData();
      for (const key in datas) {
         if(key== 'Images'){
            for(let i = 0; i < datas['Images'].length; i++)
              if (datas['Images'][i] instanceof File)
                formData.append(key, datas[key][i]);
              else
               formData.append(key, datas[key]);
         }
         else{
            formData.append(key, datas[key]);
         }
      }
      var res=await axios.post(`${apiurl()}/products/saveproducts`,formData,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
      return res.data;
   }
   catch(err){
      console.log(err);
   }
}
export const updateproducts=async(datas)=>{
   const formData = new FormData();
   for (const key in datas) {
      if(key== 'Images'){
         for(let i = 0; i < datas['Images'].length; i++){
            if (datas['Images'][i] instanceof File){
               formData.append(key, datas[key][i]);
            }
      
         }
          
      }
      else{
         formData.append(key, datas[key]);
      }
   }
   console.log(formData)
   var res=await axios.put(`${apiurl()}/products/apiupdateproduct`,formData,{params:{_id:datas?._id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}
export const deleteproducts=async(id)=>{
   var res=await axios.delete(`${apiurl()}/products/apideleteproduct`,{params:{_id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}
