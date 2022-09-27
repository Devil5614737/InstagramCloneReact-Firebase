import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { PostContextProvider } from "./context/PostContext";
import { auth } from "./lib/firebase";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      } else if (!user) {
        navigate("/");
      }
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      <AuthContextProvider>
        <PostContextProvider>
          <Routes>
            {!auth.currentUser ? (
              <Route path="/" element={<Login />} />
            ) : (
              <Route path="/dashboard" element={<Dashboard />} />
            )}
            <Route path="/signup" element={<Signup />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </PostContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
