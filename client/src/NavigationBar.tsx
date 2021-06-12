import React from "react";
import './NavigationBar.css';

import { NavLink } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav className="list">
        <span>
          <NavLink to="/" activeClassName="selected">Home</NavLink>
        </span>
        <span>
          <NavLink to="/meals" activeClassName="selected">Meals</NavLink>
        </span>
    </nav>
  );
}