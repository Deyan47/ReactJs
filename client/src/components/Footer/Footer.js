import React from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { Link } from "react-router-dom";
import style from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.social}>
        <p className={style.email}>
          <p className={style.symbol}>&#9993;</p> JobHunter@gmail.com
        </p>
        <p className={style.phone}>
          <p className={style.symbol}>&#9743;</p> 0895154588
        </p>
      </div>
      <p className={style.copyright}>
        Copyright © 2021 Deyan Yonkov. All rights reserved.
      </p>
      <div></div>
    </footer>
  );
};
export default Footer;
//Your <FontAwesomeIcon icon="search" /> is hot and ready!
