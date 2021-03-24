import style from "./Main.module.css";
//import { Link } from "react-router-dom";

const Main = () => {
  return (
    <main className={style.main}>
      <img src="/bgr.png" className={style.img}></img>
      <h1 id={style.p}>What are you looking for?</h1>

      <i class="fa fa-search"></i>
    </main>
  );
};
export default Main;
