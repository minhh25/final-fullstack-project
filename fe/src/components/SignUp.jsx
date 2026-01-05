import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";


export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(form);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }

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
                type="text"
                placeholder="Username"
                onChange={e => setForm({ ...form, username: e.target.value })}
                className="w-full border px-4 py-2 rounded-md"
                required
              />

              <input
                type="email"
                placeholder="Email"
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border px-4 py-2 rounded-md"
                required
              />

              <input
                type="password"
                placeholder="Password"
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full border px-4 py-2 rounded-md"
                required
              />

              <input
                placeholder="Address"
                onChange={e => setForm({ ...form, address: e.target.value })}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
              <input
                placeholder="Phone"
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full border px-4 py-2 rounded-md"
                required />

              <button className="w-full bg-indigo-600 text-white py-2.5 rounded-md">
                Create account
              </button>
            </form>
             {error && <p className="text-red-600 text-sm mt-4">{error}</p>}


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
