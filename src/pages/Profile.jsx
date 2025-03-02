// src/pages/Profile.jsx
import React from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const { userId } = useParams(); // Lấy tham số userId từ URL

  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {userId}</p>
      {/* Hiển thị thông tin người dùng dựa trên userId */}
    </div>
  );
}

export default Profile;
