// Header.jsx
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

export default function Header( ) {
  const userData=useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const isAdmin = useMemo(() => {
    return userData && userData.user.role === "admin";
  }, [userData]);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm px-10">
      <div className="flex-1">
        <span className="btn btn-ghost text-xl">Event-Scheduler-App</span>
      </div>

      <div className="flex-none">
        {userData && <h2>{userData.user.name}</h2>}
        {userData && <div className="badge badge-primary mr-5">{isAdmin ? "admin" : "user"}</div>}

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

          {userData &&<ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-white rounded-box z-10 mt-3 w-52 p-2"
          >
            <li>
              <button onClick={handleLogout} className="w-full text-left text-black">
                Logout
              </button>
            </li>
          </ul>}
        </div>
      </div>
    </div>
  );
}
