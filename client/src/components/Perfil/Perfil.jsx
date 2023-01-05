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
            { infoTicket.length > 0? infoTicket.map(e => 
                e.paymentMade === true ? <img src={e.QR} alt= "" /> : <p>pending</p>
            
            ): <p>no tickets</p>}
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAK3SURBVO3BQW7sWAwEwSxC979yjpdcPUCQur/NYUT8wRqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoFw8l4ZtUTpJwotIloVPpkvBNKk8Ua5RijVKsUS5epvKmJNyh0iXhTSpvSsKbijVKsUYp1igXH5aEO1TuSMITKk8k4Q6VTyrWKMUapVijXAyn8n9SrFGKNUqxRrkYLgl3qPxlxRqlWKMUa5SLD1P5l1ROkvCEym9SrFGKNUqxRrl4WRL+JZUuCZ3KE0n4zYo1SrFGKdYoFw+p/GYqXRLuUPlLijVKsUYp1igXDyWhU+mS8CaVTuUOlS4JJ0l4k8onFWuUYo1SrFEuXpaEE5UuCZ3KHUm4Q+UOlS4JnUqXhE7lJAmdyhPFGqVYoxRrlPiDFyWhU7kjCU+onCShU+mS0KmcJOFEpUtCp/KmYo1SrFGKNUr8wQNJ6FS6JNyhcpKEE5VPSsITKp9UrFGKNUqxRrl4SOUOlZMknKh0SThJwolKl4ROpVPpktCp3JGETuWJYo1SrFGKNUr8wR+WhBOVLglPqJwkoVM5SUKn8kSxRinWKMUaJf7ggSR8k8pJEk5UuiR0Kl0STlROknCi8qZijVKsUYo1ysXLVN6UhJMk3JGEkyScqJwk4UTlk4o1SrFGKdYoFx+WhDtU3qRykoRO5SQJnUqncpKETuVNxRqlWKMUa5SLYVS6JHQq35SETuWTijVKsUYp1igXwyShU+mS0Kl0SehUOpUuCb9JsUYp1ijFGuXiw1Q+SeUkCZ3KicpJEk5UuiR8U7FGKdYoxRrl4mVJ+KYkdCqdSpeETqVLQqfSqXRJuCMJncqbijVKsUYp1ijxB2uMYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVij/AfHIxrbopbPrQAAAABJRU5ErkJggg==" />
        </div>
        
    )

};