import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/auth/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  console.log(user);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow text-center">
      <img
        src={user?.profile_image}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-bold">
        {user?.first_name} {user?.last_name}
      </h2>
      <p>{user?.email}</p>
      <p>{user?.gender}</p>
    </div>
  );
};

export default Dashboard;
