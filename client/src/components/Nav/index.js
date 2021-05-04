import React from "react";
import {Link} from "react-router-dom"

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg">

       <Link to="/members">Home</Link>

       <Link to="/edit">Update Profile</Link>

        <Link to="/earth">Map</Link>

        <Link to="/submitBird">Post</Link>

        <Link to="/logout">Logout</Link>
    </nav>
  );
}

export default Nav;
