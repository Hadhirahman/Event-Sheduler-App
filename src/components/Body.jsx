import React from 'react'
import { useEffect } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';




function Body() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
 const fetchUser = async () => {
    if (userData && !userData==null) return;
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      if (err.status === 401) {
        navigate("/");
      }
    }
  };


  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <div>
      <Header user={userData} />
      <Outlet />
    </div>
  )
}

export default Body
