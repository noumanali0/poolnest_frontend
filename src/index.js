import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../src/maincss/Style.css";
import "../src/maincss/faiz.css";
import "react-datepicker/dist/react-datepicker.css";
import "../src/maincss/responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/animate.min.css";
import "../src/assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "../src/assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../src/maincss/ahsan.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "./views/Customers";
import ServiceRate from "./views/ServiceRate";
import Dashboard from "./views/Dashboard";
import Addcustomer from "./views/Addcustomer";
import Profilepage from "./views/Profilepage";
import CustomerDetailpage from "./views/CustomerDetailpage";
import Pool from "./views/Pool";
import ServiceLocation from "./views/ServiceLocation";
import Loginpage from "./views/Loginpage";
import ProtectedRoute from "./components/Login/ProtectedRoute";
import Profit from "./views/Profit";
import RouteAssignment from "./views/RouteAssignment";
import ServiceLogs from "./views/ServiceLogs";
import { Provider } from "react-redux";
import store from "./redux/store";
import CustomerServiceLocation from "./views/CustomerServiceLocation";
import Addpools from "./views/Addpools";
import EditServiceLocation from "./views/EditServiceLocation";
import EditPools from "./views/EditPools";
import Workorder from "./views/Workorder";
import Chemicals from "./views/Chemicals";
import InstalledItems from "./views/InstalledItems";
import FinishedOrderDetail from "./views/FinishOrderDetail";
import LabourReports from "./views/LabourReports";
import LabourReportsWorkOrder from "./views/LabourReportsWorkOrder.js";
import LabourReportsSkippedData from "./views/LabourReportsSkippedData.js";
import Export from "./views/Export";
import Account from "./views/Account";
import ThemeSetting from "./views/ThemeSetting";
import AddRoute from "./views/AddRoute";
import Dosages from "./views/Dosages";
import AddDosages from "./views/AddDosages";
import EditDosages from "./views/EditDosages";
import ServiceLogDetail from "./views/ServiceLogDetail";
import ServiceLogWorkOrderDetail from "./views/ServiceLogWorkOrderDetail.js";
import BroadCastEmail from "./views/BroadCastEmail";
import LabourReportsDetail from "./views/LabourReportsDetail";
import LabourReportsSkipped from "./views/LabourReportsSkipped";
import LabourReportsSkippedDetail from "./views/LabourReportsSkippedDetail";
import DosagesDetail from "./views/DosagesDetail";
import Invoicing from "./views/Invoicing";
import WorkOrderType from "./views/WorkOrderType.js";
import CheckList from "./views/CheckList";
import AddChecklist from "./views/AddChecklist";
import ShoppingList from "./views/ShoppingList";
import AddShopping from "./views/AddShopping";
import EditWorkOrder from "./views/EditWorkOrder";
import AddWorkType from "./views/AddWorkType";
import EmailSetting from "./views/EmailSetting";
import EmailList from "./views/EmailList";
import InvoicingDetail from "./views/InvoicingDetail";
import EditShoppingList from "./views/EditShoppingList";
import Equipment from "./views/Equipment";
import TaxGroup from "./views/TaxGroup";
import AddProduct from "./views/AddProduct";
import EditProduct from "./views/EditProduct";
import Product from "./views/Product";
import ProductType from "./views/ProductType";
import EditProductType from "./views/EditProductType";
import AddProductType from "./views/AddProductType";
import WorkOrderList from "./views/WorkOrderList";
import Readings from "./views/Readings";
import AddReadings from "./views/AddReadings";
import AddTechnician from "./views/AddTechnician";
import Technician from "./views/Technician";
import EditTechnician from "./views/EditTechnicianForm";
import { ToastContainer } from "react-toastify";
import GeneralSetting from "./views/GeneralSetting.js";
import EditReadings from "./views/EditReadings.js";
import EditWorkType from "./views/EditWorkType.js";
import ForgetPassword from "./views/ForgetPassword";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Registration from "./views/Registration.js";
import PaymentInfo from "./views/PaymentInfo.js";
import SmsSetting from "./views/SmsSetting.js";
import EmailInSetting from "./views/EmailInSetting.js";
import { LoadScript } from "@react-google-maps/api";
import ForgetPasswordReturn from "./views/ForgetPasswords.js";
import ResetPasswords from "./views/ResetPassword.js";
import PaymentMethodAccount from "./views/PaymentMethodAccount.js";
import PaymentHistoryAccount from "./views/PaymentHistoryAccount.js";
import PaymentHistroyInvoice from "./views/PaymentHistroyInvoice.js";
import CustomerServiceHistory from "./views/CustomerServiceHistory.js";
import CustomerWorkorderHistory from "./views/CustomerWorkorderHistory.js";
import Prospect from "./views/Prospect.js";
import AddProspectService from "./views/AddProspectService.js";
import AddProspectWorkOrder from "./views/AddProspectWorkOrder.js";
import ProspectView from "./views/ProspectView.js";
import CreteAppointment from "./views/CreteAppointment.js";
import ConvertProspect from "./views/ConvertProspect.js";
import ProspectServiceLocation from "./views/ProspectServiceLocation.js";
import ConvertProspectWaterBody from "./views/ConvertProspectWaterBody.js";
import ConvertProspectPool from "./views/ConvertProspectPool.js";
import SkippedStopReason from "./views/SkippedStopReason.js";
import QuickBooksOnline from "./views/QuickBooksOnline.js";
import NewChemicalReports from "./views/NewChemicalReports.js";
import NewChemicalReportsTech from "./views/NewChemicalReportsTech.js";
import NewChemicalReportsCustomerDetail from "./views/NewChemicalReportsCustomerDetail.js";
import NewChemicalTechDetail from "./views/NewChemicalTechDetail.js";
import EditProspectWorkOrder from "./views/EditProspectWorkOrder.js";
import EditProspectService from "./views/EditProspectService.js";
import NotFound from "./views/NotFound.js";
import Estimates from "./views/Estimates.js";
import EstimateBuilder from "./views/EstimateBuilder.js";
import EstimateInvoicing from "./views/EstimateInvoicing.js";
import InvoiceBuilder from "./views/InvoiceBuilder.js";
import PaymentAcitivity from "./views/PaymentAcitivity.js";
import CustomerBillingSchedules from "./views/CustomerBillingSchedules.js";

console.log(
  "process.env.REACT_APP_GOOGLE_STRIPE_API_KEY",
  process.env.REACT_APP_GOOGLE_STRIPE_API_KEY
);
const stripePromise = loadStripe(process.env.REACT_APP_GOOGLE_STRIPE_API_KEY);

const root = ReactDOM.createRoot(document.getElementById("root"));

const storeTheme = localStorage.getItem("primary");
document.documentElement.style.setProperty(
  "--primary-color",
  storeTheme || "#1a4a5b"
);

document.documentElement.style.setProperty("--font-color", "#fff");

root.render(
  <Provider store={store}>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <Elements stripe={stripePromise}>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Loginpage />} />
            <Route exact path="/forgetpassword" element={<ForgetPassword />} />
            <Route
              exact
              path="/password/reset/:token"
              element={<ForgetPasswordReturn />}
            />
            <Route exact path="/account/register" element={<Registration />} />
            <Route exact path="/account/payment" element={<PaymentInfo />} />
            <Route element={<ProtectedRoute />}>
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/customer" element={<Customers />} />
              <Route exact path="/servicerate" element={<ServiceRate />} />
              <Route exact path="/addcustomer" element={<Addcustomer />} />
              <Route
                exact
                path="/edit-work-order/:id/:serviceid"
                element={<EditWorkOrder />}
              />
              <Route
                exact
                path="/edit-customer/:id"
                element={<Profilepage />}
              />
              <Route
                exact
                path="/customerview/:id"
                element={<CustomerDetailpage />}
              />
              <Route
                exact
                path="/edit-service-location/:id"
                element={<EditServiceLocation />}
              />
              <Route
                exact
                path="/edit-customer-pools"
                element={<EditPools />}
              />
              <Route
                exact
                path="/servicelocation"
                element={<ServiceLocation />}
              />
              <Route
                exact
                path="/route-assignment"
                element={<RouteAssignment />}
              />
              <Route exact path="/service-logs" element={<ServiceLogs />} />
              <Route
                exact
                path="/customer-servicelocation/:id"
                element={<CustomerServiceLocation />}
              />
              <Route exact path="/pool/:poolIds/:poolIdss" element={<Pool />} />
              <Route
                exact
                path="/customer-addpools/:customerID/:ServiceLocationID"
                element={<Addpools />}
              />
              <Route exact path="/add-work-order" element={<Workorder />} />
              <Route exact path="/shopping-list" element={<ShoppingList />} />
              <Route exact path="/add-shopping" element={<AddShopping />} />
              <Route
                exact
                path="/work-order-type"
                element={<WorkOrderType />}
              />
              <Route
                exact
                path="/add-work-order-type"
                element={<AddWorkType />}
              />
              <Route
                exact
                path="/edit-work-order-type"
                element={<EditWorkType />}
              />
              <Route exact path="/add-route" element={<AddRoute />} />
              {/* <Route exact path="/chemical" element={<Chemicals />} /> */}
              <Route exact path="/chemical" element={<NewChemicalReports />} />
              <Route
                exact
                path="/chemical-customer-detail"
                element={<NewChemicalReportsCustomerDetail />}
              />
              <Route
                exact
                path="/chemical-tech"
                element={<NewChemicalReportsTech />}
              />
              <Route
                exact
                path="/chemical-tech/:id"
                element={<NewChemicalTechDetail />}
              />
              <Route
                exact
                path="/installed-items"
                element={<InstalledItems />}
              />
              <Route
                exact
                path="/finished-order/:id"
                element={<FinishedOrderDetail />}
              />
              <Route
                exact
                path="/service-log/:id"
                element={<ServiceLogDetail />}
              />
              <Route
                exact
                path="/service-log-workorder/:id"
                element={<ServiceLogWorkOrderDetail />}
              />
              <Route
                exact
                path="/customer-service-history/:id"
                element={<CustomerServiceHistory />}
              />
              <Route
                exact
                path="/customer-workorder-history/:id"
                element={<CustomerWorkorderHistory />}
              />

              <Route exact path="/estimates" element={<Estimates />} />
              <Route
                exact
                path="/estimate-builder"
                element={<EstimateBuilder />}
              />
              <Route
                exact
                path="/estimate-invoicing"
                element={<EstimateInvoicing />}
              />
              <Route
                exact
                path="/invoice-builder"
                element={<InvoiceBuilder />}
              />
              <Route
                exact
                path="/payment-activity"
                element={<PaymentAcitivity />}
              />
              <Route
                exact
                path="/billing-schedules"
                element={<CustomerBillingSchedules />}
              />

              <Route exact path="/*" element={<NotFound />} />
              <Route exact path="/email-setting" element={<EmailSetting />} />
              <Route exact path="/invoice" element={<Invoicing />} />
              <Route exact path="/profit" element={<Profit />} />
              <Route exact path="/dosages" element={<Dosages />} />
              <Route exact path="/edit-dosages" element={<EditDosages />} />
              <Route exact path="/edit-readings" element={<EditReadings />} />
              <Route exact path="/dosages/:id" element={<DosagesDetail />} />
              <Route exact path="/checklist" element={<CheckList />} />
              <Route exact path="/add-checklist" element={<AddChecklist />} />
              <Route exact path="/user" element={<Technician />} />
              <Route exact path="/add-user" element={<AddTechnician />} />
              <Route exact path="/edit-user" element={<EditTechnician />} />
              <Route exact path="/add-dosages" element={<AddDosages />} />
              <Route exact path="/labor-report" element={<LabourReports />} />
              <Route
                exact
                path="/labor-report-workorder"
                element={<LabourReportsWorkOrder />}
              />
              <Route
                exact
                path="/labor-report-skipped"
                element={<LabourReportsSkippedData />}
              />
              <Route exact path="/Export" element={<Export />} />
              <Route exact path="/Account" element={<Account />} />
              <Route exact path="/sms-setting" element={<SmsSetting />} />
              <Route
                exact
                path="/sms-setting/skipped-stop-reason"
                element={<SkippedStopReason />}
              />
              <Route
                exact
                path="/email-settings"
                element={<EmailInSetting />}
              />
              <Route exact path="/ThemeSetting" element={<ThemeSetting />} />
              <Route
                exact
                path="/labor-report/:id"
                element={<LabourReportsDetail />}
              />
              <Route
                exact
                path="/skipped-stop"
                element={<LabourReportsSkipped />}
              />
              <Route
                exact
                path="/skipped-stop/:id"
                element={<LabourReportsSkippedDetail />}
              />
              <Route
                exact
                path="/broadcast-email"
                element={<BroadCastEmail />}
              />
              <Route exact path="/email" element={<EmailList />} />
              <Route
                exact
                path="/invoice-detail/:id/:location/:start/:end"
                element={<InvoicingDetail />}
              />
              <Route exact path="/General" element={<GeneralSetting />} />
              <Route
                exact
                path="/edit-shopping/:id"
                element={<EditShoppingList />}
              />
              <Route exact path="/equipment" element={<Equipment />} />
              <Route exact path="/taxgroup" element={<TaxGroup />} />
              <Route exact path="/add-product" element={<AddProduct />} />
              <Route exact path="/edit-product" element={<EditProduct />} />
              <Route exact path="/product" element={<Product />} />
              <Route exact path="/product-type" element={<ProductType />} />
              <Route
                exact
                path="/payment-method"
                element={<PaymentMethodAccount />}
              />
              <Route exact path="/integration" element={<QuickBooksOnline />} />
              <Route
                exact
                path="/payment-history"
                element={<PaymentHistoryAccount />}
              />
              <Route
                exact
                path="/payment-history/:id"
                element={<PaymentHistroyInvoice />}
              />
              <Route exact path="/prospect" element={<Prospect />} />
              <Route
                exact
                path="/prospect/add-service"
                element={<AddProspectService />}
              />
              <Route
                exact
                path="/prospect/add-work-order"
                element={<AddProspectWorkOrder />}
              />
              <Route
                exact
                path="/prospect/edit-work-order/:id"
                element={<EditProspectWorkOrder />}
              />
              <Route
                exact
                path="/prospect/edit-service/:id"
                element={<EditProspectService />}
              />
              <Route
                exact
                path="/prospect/view/:id"
                element={<ProspectView />}
              />
              <Route
                exact
                path="/prospect/create-appointment/:id"
                element={<CreteAppointment />}
              />
              <Route
                exact
                path="/prospect/convert-prospect/:id"
                element={<ConvertProspect />}
              />
              <Route
                exact
                path="/prospect/service-location/:id"
                element={<ProspectServiceLocation />}
              />
              <Route
                exact
                path="/prospect/waterbody/:id"
                element={<ConvertProspectWaterBody />}
              />
              <Route
                exact
                path="/prospect/pool"
                element={<ConvertProspectPool />}
              />
              <Route
                exact
                path="/product-type/:id"
                element={<EditProductType />}
              />
              <Route
                exact
                path="/add-product-type"
                element={<AddProductType />}
              />
              <Route exact path="/work-order" element={<WorkOrderList />} />
              <Route exact path="/readings" element={<Readings />} />
              <Route exact path="/add-readings" element={<AddReadings />} />
              <Route
                exact
                path="/reset-password"
                element={<ResetPasswords />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </LoadScript>
    </Elements>
  </Provider>
);
