import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get(BASE_URL+"/auth/check",{},{withCredentials:true})  // backend endpoint to verify cookie
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <p>Loading...</p>;

  if (!auth) return <Navigate to="/login" replace />;

  return children;
}
