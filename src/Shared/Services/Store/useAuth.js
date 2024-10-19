import { useNavigate } from 'react-router-dom';
import {create} from 'zustand';
const tokenname="MYKOZANSECRET";
const useAuth = create((set) => ({
  
  isLoggedIn: localStorage.getItem(tokenname)?true:false,

  login: (token) => {
    localStorage.setItem(tokenname, token);
    set({ isLoggedIn: true, token });
  },

  logout: () => {
    localStorage.removeItem(tokenname);
    set({ isLoggedIn: false, user: null });
  },

  


  userdetails: () => {
    const token =  localStorage.getItem(tokenname);
    if (token) {
      return JSON.parse(window.atob(token.split('.')[1]));
    } else {
      return null;
    }
  },
}));

export default useAuth;


