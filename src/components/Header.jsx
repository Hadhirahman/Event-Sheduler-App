import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
function Header() {
  const [isAdmin, setIsAdmin] = useState(true);

  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

 

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });

      dispatch(removeUser())
      navigate("/login");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300   shadow-sm px-10">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Event-Sheduler-App</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end px-5">
          <div >
            <div >
              <div className="badge badge-primary">{!isAdmin ? "user" : "admin"}</div>
            </div>
          </div>

        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-blue-200 rounded-box z-1 mt-3 w-52 p-2 ">
        <li>
  <button onClick={handleLogout}>Logout</button>
</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
