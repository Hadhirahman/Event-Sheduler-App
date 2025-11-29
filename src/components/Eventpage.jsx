import React from 'react'
import EventForm from './EventForm'
import Calender from './Calender'
import EventList from './EventList';
import {dummyEvents} from '../data/dummyEvents';

function Eventpage() {

  return (
    <div className='mt-2 W-full flex justify-around '>
      <EventForm/>
      <Calender  />
    </div>
  )
}

export default Eventpage
