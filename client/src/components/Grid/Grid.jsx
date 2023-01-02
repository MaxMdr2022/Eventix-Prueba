import React, { useState } from "react";
import "./grid.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllEventList, getAllEvents } from "../../Redux/actions";
import Card from "../Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import styled, { keyframes } from "styled-components";
import Loading from "../Loading/Loading";
import { Carousel } from "react-responsive-carousel";



export default function Grid() {
  const dispatch = useDispatch();


  // const next = () => {
  //   setPage((prevPage) => prevPage + 1);
  // };

  useEffect(() => {
    dispatch(getAllEventList());

  }, [dispatch]);


  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const Events = useSelector((state) => state.events);
  const err = useSelector(s=> s.error);
  const filtered = useSelector(s => s.filtrado);

  const eventsFilter18 = Events.filter( e => e.name?.includes("(+"));
  const eventsFilter17 = Events.filter( e => !e.name?.includes("(+"));

  let arrGenre = Events.map(e => e.typeEvent?.genre);
  const genres = new Set(arrGenre.flat());
  let arrayGenres = [...genres];
 

  

  //-----------------------------------------------------
  let Events2 = []

  for (let i = 0; i < Events.length; i += 5) {
    let arr = Events.slice(i, i + 5);
    Events2?.push(arr);
  }
  // console.log("Arreglo: ", Events2);

  //-----------------------------------------------------
  let Events18 = []

  for (let i = 0; i < eventsFilter18.length; i += 3) {
    let arr = eventsFilter18.slice(i, i + 3);
    Events18?.push(arr);
  }
  // console.log("Arreglo: ", Events18);
  //-----------------------------------------------------
  let Event17 = []

  for (let i = 0; i < eventsFilter17.length; i += 5) {
    let arr = eventsFilter17.slice(i, i + 5);
    Event17?.push(arr);
  }
  // console.log("Arreglo: ", Events2);

  //-----------------------------------------------------
  let EventsFiltered = []

  for (let i = 0; i < filtered.length; i += 5) {
    let arr = filtered.slice(i, i + 5);
    EventsFiltered?.push(arr);
  }
  // console.log("Arreglo: ", Events2);

  //-----------------------------------------------------
 
  if(err.length >0){

    return (
      <p className="err">EVENT NOT FOUND</p>
    )
  };


  if(filtered.length > 0){

    return (
      filtered.length ? (
      <Carousel>
        {
          EventsFiltered.map( (eventos,i) => 
            
            <div key={i} className="contenedor">
      
              { 
                eventos.map((event,i) => {
                  return <Card event={event} key={i} />
                })
              }
            
            </div>
          )
        
        }
      </Carousel>
      ): <Loading/>
    )
    
    
  };
  //----------------------------------------------------
  return(

    Events.length ? (
    <div>
      
      
      <p>All events</p>

      <Carousel>
        {
          Events2.map( (eventos,i) => 
            
            <div key={i} className="contenedor">
      
              { 
                eventos.map((event,i) => {
                  return <Card event={event} key={i} />
                })
              }
            
            </div>
          )
        
        }
      </Carousel>
      
        <div>

          <p>events +18</p>

          <Carousel>
            {
              Events18.map( (eventos,i) => 
                
                <div key={i} className="contenedor">
          
                  { 
                    eventos.map((event,i) => {
                      return <Card event={event} key={i} />
                    })
                  }
                
                </div>
              )
            
            }
          </Carousel>
        </div>
      
      

      <p>events -18</p>

      <Carousel>
        {
          Event17.map( (eventos,i) => 
            
            <div key={i} className="contenedor">
      
              { 
                eventos.map((event,i) => {
                  return <Card event={event} key={i} />
                })
              }
            
            </div>
          )
        
        }
      </Carousel>  

      {
        arrayGenres.map(genero => {
          
          let eventFil = Events.filter( e => e.typeEvent?.genre === genero);
          // console.log( "eventmap",eventFil);
          let EventsGenre = []

          for (let i = 0; i < eventFil.length; i += 5) {
            let arr = eventFil.slice(i, i + 5);
            EventsGenre?.push(arr);
          }
          // console.log("Arreglo: ", Events2);


          return(<div>

            <p>{eventFil[0]?.typeEvent? eventFil[0]?.typeEvent.type : "Event Created"} - {eventFil[0]?.typeEvent? eventFil[0]?.typeEvent.genre : null}</p>

            <Carousel>
              {
                EventsGenre.map( (eventos,i) => 
                  
                  <div key={i} className="contenedor">
            
                    { 
                      eventos.map((event,i) => {
                        return <Card event={event} key={i} />
                      })
                    }
                  
                  </div>
                )
              
              }
            </Carousel> 

          </div>)
          
        })

      }
       
    </div>
    ): <Loading/>
  )







  // return (
  //   Events.length ? (
  //   <InfiniteScroll dataLength={Events.length} hasMore={hasMore} next={next}>
  //     <ul className="eventsGrid">
  //       { 
  //         Events.map((event,i) => {
  //           return <Card event={event} key={i} />;
  //         })
  //       }
  //     </ul>
  //   </InfiniteScroll>
  // ): <Loading/>
  
  // )
}
