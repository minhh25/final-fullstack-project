import { Link } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx"

export default function SignIn() {
  return (
    <>
    <Header/>
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left form */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-10">
        
            <h1 className="text-2xl font-bold mb-2">
              Sign in to your account
            </h1>
            <p className="text-sm text-gray-600">
              Not a member?{" "}
              <Link to="/signup" className="text-indigo-600 font-medium">
                Sign Up Now
              </Link>
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Email address
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <Link to="#" className="text-indigo-600 font-medium">
                Forgot password?
              </Link>
            </div>

            <button className="w-full bg-indigo-600 text-white py-2.5 rounded-md font-medium hover:bg-indigo-700 transition">
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-500">Or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* OAuth buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50">
              <FaGoogle />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50">
              <FaGithub />
              GitHub
            </button>
          </div>
        </div>
      </div>

      {/* Right image */}
      <div className="hidden lg:block">
        <img
          src="https://static.wixstatic.com/media/84770f_ffdce1fd609a4073b20b39d85f671fe4~mv2.jpg/v1/fill/w_497,h_517,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/84770f_ffdce1fd609a4073b20b39d85f671fe4~mv2.jpg"
          alt="Workspace"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    <Footer/>
    </>
  );
}
