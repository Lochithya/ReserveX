import axios from "axios";                          // for sending HTTP requests


const API = axios.create({                              // custom instance of axios with a base URL
  baseURL: "http://localhost:8080/api"
});

API.interceptors.request.use((req) => {                   // interceptor to add the JWT token to the Authorization header of each request
  
  const token = localStorage.getItem("token");          // retrieve the token from local storage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;



// token is automatically attached 