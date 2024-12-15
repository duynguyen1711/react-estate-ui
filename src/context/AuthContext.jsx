import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import apiRequest from '../lib/apiRequest';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Lấy thông tin user từ localStorage khi khởi tạo
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  const updateUser = (data) => {
    setCurrentUser(data);
    if (data) {
      localStorage.setItem('user', JSON.stringify(data)); // Lưu user vào localStorage
    } else {
      localStorage.removeItem('user'); // Xóa user khi logout
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await apiRequest.get('/auth/verify-token');
        console.log(response.data);
        if (response.data.isLogin === true) {
          // Assuming the response contains token info
          const user = JSON.parse(localStorage.getItem('user'));
          if (user) {
            setCurrentUser(user);
          }
        } else {
          // Nếu không có token hợp lệ, xóa currentUser và yêu cầu đăng nhập
          setCurrentUser(null);
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setCurrentUser(null);
        localStorage.removeItem('user');
      }
    };
    checkToken(); // Call the async function
    const intervalId = setInterval(() => {
      checkToken();
    }, 300000); // 5 minutes (300000ms)

    return () => {
      clearInterval(intervalId); // Cleanup on unmount to clear the interval
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
