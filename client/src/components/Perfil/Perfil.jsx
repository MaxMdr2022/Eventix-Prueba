import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentHandler } from "../../Redux/actions";


export default function Perfil () {

    const dispatch = useDispatch();
    const userId = 01


    useEffect(()=> {
        dispatch(paymentHandler(userId));

    },[dispatch]);


    const infoTicket = useSelector(s => s.dataPago);

    console.log("infoticket", infoTicket);

    return (

        <div>

            <h1>Perfil</h1>
            <p>TICKETS:</p>
            { infoTicket? infoTicket.map(e => {
                e.paymentMade === true ? <img src={e.QR} alt= "" /> : <p>pending</p>
            
            }): <p>no tickets</p>}
        </div>
        
    )

};