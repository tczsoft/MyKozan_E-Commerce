export const tokenkey = "MYKOZANSECRET";

export const gettoken = () => {
  const token = localStorage.getItem(tokenkey);
  return token;
};

export const isLoggedIn = () => {
  return gettoken() ? true : false;
};

export const settoken = (token) => {
  return localStorage.setItem(tokenkey, token);
};

export const getuserdetails = () => {
  const token = gettoken();
  console.log(token);
  if (token != null) {
    try {
      const userData = JSON.parse(window.atob(token.split(".")[1]));
      return userData;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  } else {
    return null;
  }
};

export const removetoken = () => {
  return localStorage.removeItem(tokenkey);
};
