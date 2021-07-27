import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import firebase from 'firebase';

interface Context {
  currentUser: firebase.User | null;
  signUp: any;
  logIn: any;
  logOut: any;
  resetPassword: any;
  updateEmail: any;
  updatePassword: any;
}

const AuthContext = React.createContext<Context>({
  currentUser: null,
  signUp: null,
  logIn: null,
  logOut: null,
  resetPassword: null,
  updateEmail: null,
  updatePassword: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  function signUp(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function logIn(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logOut() {
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email: string) {
    return currentUser?.updateEmail(email);
  }

  function updatePassword(password: string) {
    return currentUser?.updatePassword(password);
  }

  const value: Context = {
    currentUser,
    signUp,
    logIn,
    logOut,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
