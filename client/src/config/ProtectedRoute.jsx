import React, { useEffect } from "react";

import Cookies from "js-cookie";
import Auth from "../pages/Auth";
import { useNavigate } from "react-router";

export const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token]);

  return <div>{children}</div>;
};
