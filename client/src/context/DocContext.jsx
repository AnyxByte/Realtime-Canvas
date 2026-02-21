import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import Cookies from "js-cookie";

const DocContext = createContext(null);

export const DocProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [docs, setDocs] = useState([]);

  const fetchDocs = useCallback(async () => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      const response = await axios.get(`${backendUrl}/api/docs/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocs(response.data.doc);
    } catch (error) {
      console.log("fetchDocs error", error);
    }
  }, [backendUrl]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  return (
    <DocContext.Provider
      value={{
        fetchDocs,
        docs,
        setDocs,
      }}
    >
      {children}
    </DocContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDoc = () => useContext(DocContext);
