import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.item}>
            <img src="/images/flight.png" width={"55px"} alt=""/>
        </div>
        <div className={styles.name}>SOTERIA</div>
      </div>
    </div>
  );
};

export default Header;
