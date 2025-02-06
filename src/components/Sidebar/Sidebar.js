import React, { Component, useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import "../../maincss/responsive.css";
import { Accordion, Nav } from "react-bootstrap";
import Logo from "../../assets/img/logo.png";
import Avatar from "../../assets/img/avatar.png";
import { useSelector } from "react-redux";

function Sidebar({ routes }) {
  const location = useLocation();
  const [openAccordions, setOpenAccordions] = useState({});
  const { data: profileDetail, status } = useSelector(
    (state) => state.profileDetail
  );

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const toggleAccordion = (key) => {
    setOpenAccordions((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const storeTheme = localStorage.getItem("primary");
  document.documentElement.style.setProperty(
    "--primary-color",
    storeTheme || "#1a4a5b"
  );

  document.documentElement.style.setProperty("--font-color", "#fff");
  const userRole = profileDetail?.data?.user_type;

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toISOString();
    localStorage.setItem("date", formattedDate);
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar-background" />
      <div className="sidebar-wrapper sideBarComp">
        <div className="logo d-flex align-items-center justify-content-start">
          <div className="logo-img">
            <img src={Logo} alt="..." className="logo" />
          </div>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            const isRouteDisabled =
              prop.roles && !prop.roles.includes(userRole);

            if (prop.name === "Reports") {
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      {!profileDetail?.data?.manage_admin_panel ||
                      isRouteDisabled ? (
                        <Accordion.Header>
                          <NavLink className="nav-link nav-link1 newdisableclass">
                            <p className="setings">
                              Reports
                              <i
                                className="fa fa-chevron-down"
                                aria-hidden="true"
                              ></i>
                            </p>
                          </NavLink>
                        </Accordion.Header>
                      ) : (
                        <>
                          <Accordion.Header>
                            <NavLink className="nav-link nav-link1">
                              <p className="setings">
                                {prop.name}
                                <i
                                  className="fa fa-chevron-down"
                                  aria-hidden="true"
                                ></i>
                              </p>
                            </NavLink>
                          </Accordion.Header>
                          <Accordion.Body>
                            <NavLink to={"/invoice"} className="nav-link">
                              <i className={prop.icon} />
                              <p>Invoicing</p>
                            </NavLink>
                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink to={"/profit"} className="nav-link">
                                <i className={prop.icon} />
                                <p>Profit</p>
                              </NavLink>
                            </li>
                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink
                                to={"/labor-report"}
                                className="nav-link"
                              >
                                <i className={prop.icon} />
                                <p>Labor</p>
                              </NavLink>
                            </li>
                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink
                                to={"/installed-items"}
                                className="nav-link"
                              >
                                <i className={prop.icon} />
                                <p>Installed Items</p>
                              </NavLink>
                            </li>
                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink to={"/chemical"} className="nav-link">
                                <i className={prop.icon} />
                                <p>Chemical Dosages</p>
                              </NavLink>
                            </li>
                          </Accordion.Body>
                        </>
                      )}
                    </Accordion.Item>
                  </Accordion>
                </li>
              );
            }

            if (prop.name === "Billing and Sales") {
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      {/* {!profileDetail?.data?.manage_admin_panel ||
                      isRouteDisabled ? (
                        <Accordion.Header>
                          <NavLink className="nav-link nav-link1 newdisableclass">
                            <p className="setings">
                              Reports
                              <i
                                className="fa fa-chevron-down"
                                aria-hidden="true"
                              ></i>
                            </p>
                          </NavLink>
                        </Accordion.Header>
                      ) : ( */}
                      <>
                        <Accordion.Header>
                          <NavLink className="nav-link nav-link1">
                            <p className="setings">
                              {prop.name}
                              <i
                                className="fa fa-chevron-down"
                                aria-hidden="true"
                              ></i>
                            </p>
                          </NavLink>
                        </Accordion.Header>
                        <Accordion.Body>
                          <NavLink to={"/estimates"} className="nav-link">
                            <i className={prop.icon} />
                            <p>Estimates</p>
                          </NavLink>
                          <li
                            className={
                              prop.upgrade
                                ? "active active-pro"
                                : activeRoute(prop.layout + prop.path)
                            }
                            key={key}
                          >
                            <NavLink
                              to={"/estimate-builder"}
                              className="nav-link"
                            >
                              <i className={prop.icon} />
                              <p>Estimate Builder</p>
                            </NavLink>
                          </li>
                          <li
                            className={
                              prop.upgrade
                                ? "active active-pro"
                                : activeRoute(prop.layout + prop.path)
                            }
                            key={key}
                          >
                            <NavLink
                              to={"/estimate-invoicing"}
                              className="nav-link"
                            >
                              <i className={prop.icon} />
                              <p>Invoicing</p>
                            </NavLink>
                          </li>
                          <li
                            className={
                              prop.upgrade
                                ? "active active-pro"
                                : activeRoute(prop.layout + prop.path)
                            }
                            key={key}
                          >
                            <NavLink
                              to={"/invoice-builder"}
                              className="nav-link"
                            >
                              <i className={prop.icon} />
                              <p>Invoice Builder</p>
                            </NavLink>
                          </li>
                          <li
                            className={
                              prop.upgrade
                                ? "active active-pro"
                                : activeRoute(prop.layout + prop.path)
                            }
                            key={key}
                          >
                            <NavLink
                              to={"/payment-activity"}
                              className="nav-link"
                            >
                              <i className={prop.icon} />
                              <p>Payment Activity</p>
                            </NavLink>
                          </li>
                          <li
                            className={
                              prop.upgrade
                                ? "active active-pro"
                                : activeRoute(prop.layout + prop.path)
                            }
                            key={key}
                          >
                            <NavLink
                              to={"/billing-schedules"}
                              className="nav-link"
                            >
                              <i className={prop.icon} />
                              <p>Customer Billing Schedules </p>
                            </NavLink>
                          </li>
                        </Accordion.Body>
                      </>
                    </Accordion.Item>
                  </Accordion>
                </li>
              );
            }

            if (prop.name === "Settings") {
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      {!profileDetail?.data?.manage_general_settings ||
                      isRouteDisabled ? (
                        <Accordion.Header>
                          <NavLink className="nav-link nav-link1 newdisableclass">
                            <p className="setings">
                              Setting
                              <i
                                className="fa fa-chevron-down"
                                aria-hidden="true"
                              ></i>
                            </p>
                          </NavLink>
                        </Accordion.Header>
                      ) : (
                        <>
                          <Accordion.Header>
                            <NavLink className="nav-link nav-link1">
                              <p className="setings">
                                Setting{" "}
                                <i
                                  className="fa fa-chevron-down"
                                  aria-hidden="true"
                                ></i>
                              </p>
                            </NavLink>
                          </Accordion.Header>
                          <Accordion.Body>
                            <NavLink to={"/user"} className="nav-link">
                              <i className={prop.icon} />
                              <p>User</p>
                            </NavLink>
                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink to={"/equipment"} className="nav-link">
                                <i className={prop.icon} />
                                <p>Equipment</p>
                              </NavLink>
                            </li>
                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink to={"/dosages"} className="nav-link">
                                <i className={prop.icon} />
                                <p>Dosages</p>
                              </NavLink>
                            </li>
                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink to={"/readings"} className="nav-link">
                                <i className={prop.icon} />
                                <p>Readings</p>
                              </NavLink>
                            </li>
                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink to={"/product"} className="nav-link">
                                <i className={prop.icon} />
                                <p>Product</p>
                              </NavLink>
                            </li>
                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink
                                to={"/product-type"}
                                className="nav-link"
                              >
                                <i className={prop.icon} />
                                <p>Product Type</p>
                              </NavLink>
                            </li>
                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink
                                to={"/work-order-type"}
                                className="nav-link"
                              >
                                <i className={prop.icon} />
                                <p>Work Order Type</p>
                              </NavLink>
                            </li>
                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink to={"/checklist"} className="nav-link">
                                <i className={prop.icon} />
                                <p>Service Checklist</p>
                              </NavLink>
                            </li>

                            {/* <li
                            className={
                              prop.upgrade
                                ? "active active-pro"
                                : activeRoute(prop.layout + prop.path)
                            }
                            key={key}
                          >
                            <NavLink to={"/taxgroup"} className="nav-link">
                              <i className={prop.icon} />
                              <p>Tax Rates</p>
                            </NavLink>
                          </li> */}

                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink to={"/taxgroup"} className="nav-link">
                                <i className={prop.icon} />
                                <p>Tax Group</p>
                              </NavLink>
                            </li>

                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink to={"/General"} className="nav-link">
                                <i className={prop.icon} key={key} />
                                <p>General Setting</p>
                              </NavLink>
                            </li>

                            {/* <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink to={"/Account1"} className="nav-link">
                                <i className={prop.icon} />
                                <p>Email Setting</p>
                              </NavLink>
                            </li> */}

                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink to={"/sms-setting"} className="nav-link">
                                <i className={prop.icon} />
                                <p>SMS Setting</p>
                              </NavLink>
                            </li>

                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink
                                to={"/ThemeSetting"}
                                className="nav-link"
                              >
                                <i className={prop.icon} />
                                <p>Theme Setting</p>
                              </NavLink>
                            </li>
                          </Accordion.Body>
                        </>
                      )}
                    </Accordion.Item>
                  </Accordion>
                </li>
              );
            }

            if (prop.name === "Account") {
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      {!profileDetail?.data?.manage_admin_panel ||
                      isRouteDisabled ? (
                        <Accordion.Header>
                          <NavLink className="nav-link nav-link1 newdisableclass">
                            <p className="setings">
                              Account
                              <i
                                className="fa fa-chevron-down"
                                aria-hidden="true"
                              ></i>
                            </p>
                          </NavLink>
                        </Accordion.Header>
                      ) : (
                        <>
                          <Accordion.Header>
                            <NavLink className="nav-link nav-link1">
                              <p className="setings">
                                {prop.name}
                                <i
                                  className="fa fa-chevron-down"
                                  aria-hidden="true"
                                ></i>
                              </p>
                            </NavLink>
                          </Accordion.Header>
                          {/* <Accordion.Body>
                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink
                                to={"/payment-method"}
                                className="nav-link"
                              >
                                <i className={prop.icon} />
                                <p>Payment Method</p>
                              </NavLink>
                            </li>
                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink
                                to={"/payment-history"}
                                className="nav-link"
                              >
                                <i className={prop.icon} />
                                <p>Payment History</p>
                              </NavLink>
                            </li>
                          </Accordion.Body> */}
                        </>
                      )}
                    </Accordion.Item>
                  </Accordion>
                </li>
              );
            }

            if (prop.name === "Integration") {
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      {!profileDetail?.data?.manage_admin_panel ||
                      isRouteDisabled ? (
                        <Accordion.Header>
                          <NavLink className="nav-link nav-link1 newdisableclass">
                            <p className="setings">
                              Integration
                              <i
                                className="fa fa-chevron-down"
                                aria-hidden="true"
                              ></i>
                            </p>
                          </NavLink>
                        </Accordion.Header>
                      ) : (
                        <>
                          <Accordion.Header>
                            <NavLink className="nav-link nav-link1">
                              <p className="setings">
                                {prop.name}
                                <i
                                  className="fa fa-chevron-down"
                                  aria-hidden="true"
                                ></i>
                              </p>
                            </NavLink>
                          </Accordion.Header>
                          <Accordion.Body>
                            <li
                              className={
                                prop.upgrade
                                  ? "active active-pro"
                                  : activeRoute(prop.layout + prop.path)
                              }
                              key={key}
                            >
                              <NavLink to={"/integration"} className="nav-link">
                                <i className={prop.icon} />
                                <p>QuickBooks Online</p>
                              </NavLink>
                            </li>
                          </Accordion.Body>
                        </>
                      )}
                    </Accordion.Item>
                  </Accordion>
                </li>
              );
            }
            if (!prop.redirect) {
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  {/* If the route is disabled, render as grayed out */}
                  {isRouteDisabled ? (
                    <span className="nav-link disabled">
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </span>
                  ) : (
                    <NavLink to={prop.path} className="nav-link">
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  )}
                </li>
              );
            }

            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
