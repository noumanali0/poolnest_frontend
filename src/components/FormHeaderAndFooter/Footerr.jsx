import { Fragment, React } from "react";
import img2 from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import footerLogo from "../../assets/img/footerlogo.png";

function Footerr() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/");
  };
  const handleGetStart = () => {
    navigate("/account/register");
  };
  return (
    <Fragment>
      <div className="container-fluid footers">
        <div className="row footers cslocation">
          <div className="col-sm-5">
            <div className="mainCOl">
              <a href="https://thepoolnest.com/">
                <img src={img2} alt="asd" />
              </a>
              <p className="fotText">
                An all-in-one app to manage your
                <br /> pool cleaning business and <br />
                maintain customer satisfaction.
              </p>
              {/* <i class="fa fa-facebook" aria-hidden="true"></i> */}
              <div className="df">
                <div>
                  <a href="https://www.facebook.com/poolnestt">
                    <i class="fab fa-facebook-f fbb"></i>
                  </a>
                </div>
                <div>
                  <a href="https://www.instagram.com/poolnest/">
                    <i class="fab fa-instagram inssta"></i>
                  </a>
                </div>
                <div>
                  <a href="https://www.linkedin.com/company/poolnest/about/">
                    <i class="fab fa-linkedin linkkedINN"></i>
                  </a>
                </div>
                <div>
                  <a href="https://www.pinterest.com/poolnest/">
                    <i class="fab fa-pinterest inssta"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-7">
            <div className="row cslocation footerlinkss">
              <div className="col-sm-4">
                <p className="colorGold">About Us</p>
                <ul>
                  <li>
                    <a href="https://thepoolnest.com/pricing/">Pricing</a>
                  </li>
                  <li>
                    <a href="https://thepoolnest.com/demo/">Demo</a>
                  </li>
                  <li>
                    <a href="https://thepoolnest.com/blogs/">Blogs</a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-4">
                <p className="colorGold">Information</p>
                <ul>
                  <li>
                    <a href="https://thepoolnest.com/contact/">Contact Us</a>
                  </li>
                  <li>
                    <a href="https://thepoolnest.com/terms-and-conditions/">
                      Terms And Conditions
                    </a>
                  </li>
                  <li>
                    <a href="https://thepoolnest.com/privacy-policy/">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="https://thepoolnest.com/subscription-policy/">
                      Subscription Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-4">
                <p className="colorGold">For Users</p>
                <ul>
                  <li onClick={handleLogin}>Login</li>
                  <li onClick={handleGetStart}>Register</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row footerr copyright cslocation">
          <div className="col-sm-12 footerLoogog">
            <img src={footerLogo} alt="asd" />
          </div>
          <div className="col-sm-12 copyrightzCOntent">
            <p>
              ©️ Poolnest 2024 | Powered by{" "}
              <span>
                <a href="https://avancerasolution.com/">AvanceraSolutions</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Footerr;
