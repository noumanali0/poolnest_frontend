import React, { useState, useEffect } from "react";
// import Navbars from "../Components/Navbars";
import { Form } from "antd";
import InformationForm from "../components/Registration/Register";
import img3 from "../assets/img/bannerImage.png";
import Headerr from "../components/FormHeaderAndFooter/Headerr";
import Footerr from "../components/FormHeaderAndFooter/Footerr";
import { Helmet } from "react-helmet";
import { fetchpackagesData } from "../redux/Slices/getPackages";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const { data: packagesData, statusdata } = useSelector(
    (state) => state.packagesData
  );
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const storeTheme = localStorage.getItem("primary");
  document.documentElement.style.setProperty(
    "--primary-color",
    storeTheme || "#1a4a5b"
  );

  document.documentElement.style.setProperty("--font-color", "#fff");

  useEffect(() => {
    dispatch(fetchpackagesData());

    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* <Navbars /> */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Get Started</title>
      </Helmet>
      <div className="container-fluid stepsform stepsform1 registerrationFOrm">
        <div className="row padding-row1 cslocation">
          <div className="col-sm-12 loginlogo">
            <Headerr />
          </div>
          <div className="col-sm-12 monthly">
            <h3>
              Start Your First Month for Only ${packagesData?.Price / 100}
            </h3>
          </div>
        </div>
        <div className="row class-login-new cslocation">
          <div className="col-sm-6 forEifght">
            <div className="row cslocation">
              <InformationForm />
            </div>
          </div>

          <div className="col-sm-6 froImageBaner notTab">
            <img src={img3} alt="" className="bnrimgone" />
          </div>
          <div className="col-sm-12 noPadd">
            <Footerr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
