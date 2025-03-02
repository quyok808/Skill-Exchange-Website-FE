import styles from "./RegisterButton.module.css";

function RegisterButton() {
  return (
    <a href="/register" className={styles.ctaButton}>
      Đăng kí
    </a>
  );
}

export default RegisterButton;
