// src/pages/Register.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      gender: "",
      email: "",
      password: "",
      profile_image: null,
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      gender: Yup.string().required("Gender is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      profile_image: Yup.mixed().required("Profile image is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      dispatch(registerUser(formData)).then((data) => {
        if (data.meta.requestStatus === "fulfilled") {
          resetForm();
          navigate("/login");
        }
      });
    },
  });

  return (
    <div className="bg-[#012647] min-h-screen flex items-center justify-center">
      <div className="max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#012647]">
          Register
        </h2>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          {/* First Name */}
          <div className="mb-4">
            <input
              name="first_name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
              className="w-full p-3 bg-white border-2 border-[#012647] rounded-lg"
              placeholder="First Name"
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.first_name}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <input
              name="last_name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
              className="w-full p-3 bg-white border-2 border-[#012647] rounded-lg"
              placeholder="Last Name"
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.last_name}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <select
              name="gender"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gender}
              className="w-full p-3 bg-white border-2 border-[#012647] rounded-lg"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.gender}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full p-3 bg-white border-2 border-[#012647] rounded-lg"
              placeholder="Email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full p-3 bg-white border-2 border-[#012647] rounded-lg"
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Profile Image */}
          <div className="mb-4">
            <input
              name="profile_image"
              type="file"
              onChange={(e) =>
                formik.setFieldValue("profile_image", e.currentTarget.files[0])
              }
              onBlur={formik.handleBlur}
              className="w-full p-3 bg-white border-2 border-[#012647] rounded-lg"
            />
            {formik.touched.profile_image && formik.errors.profile_image && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.profile_image}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-[#75000e] text-white font-bold rounded-lg mt-4 hover:bg-[#60000e]"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Server Error */}
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
