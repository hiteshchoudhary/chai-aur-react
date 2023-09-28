import React from "react";
import logo from "../assets/logo.png";

function Logo({ width = "100px" }) {
  return (
    <div>
      <img src={logo} alt='chai-our-logo' width={width} className="rounded-full cursor-pointer" />
    </div>
  );
}

export default Logo;
