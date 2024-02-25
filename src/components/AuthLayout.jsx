import React, { useState, useEffect } from "react";
import { UseSelector, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setIsLoading(false);
  }, [authStatus, navigate, authentication]);

  return isLoading ? <h2>Loading..</h2> : <>{children}</>;
}
