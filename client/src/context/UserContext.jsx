import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import Cookies from "js-cookie";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchUsers = useCallback(async () => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      const storedEmail = localStorage.getItem("UserEmail");
      const userEmail = storedEmail ? JSON.parse(storedEmail).email : null;

      const response = await axios.get(`${backendUrl}/api/auth/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allUsers = response?.data?.user || [];
      const filteredUsers = allUsers?.filter((u) => u.email !== userEmail);

      setUsers(filteredUsers);
    } catch (error) {
      console.log("fetch users error:-", error);
    }
  }, [backendUrl]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, [fetchUsers]);

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  return useContext(UserContext);
};