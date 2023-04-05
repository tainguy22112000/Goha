export const setToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

export const setUser = (user) => localStorage.setItem("user", user);
export const getUser = () => localStorage.getItem("user");
export const removeUser = () => localStorage.removeItem("user");
