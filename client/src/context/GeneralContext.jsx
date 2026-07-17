import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";

const GeneralContext = createContext(null);

export const useGeneral = () => useContext(GeneralContext);

export const GeneralProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        try {
          const res = await axiosInstance.get("/auth/profile");
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        } catch {
          logout();
        }
      }
      setLoading(false);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const updateBalance = (balance) => {
    setUser((prev) => {
      const next = { ...prev, balance };
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <GeneralContext.Provider
      value={{ user, token, loading, login, logout, updateBalance, isAdmin: user?.role === "admin" }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
