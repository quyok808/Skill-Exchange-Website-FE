import React, { useState, useEffect } from "react";
import Toast from "../../utils/Toast";
import { motion } from "framer-motion";
import styles from "./RegisterButton.module.css";
import authService from "../../services/auth.service"; // Import authService
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import Avatar from "../Avatar";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterButton() {
  const [showModal, setShowModal] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [user, setUser] = useState(null); // State để lưu thông tin người dùng

  // State cho form đăng ký
  const [registerDisplayName, setRegisterDisplayName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  // State cho form đăng nhập
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Khởi tạo useNavigate

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((currentUser) => {
        if (currentUser && currentUser.data && currentUser.data.user) {
          // console.log("User photo:", currentUser.data.user.photo); // Truy cập đúng photo
          setUser(currentUser.data.user); // Lưu object user vào state
        }
      })
      .catch((error) => {
        console.log("Lỗi khi lấy thông tin người dùng:", error);
      });
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
    setRegisterError("");
    setLoginError("");
  };

  const showLoginForm = () => {
    setIsLoginForm(true);
    setShowModal(true);
  };

  const showRegisterForm = () => {
    setIsLoginForm(false);
    setShowModal(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");
    setIsLoading(true);

    if (registerPassword !== registerConfirmPassword) {
      setRegisterError("Mật khẩu và xác nhận mật khẩu không khớp.");
      setIsLoading(false); // Kết thúc loading nếu có lỗi
      return;
    }

    try {
      await authService.register(
        registerDisplayName,
        registerEmail,
        registerPassword,
        registerConfirmPassword
      );
      toggleModal(); // Ẩn modal sau khi đăng ký thành công
      navigate("/login"); // Chuyển đến trang login
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setRegisterError(message);
    } finally {
      setIsLoading(false); // Kết thúc loading dù thành công hay thất bại
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true); // Bắt đầu loading

    try {
      const response = await authService.login(loginEmail, loginPassword);
      setUser(response);
      toggleModal(); // Ẩn modal sau khi đăng nhập thành công
      setLoginEmail("");
      setLoginPassword("");
      navigate("/"); // Chuyển đến trang profile
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setLoginError(message);
    } finally {
      setIsLoading(false); // Kết thúc loading dù thành công hay thất bại
    }
  };

  const sendEmailGetPass = async () => {
    if (!loginEmail) {
      Toast.fire({
        icon: "error",
        title: "Vui lòng nhập địa chỉ email",
      });
      return;
    }

    setIsLoading(true); // Bắt đầu loading

    try {
      await authService.sendEmaiResetPass(loginEmail); // Giả sử đây là hàm gửi email
      Toast.fire({
        icon: "success",
        title: "Email đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra hộp thư.",
      });

      toggleModal(); // Ẩn modal sau khi gửi thành công
      setLoginEmail("");
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Lỗi khi gửi email đặt lại mật khẩu. Vui lòng thử lại!",
      });
      console.log("Lỗi trong khi gửi mail:", error);
    } finally {
      setIsLoading(false); // Kết thúc loading dù thành công hay thất bại
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null); // Xóa thông tin người dùng khỏi state
    navigate("/"); // Chuyển về trang chủ hoặc trang login
  };

  return (
    <>
      {/* Hiển thị avatar nếu người dùng đã đăng nhập */}
      {user ? (
        <Avatar onLogout={handleLogout} />
      ) : (
        <a href="#" className={styles.ctaButton} onClick={showLoginForm}>
          Đăng nhập
        </a>
      )}
      {/* Hiển thị component Loading khi isLoading là true */}
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000, // Đảm bảo nó ở trên cùng
          }}
        >
          <Loading />
        </div>
      )}
      {showModal && (
        <motion.div
          className={styles.modalOverlay}
          onClick={toggleModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "350px",
              textAlign: "left",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            {isLoginForm ? (
              <>
                <h2
                  style={{
                    textAlign: "center",
                    color: "#00bcd4",
                    fontWeight: "bold",
                    fontSize: "28px",
                  }}
                >
                  ĐĂNG NHẬP
                </h2>
                <form onSubmit={handleLogin}>
                  {loginError && (
                    <div style={{ color: "red", marginBottom: "10px" }}>
                      {loginError}
                    </div>
                  )}
                  <div style={{ marginBottom: "10px" }}>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <label>Mật khẩu</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showLoginPassword ? "text" : "password"} // Toggle giữa text và password
                        name="password"
                        required
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          padding: "0",
                          color: "#666",
                          outline: "none",
                          transition: "color 0.2s", // Hiệu ứng chuyển màu
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#000")} // Hover
                        onMouseLeave={(e) => (e.target.style.color = "#666")} // Rời chuột
                      >
                        {showLoginPassword ? (
                          <FaEyeSlash size={20} />
                        ) : (
                          <FaEye size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                  <p style={{ textAlign: "center" }}>
                    Chưa có tài khoản?{" "}
                    <a
                      href="#"
                      onClick={showRegisterForm}
                      style={{ color: "#00bcd4", fontWeight: "bold" }}
                    >
                      Đăng kí ngay!
                    </a>
                  </p>
                  <p style={{ textAlign: "center", marginBottom: "5px" }}>
                    Bạn quên mật khẩu?{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        sendEmailGetPass();
                      }}
                      style={{
                        color: "#00bcd4",
                        fontWeight: "bold",
                        pointerEvents: isLoading ? "none" : "auto", // Vô hiệu hóa click khi loading
                        opacity: isLoading ? 0.6 : 1, // Làm mờ nút khi loading
                      }}
                    >
                      {isLoading ? "Đang gửi..." : "Lấy lại mật khẩu!"}
                    </a>
                  </p>
                  {isLoading && (
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                      }}
                    >
                      <Loading />
                    </div>
                  )}
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#00bcd4",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    Đăng nhập
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2
                  style={{
                    textAlign: "center",
                    color: "#00bcd4",
                    fontWeight: "bold",
                    fontSize: "28px",
                  }}
                >
                  ĐĂNG KÍ TÀI KHOẢN
                </h2>
                <form onSubmit={handleRegister}>
                  {registerError && (
                    <div style={{ color: "red", marginBottom: "10px" }}>
                      {registerError}
                    </div>
                  )}
                  <div style={{ marginBottom: "10px" }}>
                    <label>Tên hiển thị</label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    >
                      <input
                        type="text"
                        name="name"
                        required
                        style={{ flex: 1, border: "none", padding: "8px" }}
                        value={registerDisplayName}
                        onChange={(e) => setRegisterDisplayName(e.target.value)}
                      />
                      <span style={{ padding: "8px" }}>📇</span>
                    </div>
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <label>Email</label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    >
                      <input
                        type="email"
                        name="email"
                        required
                        style={{ flex: 1, border: "none", padding: "8px" }}
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                      />
                      <span style={{ padding: "8px" }}>👤</span>
                    </div>
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <label>Mật khẩu</label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    >
                      <input
                        type="password"
                        name="password"
                        required
                        style={{ flex: 1, border: "none", padding: "8px" }}
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                      <span style={{ padding: "8px" }}>🔒</span>
                    </div>
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <label>Xác nhận mật khẩu</label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    >
                      <input
                        type="password"
                        name="confirmPassword"
                        required
                        style={{ flex: 1, border: "none", padding: "8px" }}
                        value={registerConfirmPassword}
                        onChange={(e) =>
                          setRegisterConfirmPassword(e.target.value)
                        }
                      />
                      <span style={{ padding: "8px" }}>👤</span>
                    </div>
                  </div>
                  <p style={{ textAlign: "center", marginBottom: "5px" }}>
                    Bạn đã có tài khoản?{" "}
                    <a
                      href="#"
                      onClick={showLoginForm}
                      style={{ color: "#00bcd4", fontWeight: "bold" }}
                    >
                      Đăng nhập ngay!
                    </a>
                  </p>
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#00bcd4",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    Đăng kí
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default RegisterButton;
