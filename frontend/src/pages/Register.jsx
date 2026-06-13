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
        console.log(values);
        const response = await api.post("/auth/register", values);

        if (response.data.message) {
          alert("Registration Successful");
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        alert(error.response);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden flex">
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 bg-orange-500 text-white p-10 flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold">BookMyEvent 🎬</h1>

            <p className="mt-4 text-orange-100">
              Create an account and start booking movies.
            </p>
          </div>

          <div className="space-y-3">
            <p>🎟 Book tickets instantly</p>
            <p>🍿 Browse latest movies</p>
            <p>📱 Easy booking experience</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 flex items-center">
          <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
            <div>
              <h2 className="text-3xl font-bold">Create Account</h2>

              <p className="text-gray-500 mt-2">Join BookMyEvent today.</p>
            </div>

            <div>
              <label className="text-sm font-medium">Username</label>

              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full mt-1 border p-3 rounded-xl focus:outline-none focus:border-orange-500"
              />

              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </p>
              )}
            </div>

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
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-sm">
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
