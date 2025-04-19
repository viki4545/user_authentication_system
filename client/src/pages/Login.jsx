// src/pages/Login.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values)).then((data) => {
        if (data.meta.requestStatus === "fulfilled") {
          localStorage.setItem("token", data.payload.token);
          navigate("/dashboard");
        }
      });
    },
  });

  return (
    <div className="bg-[#012647] min-h-screen flex items-center justify-center">
      <div className="min-w-2xl p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-[#012647] text-center">
          Login
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full p-3 bg-[#ffffff] border-2 border-[#012647] rounded-lg"
              placeholder="Email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full p-3 bg-[#ffffff] border-2 border-[#012647] rounded-lg"
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#75000e] text-white font-bold rounded-lg mt-4 hover:bg-[#60000e]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <a
              href="/forgot-password"
              className="text-[#75000e] text-sm hover:text-[#60000e]"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
