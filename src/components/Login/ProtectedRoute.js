import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import routes from "../../routes";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userApproved, setUserApproved] = useState(false);
  const { data: profileDetail } = useSelector((state) => state.profileDetail);

  const verifyUser = async () => {
    const config = {
      headers: {
        Authorization: Cookies.get("userToken"),
      },
    };
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, config);
      setUserApproved(true);
    } catch (err) {
      setUserApproved(false);
      navigate("/");
      Cookies.remove("userToken");
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const handleNavigation = () => {
    const blockedRoutes = ["Export", "payment-history", "payment-method"];
    const currentRoute = location.pathname.split("/")[1];
    if (
      profileDetail?.data?.data?.user_type &&
      (profileDetail.data.data.user_type === "Admin" ||
        profileDetail.data.data.user_type === "Technician") &&
      blockedRoutes.includes(currentRoute)
    ) {
      navigate(-1);
    }
  };

  useEffect(() => {
    handleNavigation();
  }, [location.pathname, profileDetail]);

  // useEffect(() => {
  //   const blockedRoutes = [
  //     "ThemeSetting",
  //     "General",
  //     "taxgroup",
  //     "checklist",
  //     "work-order-type",
  //     "product-type",
  //     "product",
  //     "readings",
  //     "dosages",
  //     "equipment",
  //     "user",
  //   ];
  //   const currentRoute = location.pathname.split("/")[1];
  //   if (
  //     !profileDetail?.data?.manage_general_settings &&
  //     blockedRoutes.includes(currentRoute)
  //   ) {
  //     navigate(-1);
  //   }
  // }, [location.pathname, profileDetail]);

  if (!Cookies.get("userToken") && !userApproved) {
    return (
      <div className="unauthorized">
        <div className="wrapper">
          <div className="box">
            <h1>Forbidden Error 404</h1>
            <p>Sorry, You're Unauthorized Or your token may be expired</p>
            <p className="emoji">😥</p>

            <p>
              <NavLink to="/">Let me try again!</NavLink>
              <NavLink to="/">Back To Dashboard</NavLink>
            </p>
          </div>
        </div>
        <span></span>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
