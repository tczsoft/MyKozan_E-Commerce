// // src/Shared/Services/Store/AuthContext.js
// import React, { createContext, useContext, useState } from 'react';

// // Create a context for authentication
// const AuthContext = createContext();

// // Create a provider component
// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false); // or fetch from local storage or API

//     const login = () => setIsAuthenticated(true);
//     const logout = () => setIsAuthenticated(false);

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use the AuthContext
// export const useAuth = () => {
//     return useContext(AuthContext);
// };

