import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { loginSchema } from "../validations/loginSchema";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const response = await api.post("/auth/login", values);

        if (response.data.message === "Login Success") {
          navigate("/");
        }
      } catch (error) {
        alert(error.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden flex">
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 bg-orange-400 text-white p-10 flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold">BookMyEvent 🎬</h1>

            <p className="mt-4 text-orange-100">
              Book movie tickets in seconds.
            </p>
          </div>

          <div className="space-y-3">
            <p>🎟 Easy Ticket Booking</p>
            <p>🍿 Browse Latest Movies</p>
            <p>📱 Mobile Friendly Experience</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 flex items-center">
          <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
            <div>
              <h2 className="text-3xl font-bold">Welcome Back</h2>

              <p className="text-gray-500 mt-2">
                Login to continue booking movies.
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full mt-1 border p-3 rounded-xl focus:outline-none focus:border-orange-500"
              />

              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full mt-1 border p-3 rounded-xl focus:outline-none focus:border-orange-500"
              />

              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-400 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
            >
              {isLoading ? "Logging In..." : "Login"}
            </button>

            <p className="text-center text-sm">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-orange-500 cursor-pointer font-medium"
              >
                Register
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
