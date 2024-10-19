import axios from "axios";

import { gettoken } from "../../../../shared/services/Token/token";
import apiurl from "../../../../Shared/Services/api/apiendpoint";

export const getallcategory = async(params)=>{
   var res=await axios.get(`${apiurl()}/category/apigetallcategory`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getFilterOptions = async(data)=>{
   var res=await axios.post(`${apiurl()}/category/getfilteroptions`,{field:data},{headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const savecategory=async(datas)=>{
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
      var res=await axios.post(`${apiurl()}/category/apisavecategory`,formData,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
      return res.data;
   }
   catch(err){
      console.log(err);
   }
}
export const updatecategory=async(datas)=>{
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
   var res=await axios.put(`${apiurl()}/category/apiupdatecategory`,formData,{params:{_id:datas?._id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const deletecategory=async(id)=>{
   var res=await axios.delete(`${apiurl()}/category/apideletecategory`,{params:{_id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

// export const searchcategory = async(datas)=>{
//    var res=await axios.post(`${apiurl()}/users/apisearchcategory`,datas,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
//    return res.data;
// }
