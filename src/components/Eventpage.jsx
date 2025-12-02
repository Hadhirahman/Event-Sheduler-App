import React, { use } from 'react'
import EventForm from './EventForm'
import Calender from './Calender'
import EventList from './EventList';
import {dummyEvents} from '../data/dummyEvents';
import { useSelector } from 'react-redux';

function Eventpage() {

const userData=useSelector((store)=>store.user);

  return (
    <div className='mt-2 W-full flex justify-around '>
      {userData && userData.user.role !== "user" && <EventForm user={userData.user.name} />}

      <Calender  />
    </div>
  )
}
export default Eventpage