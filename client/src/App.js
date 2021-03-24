import style from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import { Route, HashRouter, Switch } from "react-router-dom";
//import NotFound from "./components/404/NotFound";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faSearch);

function App() {
  return (
    <HashRouter>
      <div className={style.app}>
        <Header />
        <Switch>
          <div className={style.container}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </div>
        </Switch>
        <Footer />
      </div>
    </HashRouter>
  );

  //<HashRouter>
  //<div className="container">
  //    <Navbar/>
  //    <Switch>
  //        <Route path="/" exact component={isLoggedIn ? Home : GuestHome}/>
  //        <Route path="/movie/details/:id" exact component={Details}/>
  //        <Route path="/tv-show/details/:id" exact component={Details}/>
  //        <Route path="/register" exact component={Register}/>
  //        <Route path="/login" exact component={Login}/>
  //        <Route path="/movies" exact component={Categories}/>
  //        <Route path="/movies/:category" exact component={MoviesByCategory}/>
  //        <Route path="/results/:search" exaxt component={SearchResults}/>
  //        <Route path="/library" exaxt component={Library}/>
  //        <Route component={PageNotFound}/>
  //    </Switch>
  //</div>
  //<Footer/>
  //HashRouter>
}

export default App;
