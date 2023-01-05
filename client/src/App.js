import React from 'react'
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import { Profile } from "./components/Navbar/Login/Profile";
import aboutUs from './components/About Us/AboutUs';
import createEvent from './components/createEvent/CreateEvent';
import Perfil from './components/Perfil/Perfil';

import axios from "axios";

axios.defaults.baseURL = "https://eventix-prueba-production.up.railway.app/";//http://localhost:3001/

function App() {
  return (
    <div>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/home/:id"} component={Detail} />
        <Route exact path={"/profile"} component={Profile} />
        <Route exact path={"/aboutUs"} component={aboutUs} />
        <Route exact path={"/createevents"} component={createEvent} />
        <Route exact path={"/perfil"} component={Perfil} />
      </Switch>
    </div>
  );
}

export default App;
