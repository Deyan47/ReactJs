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
import PrivateRoute from "./PrivateRoute/PrivateRoute";

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
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute path="/my-profile" component={Profile} />
              <Route path="/update-profile" component={UpdateProfile} />
              <PrivateRoute exact path="/offers" component={Offers} />
              <Route path="/offers/details/:offerId" component={offerDetails} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Signup} />
              <PrivateRoute path="/create" component={Create} />
            </div>
          </Switch>
          <Footer />
        </div>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
