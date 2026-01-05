import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const API_URL = "http://localhost:8080/api/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Simulate session check (later = /auth/me)
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const { user, token } = JSON.parse(storedAuth);
      setUser(user);
      setToken(token);
    }
    setLoading(false);
  }, []);
  const signUp = async (formData) => {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }



    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("auth", JSON.stringify(data));
    return data;
  };

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }



    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("auth", JSON.stringify(data));
    return data;
  };





  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
    setToken(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, signUp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
