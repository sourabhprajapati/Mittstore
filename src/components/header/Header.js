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
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const Header = () => {
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
          <input type="text" className="search-input" placeholder="Search..."  />
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
          >
            <div className="title">
              <p>Menu</p>
            </div>
            <hr />
            <div className="subtitle">
              <img src={home} alt="" />
              <Link
                component="a"
                href="/about"
                marginLeft={1}
                sx={{
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  "&:hover": {
                    color: "#022575",
                  },
                  color: "black",
                }}
              >
                Home
              </Link>
            </div>
            <div className="subtitle">
              <img src={product} alt="" />
              <Link
                component="a"
                href="/about"
                marginLeft={1}
                sx={{
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  "&:hover": {
                    color: "#022575",
                  },
                  color: "black",
                }}
              >
                Shop Our Product
              </Link>
            </div>{" "}
            <div className="subtitle">
              <img src={learn} alt="" />
              <Link
                component="a"
                href="/about"
                marginLeft={1}
                sx={{
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  "&:hover": {
                    color: "#022575",
                  },
                  color: "black",
                }}
              >
                Shop by Learning
              </Link>
            </div>{" "}
            <div className="subtitle">
              <img src={resouce} alt="" />
              <Link
                component="a"
                href="/about"
                marginLeft={1}
                sx={{
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  "&:hover": {
                    color: "#022575",
                  },
                  color: "black",
                }}
              >
                Ideas and Resources
              </Link>
            </div>{" "}
            <div className="subtitle">
              <img src={purcase} alt="" />
              <Link
                component="a"
                href="/about"
                marginLeft={1}
                sx={{
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  "&:hover": {
                    color: "#022575",
                  },
                  color: "black",
                }}
              >
                Bulk Purchase
              </Link>
            </div>
            <div className="subtitle">
              <img src={company} alt="" />
              <Link
                component="a"
                href="/about"
                marginLeft={1}
                sx={{
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  "&:hover": {
                    color: "#022575",
                  },
                  color: "black",
                }}
              >
                Company
              </Link>
            </div>
          </Drawer>
        </div>
      </div>
      <div className="nav">
        <ul className="nav-links">
          <div className="menu-pic">
            <img src={home} alt="" />
            <li>
              <a href="#home">Home</a>
            </li>
          </div>
          <div className="menu-pic">
            <img src={product} alt="" />
            <li>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ fontWeight: "bold", color: "black" }}
              >
                Shop Our Product
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#013770", // Hover background color
                      color: "white", // Optional: text color on hover
                    },
                  }}
                >
                  Furniture
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#013770", // Hover background color
                      color: "white", // Optional: text color on hover
                    },
                  }}
                >
                  School-Office Supplies
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#013770", // Hover background color
                      color: "white", // Optional: text color on hover
                    },
                  }}
                >
                  Art Supplies-Craft
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#013770", // Hover background color
                      color: "white", // Optional: text color on hover
                    },
                  }}
                >
                  Outdoor-Playground
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#013770", // Hover background color
                      color: "white", // Optional: text color on hover
                    },
                  }}
                >
                  Study tablets
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#013770", // Hover background color
                      color: "white", // Optional: text color on hover
                    },
                  }}
                >
                  Electronics
                </MenuItem>
              </Menu>
            </li>
          </div>
          <div className="menu-pic">
            <img src={learn} alt="" />
            <li>
              <a href="#home">Shop by Learning Environment</a>
            </li>
          </div>
          <div className="menu-pic">
            <img src={resouce} alt="" />
            <li>
              <a href="#home">Ideas and Resources</a>
            </li>
          </div>
          <div className="menu-pic">
            <img src={purcase} alt="" />
            <li>
              <a href="#home">Bulk Purchase</a>
            </li>
          </div>
          <div className="menu-pic">
            <img src={company} alt="" />
            <li>
              <a href="#home">Company</a>
            </li>
          </div>
        </ul>
      </div>
      <hr />
    </div>
  );
};

export default Header;
