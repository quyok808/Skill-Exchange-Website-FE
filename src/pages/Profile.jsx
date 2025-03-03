// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import authService from "../services/auth.service";

function Profile() {
  const { state } = useLocation(); // Lấy state từ navigate
  const user = state?.user; // Lấy object user từ state
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    authService
      .getAvatar()
      .then((response) => {
        if (response && response.data) {
          setAvatar(response.data.image); // Dùng trực tiếp Base64
        }
      })
      .catch((error) => {
        console.log("Lỗi khi lấy ảnh:", error);
      });
  }, [avatar]);

  return (
    <div className=" p-8 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg">
        <div className="profile-card bg-white rounded-lg shadow-lg p-6 text-center">
          <img
            src={
              avatar ||
              "https://i.pinimg.com/736x/b1/b5/6b/b1b56b9e9b21ad32cff1028882cb8245.jpg"
            }
            alt="Ảnh đại diện"
            className="profile-pic w-36 h-36 rounded-full object-cover mx-auto mb-5"
          />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {user.name}
          </h1>

          <div className="info mb-5 text-left">
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              Thông tin cá nhân
            </h2>
            <p className="text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-700">
              <strong>Số điện thoại:</strong> 0123 456 789
            </p>
            <p className="text-gray-700">
              <strong>Địa chỉ:</strong> Hà Nội, Việt Nam
            </p>
          </div>

          <div className="skills mb-5 text-left">
            <h2 className="text-xl font-medium text-gray-800 mb-2">Kỹ năng</h2>
            <ul className="space-y-2">
              {user.skills.map((skill, index) => (
                <li key={index} className="bg-gray-200 p-2 rounded-md">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="contact text-left">
            <h2 className="text-xl font-medium text-gray-800 mb-2">Liên hệ</h2>
            <a
              href="#"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Gửi tin nhắn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
