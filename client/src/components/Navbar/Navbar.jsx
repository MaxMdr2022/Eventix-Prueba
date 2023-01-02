import React from "react";
import { LoginButton } from "./Login/LoginButton";
import styled from 'styled-components'

import SearchBar from "../SearchBar/SearchBar";
import "./navbar.css";
import {aboutUs} from "../About Us/AboutUs";

import Filters from "../Filters/Filters";

export default function Navbar() {

  let checkBox = false;

  function handleCheck(e){

    let checkbox = document.getElementById(`${e.target.value}`);
    // console.log("chee",checkbox.checked);
    checkBox = checkbox.checked;
  };

  return (

    <div>

      <div className="navbar">

        <div className="left">
          <SearchBar />
          <a href="/">
            <h1>Eventix</h1>
          </a>
          <a href="/aboutUs">
            <h3>About us</h3>
             <aboutUs/> 
          </a>
          <a href="/createevents">Create Events</a>
          
        </div>
        <div>
          
        </div>
        

        {/*<div className="right">
          <LoginButton />
  </div>*/}

      </div>




      <div id="menu">
        <input type={"checkbox"} id={"1"} value={1} onClick={e=>handleCheck(e)} className="mostrar-menu"/>
        <label>Search</label>
        <div id="filter">
          <Filters check={checkBox}/>
        </div> 
      </div>

    </div>
  );
}

