import React, { useEffect } from "react";
import visa from "../../assets/img/visa.jpg";
import mastercard from "../../assets/img/mastercard.jpg";
import americanex from "../../assets/img/american.png";
import paypals from "../../assets/img/paypal.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchgetPaymentData } from "../../redux/Slices/getPaymentInfoData";

const PaymentInfoMethod = () => {
  const { data: getPaymentData, statusdata } = useSelector(
    (state) => state.getPaymentData
  );
  const dispatch = useDispatch();

  console.log(getPaymentData);

  useEffect(() => {
    dispatch(fetchgetPaymentData());
  }, []);

  const BrandFunction = (brand) => {
    console.log(brand);
    if (brand === "MasterCard") {
      return <img src={mastercard} />;
    }
    if (brand === "American Express") {
      return <img src={americanex} />;
    }
    if (brand === "Visa") {
      return <img src={visa} />;
    }
    if (brand === "PayPal") {
      return <img src={paypals} />;
    } else {
      return <img src={visa} />;
    }
  };
  return (
    <div className="container-fluid stepsform stepsform1">
      <div className="row padding-row registerForm paymentForm dashboard">
        <div className="col-sm-12 stepforms step steps">
          <div className="row fomik addRoute height-1">
            <h3>Current Payment Info</h3>
            <form className="formpayement">
              <div className="card-element">
                <div className="imagesform">
                  {BrandFunction(
                    getPaymentData?.data?.default_source?.card?.brand
                  )}
                </div>
                <div className="col-sm-12">
                  <h4>**** **** **** {getPaymentData?.data?.card?.last4}</h4>
                  <div>
                    <p>
                      <b>Expiration: </b>
                      <span>
                        {" "}
                        {getPaymentData?.data?.card?.exp_month}/{" "}
                        {getPaymentData?.data?.card?.exp_year}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoMethod;
