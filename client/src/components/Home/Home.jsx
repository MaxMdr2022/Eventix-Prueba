import React, { useEffect, useState } from "react";
import AboutUs from "../About Us/AboutUs";
import Grid from "../Grid/Grid";
import Navbar from "../Navbar/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import "./home.css";
import Carrousel from "../Carousel/Carrousel";

function Home() {
  const history = useHistory();
  const { isAuthenticated, user, logout } = useAuth0();


function handleClick(){
logout()
return history.push("/")
}
  
  if (/unauthorized/.test(window.location.href)) {
    return (
    <div>
      <p>A verification email has been sent to your email. After verification <a style={{color:"white", textDecoration:"underline"}} href="/profile">click here</a> to continue :D</p>
      <p>¿Can´t verify? Start over by <button onClick={() => handleClick()}>Clicking here</button></p>
    </div>);
  }
  return (
    <div>
      <Navbar />
      <Carrousel/>
      <div className="grid">
        <Grid />
      </div>
    </div>
  );
  
}

export default Home;
