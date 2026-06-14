import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { registerSchema } from "../validations/registerSchema";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validationSchema: registerSchema,

    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const response = await api.post("/auth/register", values);

        if (response.data.message) {
          alert("Registration Successful");
          navigate("/login");
        }
      } catch (error) {
        alert(error.response?.data?.message || "Registration Failed");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex">
        {/* Left Side */}
        <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-orange-400 to-orange-500 p-10 flex-col justify-between text-white">
          <div>
            <h1 className="text-5xl font-bold">BookMyEvent</h1>

            <p className="mt-4 text-orange-100 text-lg">
              Create an account and start booking movies.
            </p>
          </div>

          <div className="space-y-4 text-lg">
            <p>Book tickets instantly</p>
            <p>Browse latest movies</p>
            <p>Easy booking experience</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-3/5 p-8 md:p-12 flex items-center bg-zinc-900">
          <form onSubmit={formik.handleSubmit} className="w-full space-y-5">
            <div>
              <h2 className="text-4xl font-bold text-white">Create Account</h2>

              <p className="text-zinc-400 mt-2">Join BookMyEvent today.</p>
            </div>

            {/* Username */}
            <div>
              <label className="text-sm font-medium text-zinc-300">
                Username
              </label>

              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formik.values.username}
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

              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </p>
              )}
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
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-orange-500 cursor-pointer font-medium"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
