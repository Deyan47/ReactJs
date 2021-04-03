import style from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import Create from "./components/Create/Create";
import Dashboard from "./components/Dashboard/Dashboard";
import Offers from "./components/Offers/Offers";
import Profile from "./components/Profile/Profile";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import offerDetails from "./components/OfferDetails/OfferDetails";
import "./firebase/firebase";
import { AuthProvider } from "./contexts/AuthContext";

import { Route, HashRouter, Switch } from "react-router-dom";
//import NotFound from "./components/404/NotFound";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faSearch);

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <div className={style.app}>
          <Header />
          <Switch>
            <div className={style.container}>
              <Route path="/" exact component={Home} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/my-profile" component={Profile} />
              <Route path="/update-profile" component={UpdateProfile} />
              <Route path="/offers" component={Offers} />
              <Route
                path="/offers/details/:offerId"
                exact
                component={offerDetails}
              />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Signup} />
              <Route path="/create" component={Create} />
            </div>
          </Switch>
          <Footer />
        </div>
      </AuthProvider>
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
