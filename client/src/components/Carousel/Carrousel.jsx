import React, { useEffect } from "react";
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
      <Carousel>
        <div>
          <img
            src={Events.length ? Events[0].image : null}
            alt={Events.length ? Events[0].name : null}
          />
          <p className="legend">{Events.length ? Events[0].name : null}</p>
        </div>
        <div>
          <img
            src={Events.length ? Events[1].image : null}
            alt={Events.length ? Events[1].name : null}
          />
          <p className="legend">{Events.length ? Events[1].name : null}</p>
        </div>
        <div>
          <img
            src={Events.length ? Events[2].image : null}
            alt={Events.length ? Events[2].name : null}
          />
          <p className="legend">{Events.length ? Events[2].name : null}</p>
        </div>
      </Carousel>
    </div>
  );
}
