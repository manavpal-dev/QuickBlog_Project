import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  // This is function for fetching the blog, Api integration ---> /api/blog/all
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");

      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // useEffect for rendering the blogs
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `${storedToken}`;
    }
    fetchBlogs();
  }, []);

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    fetchBlogs,
    setInput,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
