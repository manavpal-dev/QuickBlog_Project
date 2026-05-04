import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { axios, setToken } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Api integration for admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-sm p-6 max-md:m-6 border border-indigo-400 shadow-xl shadow-indigo-300 rounded-lg">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-blue-400">Admin </span> Login
            </h1>
            <p className="font-light">
              Enter your credential to access the admin panel
            </p>
          </div>

          {/* Form Section for login */}
          <form
            className="mt-6 w-full sm:max-w-md text-gray-600"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex flex-col ">
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                type="text"
                name="email"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                placeholder="your email id"
              />
            </div>

            <div className="flex flex-col">
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                type="password"
                name="password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                placeholder="your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 font-medium bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
