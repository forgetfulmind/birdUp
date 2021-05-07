import React from "react";
import {Link} from "react-router-dom"

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg">

       <Link to="/members" className="link">Collection</Link>

       <Link to="/earth" className="link">Map</Link>

        <Link to="/submitBird" className="link">Post</Link>

        <Link to="/edit" className="link">Avatar</Link>

        <Link to="/logout" className="link">Logout</Link>
    </nav>
  );
}

export default Nav;
