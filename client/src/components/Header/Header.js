import style from "./Header.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import React, { useEffect } from "react";

const Header = () => {
  const { getUserData } = useAuth();

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <header className={style.header}>
      <Link to="/">
        <img className={style.image} src="/logo.png" alt="JobHunterLogo" />
      </Link>
      <h1 className={style.h1}>Job Hunter</h1>
      <p className={style.p}>Get your dream job</p>
      <nav className={style.nav}>
        <ul className={style.ul}>
          {getUserData() !== null ? (
            <>
              <li className={style.li}>
                <Link
                  to="/"
                  className={style.link}
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
              </li>
              {getUserData().uid === "gYt1IBKURQY1Vo1gbjPuy3jWAv43" ? (
                <li className={style.li}>
                  <Link
                    to="/create"
                    className={style.link}
                    style={{ textDecoration: "none" }}
                  >
                    Create
                  </Link>
                </li>
              ) : null}

              <li className={style.li}>
                <Link
                  to="/offers"
                  className={style.link}
                  style={{ textDecoration: "none" }}
                >
                  Offers
                </Link>
              </li>
              {getUserData().uid !== "gYt1IBKURQY1Vo1gbjPuy3jWAv43" ? (
                <li className={style.li}>
                  <Link
                    to="/dashboard"
                    className={style.link}
                    style={{ textDecoration: "none" }}
                  >
                    Dashboard
                  </Link>
                </li>
              ) : null}

              <div className={style.IsLogged}>
                <Link
                  to="/my-profile"
                  className={style.MyProfile}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    id={style.user_img}
                    src="/user_logo.png"
                    alt="userLogo"
                  />
                  <p id={style.MyProfile}>My Profile</p>
                </Link>
              </div>
            </>
          ) : (
            <ul>
              <div className={style.btnContainer}>
                <Link
                  to="/login"
                  className={style.btn}
                  id={style.login}
                  style={{ textDecoration: "none" }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={style.btn}
                  style={{ textDecoration: "none" }}
                >
                  Register
                </Link>
              </div>
            </ul>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
