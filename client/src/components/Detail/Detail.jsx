import React, { useEffect, useState }from 'react';
import { searchEventById } from '../../Redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import {  useHistory, useParams } from 'react-router-dom';
import { payCrypto } from '../../Redux/actions';

export default function Detail() {
  const eventShowed = useSelector(state => state.events)
  const history = useHistory()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    dispatch(searchEventById(id))
  }, [id, dispatch])


  function handleBack() {
    eventShowed.shift()
    return history.goBack()
  }
  // console.log(eventShowed[0])

  function submitData (e){

    if(e.precio === "Entrada Liberada"){

      return history.push("/");
    };

    /*
    precio: e.precio, cantidad: cantidad,date: eventShowed[0].date,
    */
    let arr = [];

    arr.push( e.tipoDeTicket, "$ "+ e.precio,"cantidad: "+ cantidad + " ticket", eventShowed[0].date[0],"Ubicacion: "+ eventShowed[0].location, eventShowed[0].description )

    console.log(arr.join(" "));

    const datosPago = {
      
      total: Math.ceil(Number(e.precio) * cantidad / 330),
      name: eventShowed[0].name,
      description: arr.join(" "),

      // img: eventShowed[0].image,
      // user:
      // id_user:
    };

    return dispatch(payCrypto(datosPago));

  };


  function changeCantidad (e){

    setCantidad(e.target.value)
  }

  return (
    <div>

      <div>
        <button onClick={handleBack}>
          BACK
        </button>
      </div>

      <div>
        <div>
          <img src={eventShowed[0].image} alt= "" />
        </div>

        <div>
          <p>{eventShowed[0].name}</p>
          <p>Date: {eventShowed[0].date}</p>
          <p>Location: {eventShowed[0].location}</p>
         {
          eventShowed[0].price.length > 0? eventShowed[0].price.map((e, i) => 
            <div key={i}>
              
              <p>Type Ticket: {e.tipoDeTicket}</p>
              {e.precio === "Entrada Liberada" ? <p>Price: Free</p> :<p>Price: ${Number(e.precio) * cantidad} | U$D {Math.ceil(Number(e.precio) * cantidad / 330)}</p>}
              <button onClick={()=>submitData(e)}>comprar</button>
              <input type={"text"} placeholder={"cantidad de tickets"} value={cantidad} onChange={(e)=>changeCantidad(e)} />
              
            </div>
            
          ) : 
          <p>Tickets Sold Out  :´(</p>
         }
        </div>

      </div>
      <div>
        <p>Description evvent: {eventShowed[0].description}</p>
      </div>
    </div>
  )
}
