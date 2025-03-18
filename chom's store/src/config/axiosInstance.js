import axios from "axios";
import { store } from "../redux/store";
import { logOutSuccess } from "../redux/authSlice";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_LOCAL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Đảm bảo gửi cookie
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            try {
                await axios.post(
                    `${import.meta.env.VITE_API_LOCAL}auth/logout`,
                    {},
                    { withCredentials: true }
                );
            } catch (logoutError) {
                console.error("❌ Lỗi khi gọi API logout:", logoutError);
            }

            store.dispatch(logOutSuccess()); // Cập nhật Redux
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
