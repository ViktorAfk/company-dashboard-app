import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem(ACCESS_TOKEN);
//     if (token) {
//       console.log(token);
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// api.interceptors.response.use(async (error) => {
//   const originalRequest = error.config as CustomAxiosRequestConfig;

//   // If the error status is 401 and there is no originalRequest._retry flag,
//   // it means the token has expired and we need to refresh it
//   if (error.status === 401 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     const refreshToken = localStorage.getItem(REFRESH_TOKEN);
//     try {
//       const response = await refresh({ refreshToken });
//       const { refreshToken, accessToken } = response.data;

//       localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
//       localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);

//       // Retry the original request with the new token
//       originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//       return axios(originalRequest);
//     } catch (error) {
//       console.error(`Request problem: ${error}`);
//       redirect('/login');
//     }
//   }

//   return Promise.reject(error);
// });
export default api;
