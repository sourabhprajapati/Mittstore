import React, { useState } from "react";
import "./header.css";
import logo from "../../assets/MittStore-01.png";
import { IoPerson } from "react-icons/io5";
import cart from "../../assets/cart.png";
import home from "../../assets/homep.png";
import product from "../../assets/product.png";
import learn from "../../assets/learn.png";
import resouce from "../../assets/resource.png";
import purcase from "../../assets/purchase.png";
import company from "../../assets/company.png";
import { Drawer, IconButton, Link } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import DropMenu from "../DropMenu/DropMenu";
import DropMenu1 from "../DropMenu1/DropMenu1";
import DropMenu3 from "../DropMenu3/DropMenu3";
import DropMenu4 from "../DropMenu4/DropMenu4";
import DropMenu5 from "../DropMenu5/DropMenu5";
const Header = ({ setSearchTerm }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div className="home-container">
      <div id="strip">
        <p>
          Welcome to <strong>Mittsure!</strong>
        </p>
      </div>
      <div className="search">
        <img src={logo} alt="logo" />
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">🔍</button>
        </div>
        <div className="login-btn">
          <IoPerson style={{ fontSize: "25px" }} />
          <p>
            <Link href="/profilepage">Login/SignUp</Link>
          </p>
        </div>
        <div className="cart">
          <img src={cart} alt="cart" />
          <Link href="/cart">Cart</Link>
        </div>
        <div className="hamburger">
          <IconButton
            onClick={() => setIsDrawerOpen(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            classes={{ paper: "custom-drawer" }}
            sx={{overflow:"auto"}}
          >
            <div className="title">
              <p>Menu</p>
            </div>
            <hr />
            
          </Drawer>
        </div>
      </div>
      <div className="nav">
        <ul className="nav-links">
          <div className="menu-pic">
            <img src={home} alt="" />
            <li>
            <Link href="/">Home</Link>
            </li>
          </div>
          <div className="menu-pic">
            <img src={product} alt="" />
            <li>
              <DropMenu1/>
            </li>
          </div>
          <div className="menu-pic">
            <img src={learn} alt="" />
            <li>
             <DropMenu/>
            </li>
          </div>
          <div className="menu-pic">
            <img src={resouce} alt="" />
            <li>
              <DropMenu3/>
            </li>
          </div>
          <div className="menu-pic">
            <img src={purcase} alt="" />
            <li>
              <DropMenu4/>
            </li>
          </div>
          <div className="menu-pic">
            <img src={company} alt="" />
            <li>
              <DropMenu5/>
            </li>
          </div>
          
        </ul>
      </div>
      <hr />
    </div>
  );
};

export default Header;
