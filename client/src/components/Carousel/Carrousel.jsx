import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getAllEventList } from "../../Redux/actions";
import "./carousel.css";
export default function Carrousel() {
  const dispatch = useDispatch();
  const Events = useSelector((state) => state.allevents);
  useEffect(() => {
    dispatch(getAllEventList());
  }, [dispatch]);
  

  return (
    <div className="carousel">
      <Carousel infiniteLoop={true} interval={5000} autoPlay={true}>
          <Link to={'/home/' + (Events.length ? Events[0].id : null)}>
        <div>
          <img
            src={Events.length ? Events[0].imageBanner : null}
            alt={Events.length ? Events[0].name : null}
          />
          {/*<p className="legend">{Events.length ? Events[0].name : null}</p>*/}
        </div>
          </Link>
          <Link to={'/home/' + (Events.length ? Events[1].id : null)}>
        <div>
          <img
            src={Events.length ? Events[1].imageBanner : null}
            alt={Events.length ? Events[1].name : null}
          />
          {/*<p className="legend">{Events.length ? Events[1].name : null}</p>*/}
        </div>
        </Link>
        <Link to={'/home/' + (Events.length ? Events[2].id : null)}>
        <div>
          <img
            src={Events.length ? Events[2].imageBanner : null}
            alt={Events.length ? Events[2].name : null}
          />
          {/*<p className="legend">{Events.length ? Events[2].name : null}</p>*/}
        </div>
        </Link>
      </Carousel>
    </div>
  );
}
