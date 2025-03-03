// src/pages/NotFound.jsx
import React from "react";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.center}>
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
