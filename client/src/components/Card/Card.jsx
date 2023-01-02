import React from 'react'
import {Link} from 'react-router-dom'
import './card.css'


export default function Card({event}) {


  let price = event.price.length? event.price.map(e => e.precio) : ["Tickets Sold Out  :´("];
  let free = price?.filter(e => e === "Entrada Liberada");
  let minPrice = free.length? "FREE" : price[0] === "Tickets Sold Out  :´("? price[0] : Math.min(...price);


  return (
    <div className='eventCard'>
        <Link to={'/home/' + event.id}>
          <img src={event.image} alt={event.name} width={230} height={145} />
          <h3>{event.name}</h3>
          <h5>{event.date}</h5>
          {typeof minPrice === "string"? <h5>Price: {minPrice}</h5> : <h5>Price: $ {minPrice}</h5>}
        </Link>
    </div>
  )
}
