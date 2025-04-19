import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  resetForgotPasswordState,
} from "../features/auth/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state) => state.auth.forgotPassword
  );

  useEffect(() => {
    return () => {
      dispatch(resetForgotPasswordState());
    };
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const res = await dispatch(forgotPassword(values.email));
      if (res.meta.requestStatus === "fulfilled") {
        resetForm();
      }
    },
  });

  return (
    <div className="bg-[#012647] min-h-screen flex items-center justify-center">
      <div className="min-w-4xl p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-[#012647] text-center">
          Forgot Password
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#012647] mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-md border text-black focus:outline-none focus:ring-2 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#75000e]"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#75000e] text-white rounded-md hover:bg-[#60000e] disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {message && (
            <div className="text-green-500 text-sm text-center">{message}</div>
          )}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
