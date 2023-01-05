import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentHandler } from "../../Redux/actions";


export default function Perfil () {

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatchEvent(paymentHandler());

    },[dispatch]);


    const infoTicket = useSelector(s => s.dataPago);

    console.log("infoticket", infoTicket);

    return (

        <div>

            <h1>Perfil</h1>
            <p>{infoTicket}</p>
        </div>
        
    )

};