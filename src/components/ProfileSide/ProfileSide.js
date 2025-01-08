import React from "react";
import { CiHeart } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaRegAddressBook } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const ProfileSide = () => {
  return (
    <div className="container">
      <div className="left-side">
        <div className="title">
          <p>Menu</p>
        </div>
        <div className="side-menu">
          <CiHeart style={{ fontSize: "25px" }} />
          <p>My Wishlist</p>
        </div>
        <div className="side-menu">
          <IoBagHandleOutline style={{ fontSize: "25px" }} />
          <p style={{ marginTop: "5px" }}>Order History</p>
        </div>
        <div className="side-menu">
          <FaRegAddressBook style={{ fontSize: "25px" }} />
          <p>Address Book</p>
        </div>
        <div className="side-menu">
          <FaRegBell style={{ fontSize: "25px" }} />
          <p>Alert & coupons</p>
        </div>
        <div className="side-menu">
          <FiGift style={{ fontSize: "25px" }} />
          <p>Redeem Points</p>
        </div>
        <div className="side-menu">
          <MdOutlineNotificationsActive style={{ fontSize: "25px" }} />
          <p>Manage Notifications</p>
        </div>
        <div className="side-menu">
          <IoSettingsOutline style={{ fontSize: "25px" }} />
          <p>Settings</p>
        </div>
      </div>
      <div className="middle">
        <div className="middleCard">
          <div className="address">
            <p className="title">Sourabh prajapati</p>
            <p className="sub-title">
              B-290 Janta colony Raja park, Jaipur, near Indian Bank Jaipur
              ,Rajasthan 302004 ,IN Ph. 7073345242
            </p>
          </div>
          <hr style={{ marginTop: "4rem" }} />
          <div id="btn-1">
            <button>Delete</button>
            <button>Edit Address</button>
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="profile">
          <CgProfile fontSize={"80px"} />
          <p style={{ fontWeight: "bold", margin: "10px 0px" }}>
            Sourabh prajapati
          </p>
          <p style={{ fontWeight: 200, fontSize: "15px" }}>55 points</p>
          <p
            style={{ margin: "10px 0px", fontWeight: 400, fontSize: "0.8rem" }}
          >
            Sourabhprajapati920@gmail.com
          </p>
        </div>
        <div className="address">
          <p style={{ fontWeight: "bold" }}>Default Address</p>
          <hr />
          <p style={{ fontWeight: "bold" }}>Home</p>
          <p style={{ fontWeight: 300, fontSize: "0.9rem" }}>
            B-290 Janta colony Raja park, Jaipur near Indian Bank
            Rajasthan,302004 ,Jaipur
            <br /> ph :7073345242
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSide;
