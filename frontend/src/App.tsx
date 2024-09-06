import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Editor from "./components/Editor";

// FRONTEND

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute component={<Home />} />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
}

const ProtectedRoute = ({ component }: { component: JSX.Element }) => {
  const authContext = React.useContext(AuthContext);
  console.log("authContext:", authContext);

  if (authContext === undefined) {
    return <div>Loading...</div>;
  }

  return authContext.isAuthenticated ? component : <Navigate to="/login" />;
};

export default App;
