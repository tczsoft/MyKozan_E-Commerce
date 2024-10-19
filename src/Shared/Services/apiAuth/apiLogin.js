import axios from "axios";
import apiurl from "../api/apiendpoint";
const apilogin = async(data)=>{
   var res = await axios.post(`${apiurl()}/api/apilogin`,data);
   return res.data;
}

export { apilogin};



