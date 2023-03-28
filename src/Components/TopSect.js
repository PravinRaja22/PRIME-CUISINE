import React from "react";
import { FaSearch } from "react-icons/fa";
import user from "../img/user.png";


function TopSect() {

  return (
    <div className="top-section">
      <div className="user-info">
        {/* <div className="user-img">
          <img src={user} alt="user" />
        </div> */}
        <p className="user-name" style={{color:'red'}}>Welcome👋</p>

      </div>

      


    </div>
  );
}

export default TopSect;
