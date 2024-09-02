import React, { useEffect } from "react";
import { logoutUser } from "../service/service";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    // Call the logout service
    const response = await logoutUser();
    if (response.loggedOut) {
      navigate("/login");
    } else {
      navigate("/");
      console.error("Error logging out");
    }
  };

  useEffect(() => {
    (async () => {
      await logout();
    })();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      Login out..
    </div>
  );
};

export default Logout;
