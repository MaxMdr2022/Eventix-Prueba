import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentHandler } from "../../Redux/actions";


export default function Perfil () {

    const dispatch = useDispatch();
    const userId = 1


    useEffect(()=> {
        dispatch(paymentHandler(userId));

    },[dispatch]);


    const infoTicket = useSelector(s => s.dataPago);

    console.log("infoticket", infoTicket);

    return (

        <div>

            <h1>Perfil</h1>
            <p>TICKETS:</p>
           {/* { infoTicket.length > 0? infoTicket.map(e => 
                e.ticket.paymentMade === true ? <img src={e.QR} alt= "" /> : <p>pending</p>
            
           ): <p>no tickets</p>}*/}

           
           {
            infoTicket.map(e =>
            
            <div>
                <p>Event: {e.ticket.event}</p>

                <img src={e.QR} />
            </div>
            )}
           {/*infoTicket?  <img src={infoTicket} /> : <p>no tickets</p>*/}

        </div>
        
    )

};