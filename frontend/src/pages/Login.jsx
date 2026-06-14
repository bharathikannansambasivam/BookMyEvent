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
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: response.data.user.username,
          })
        );
        if (response.data.message === "Login Success") {
          navigate("/movies");
        }
      } catch (error) {
        alert(error.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex">
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-orange-400 to-orange-500 p-10 flex-col justify-between text-white">
          <div>
            <h1 className="text-5xl font-bold">BookMyEvent</h1>

            <p className="mt-4 text-orange-100 text-lg">
              Book movie tickets in seconds.
            </p>
          </div>

          <div className="space-y-4 text-lg">
            <p>🎟 Easy Ticket Booking</p>
            <p>🍿 Browse Latest Movies</p>
            <p>📱 Mobile Friendly Experience</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-3/5 p-8 md:p-12 flex items-center bg-zinc-900">
          {" "}
          <form onSubmit={formik.handleSubmit} className="w-full space-y-5">
            <div>
              <h2 className="text-4xl font-bold text-white">Welcome Back</h2>

              <p className="text-zinc-400 mt-2">
                Login to continue booking movies.
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-zinc-300">Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="
                w-full
                mt-2
                bg-zinc-800
                border
                border-zinc-700
                text-white
                p-3
                rounded-xl
                focus:outline-none
                focus:border-orange-500
              "
              />

              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-zinc-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="
                w-full
                mt-2
                bg-zinc-800
                border
                border-zinc-700
                text-white
                p-3
                rounded-xl
                focus:outline-none
                focus:border-orange-500
              "
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
              className="
              w-full
              bg-orange-500
              hover:bg-orange-600
              text-white
              py-3
              rounded-xl
              font-semibold
              transition-all
            "
            >
              {isLoading ? "Logging In..." : "Login"}
            </button>

            <p className="text-center text-sm text-zinc-400">
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
