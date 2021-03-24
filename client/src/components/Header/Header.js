import style from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={style.header}>
      <img className={style.image} src="/logo.png" />

      <h1 className={style.h1}>Job Hunter</h1>
      <p className={style.p}>Get your dream job</p>

      <nav className={style.nav}>
        <ul className={style.ul}>
          <li className={style.li}>
            <Link
              to="/"
              className={style.link}
              style={{ textDecoration: "none" }}
            >
              Home
            </Link>
          </li>

          <li className={style.li}>
            <Link
              to="/offers"
              className={style.link}
              style={{ textDecoration: "none" }}
            >
              Offers
            </Link>
          </li>

          <li className={style.li}>
            <Link
              to="/dashboard"
              className={style.link}
              style={{ textDecoration: "none" }}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>

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

        {/* След като сме се логнали */}
        <div className={style.IsLogged}>
          <Link
            to="/myprofile"
            className={style.MyProfile}
            style={{ textDecoration: "none" }}
          >
            <img id={style.user_img} src="/user_logo.png" />
            <p id={style.MyProfile}>My Profile</p>
          </Link>

          <Link
            to="/logout"
            className={style.btn}
            id={style.logout}
            style={{ textDecoration: "none" }}
          >
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
