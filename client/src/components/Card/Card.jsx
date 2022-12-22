import React from 'react'
import {Link} from 'react-router-dom'
import './card.css'


export default function Card({event}) {
  return (
    <div className='eventCard'>
        <Link to={'/home/' + event.id}>
          <img src={event.image} alt={event.name} width={230} height={145} />
          <h3>{event.name}</h3>
          <h5>{event.date}</h5>
        </Link>
    </div>
  )
}
