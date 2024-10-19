// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// const decodeJWT = (token) => {
//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const jsonPayload = decodeURIComponent(atob(base64)
//     .split('')
//     .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
//     .join(''));
    
//   return JSON.parse(jsonPayload);
// };

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//       setUser(decodeJWT(token)); 
//     }
//   }, []);

//   const login = (user, token) => {
//     localStorage.setItem("token", token);
//     setUser(user);
//     setIsAuthenticated(true);

//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     setIsAuthenticated(false);
//   };
//   const redirectPath = location.state?.from || '/';

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout , redirectPath }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
