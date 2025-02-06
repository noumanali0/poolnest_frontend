import React, { Component, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import routes from "../../routes";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Message from "../../assets/img/message.png";
import Avatar from "../../assets/img/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchprofileDetail } from "../../redux/Slices/ProfileDetail";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: profileDetail, status } = useSelector(
    (state) => state.profileDetail
  );

  const LogOut = () => {
    navigate("/");
    Cookies.remove("userToken");
    // Cookies.remove("id");
  };

  useEffect(() => {
    dispatch(fetchprofileDetail());
  }, [dispatch]);
  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  return (
    <Navbar bg="light" expand="lg">
      <div className="container-fluid navabrfr">
        <div className="dashboardHeader">
          <div className="d-flex  align-items-center ml-2 ml-lg-0">
            <Button
              variant="dark"
              className="d-lg-none btn-fill d-flex  align-items-center rounded-circle p-2"
              onClick={mobileSidebarToggle}
            >
              <i className="fas fa-ellipsis-v"></i>
            </Button>
            <Navbar.Brand
              href="#home"
              onClick={(e) => e.preventDefault()}
              className="mr-2"
            >
              {/* {getBrandText()} */}
            </Navbar.Brand>
          </div>

          <Dropdown as={Nav.Item} className="avatardrop">
            <Dropdown.Toggle
              aria-expanded={false}
              aria-haspopup={true}
              data-toggle="dropdown"
              id="navbarDropdownMenuLink"
              variant="default"
              className="m-0"
            >
              <span className="no-icon profile-name">
                <img src={profileDetail?.data?.image} alt="profile-name" />
                {profileDetail?.data?.first_name}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
              <Dropdown.Item>
                <Link to="/reset-password" className="Account-a">
                  Password Reset{" "}
                </Link>
              </Dropdown.Item>
              <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                {" "}
                <Link to="/Account" className="Account-a">
                  Profile Setting{" "}
                </Link>
              </Dropdown.Item>

              <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                {" "}
                <Link to="/payment-method" className="Account-a">
                  Payment Method
                </Link>
              </Dropdown.Item>

              <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                {" "}
                <Link to="/payment-history" className="Account-a">
                  Payment History
                </Link>
              </Dropdown.Item>

              <Dropdown.Item onClick={(e) => LogOut(e)}> Logout </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </Navbar>
  );
}

export default Header;
