// eslint-disable-next-line no-unused-vars
import React from "react";
import styles from "./Header.module.css";
import logo from "/skill_exchange_logo.svg";
import { FaHome, FaSearch, FaCalendar, FaUserFriends } from "react-icons/fa";
import RegisterButton from "../RegisterButton";

function Header() {
  return (
    <div className={styles.sidebar}>
      <a href="/">
        <img src={logo} alt="Logo" className={styles.logo} />
      </a>
      <ul className={styles.navbar}>
        <li>
          <a href="/">
            <FaHome />
            Trang chủ
          </a>
        </li>
        <li>
          <a href="#">
            <FaSearch />
            Tìm kiếm
          </a>
        </li>
        <li>
          <a href="#">
            <FaCalendar />
            Lịch
          </a>
        </li>
        <li>
          <a href="#">
            <FaUserFriends />
            Bạn bè
          </a>
        </li>
      </ul>
      <RegisterButton />
    </div>
  );
}
export default Header;
