import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  resetPassword,
  resetResetPasswordState,
} from "../features/auth/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { loading, message, error } = useSelector(
    (state) => state.auth.resetPassword
  );

  useEffect(() => {
    return () => {
      dispatch(resetResetPasswordState());
    };
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const res = await dispatch(
        resetPassword({ token, password: values.password })
      );
      if (res.meta.requestStatus === "fulfilled") {
        resetForm();
        navigate("/login");
      }
    },
  });

  return (
    <div className="bg-[#012647] min-h-screen flex items-center justify-center">
      <div className="min-w-4xl p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-[#012647] text-center">
          Reset Password
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[#012647] mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-md border text-black focus:outline-none focus:ring-2 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#75000e]"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-[#012647] mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-md border text-black focus:outline-none focus:ring-2 ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#75000e]"
              }`}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#75000e] text-white rounded-md hover:bg-[#60000e] disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
