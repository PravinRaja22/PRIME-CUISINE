import React from "react";
import "./sidebar.css";
import logo from "../img/prime-logo.png";
import { FaCog, FaUser, FaSignOutAlt,} from "react-icons/fa";
import { IoChatbubbleEllipsesSharp, IoRestaurant } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { Link } from 'react-router-dom';

import { BiDish ,BiHomeAlt,BiCart} from "react-icons/bi";


const Icon = ({ icon }) => (
  <li>
    <p href="">{icon}</p>
  </li>
);


function SideBar() {
  return (
    <header>
      <img src={logo} alt="logo" />
      
      <ul className="top-menu">
        <Link to="/"><Icon icon={<BiHomeAlt title="Order"/>} /></Link>
        <Link to="/restaurents"><Icon icon={<BiDish title="Restaurent"/>} /></Link>
        <Link to="/PaymentSect"><Icon icon={<BiCart title="cart"/>} /></Link>
      </ul>
      
    </header>
  );
}


export default SideBar;
