import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h1 className="text-2xl font-bold mb-2">
                Create your account
              </h1>
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/signin" className="text-indigo-600 font-medium">
                  Sign in
                </Link>
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-4 py-2 rounded-md"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-4 py-2 rounded-md"
                required
              />

              <button className="w-full bg-indigo-600 text-white py-2.5 rounded-md">
                Create account
              </button>
            </form>

            
          </div>
        </div>

        <div className="hidden lg:block">
          <img
            src="https://static.wixstatic.com/media/84770f_ffdce1fd609a4073b20b39d85f671fe4~mv2.jpg"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
