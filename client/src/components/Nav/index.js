import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="/members">
        birdUp
      </a>
      <a href="/logout">
        Logout
      </a>
      <a href="/earth">
        Map
      </a>
    </nav>
  );
}

export default Nav;
