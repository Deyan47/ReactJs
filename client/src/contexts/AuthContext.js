import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function saveUserData(data) {
    const {
      user: { email, uid },
    } = data;
    return localStorage.setItem("user", JSON.stringify({ email, uid }));
  }

  function getUserData() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password).then((userData) => {
      saveUserData(userData);
    });
  }

  function logout() {
    return auth.signOut().then(() => {
      localStorage.removeItem("user");
      history.push("/");
    });
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    getUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
