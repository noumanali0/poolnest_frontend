import React from "react";
import { Fragment } from "react";
import Accordion from "react-bootstrap/Accordion";
import Routefilters from "./Routefilters";
import RouteAssignment from "./RouteAssignment";
import Workorder from "./Workorder";
import Equipment from "./Equipment";
import Itemneeded from "./Itemneeded";
import Servicelist from "./Servicelist";
import UploadImage from "./UploadImage";
import Previewslider from "./Previewslider";
import { Button, Form } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchwaterbody } from "../../redux/Slices/getWaterBody";
import { fetchsinglewaterbody } from "../../redux/Slices/getSingleWaterBody";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb } from "antd";
import { fetchgetserviceCheckListSpecificToWaterBody } from "../../redux/Slices/getserviceCheckList";
import { fetchwaterbodyImage } from "../../redux/Slices/getpoolImages";
import { fetchgetPoolEquipmemnt } from "../../redux/Slices/getEquipment";
import { fetchgetWorkOrderByWaterBody } from "../../redux/Slices/getWorkorder";
import { fetchgetRouteAssingnment } from "../../redux/Slices/getRouteAssignment";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import DeleteModal from "../Modals/DeleteModal";
import { useState } from "react";
import { fetchitemNeededWaterBody } from "../../redux/Slices/getItemNeededWaterBody";
import NoData from "../NoDataComponent/Loader";

export default function Poolaccordian({ isFieldsDisabled, getSingleCustomer }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [handleid, sethandleid] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [poolTypeName, setPoolTypeName] = useState("");
  const [poolName, setPoolName] = useState("");
  const { pathname } = useLocation();

  const url = pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Split the URL by "/"
  const parts = url.split("/");

  // Extract the IDs from the parts
  const customerID = parts[parts.length - 2];
  const ServiceLocationID = parts[parts.length - 1];
  const [prevWaterbodyId, setPrevWaterbodyId] = useState(null);

  const { data: waterbody, status } = useSelector((state) => state.waterbody);
  const { data: getWaterBodyItemNeeded } = useSelector(
    (state) => state.getWaterBodyItemNeeded
  );
  const { data: getEquipmemnt } = useSelector((state) => state.getEquipmemnt);
  const { data: getWorkOrder } = useSelector((state) => state.getWorkOrder);
  const { data: getRouteAssingnment, changestatus } = useSelector(
    (state) => state.getRouteAssingnment
  );

  const { data: singlewaterbody, statusdata } = useSelector(
    (state) => state.singlewaterbody
  );
  const { data: getserviceCheckList } = useSelector(
    (state) => state.getserviceCheckList
  );
  const { data: waterbodyImage } = useSelector((state) => state.waterbodyImage);

  const onFinishs = (values) => {
    console.log("Received values of form:");
  };

  useEffect(() => {
    dispatch(fetchwaterbody({ ServiceLocationID }));
  }, []);

  const RemovePool = async (id1) => {
    const id = handleid;
    try {
      const config = {
        headers: {
          Authorization: Cookies.get("userToken"),
        },
      };

      const Response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/waterbody/${id1}`,
        config
      );

      toast.success("Pool Delete SuccessFully");
      navigate(-1);
    } catch (err) {
      const error = err.response?.data?.message || "An error occurred";

      toast.error(error);
    }
  };

  const singleidget = waterbody?.length == 1 ? waterbody[0]._id : null;

  const handleOpen = async (id) => {
    if (id !== prevWaterbodyId) {
      setPrevWaterbodyId(id);
      sethandleid(id);
      const waterbody_id = id;
      await dispatch(fetchsinglewaterbody({ id }));
      dispatch(fetchwaterbody({ ServiceLocationID }));
      dispatch(fetchgetserviceCheckListSpecificToWaterBody({ waterbody_id }));
      dispatch(fetchgetPoolEquipmemnt({ waterbody_id }));
      dispatch(fetchgetWorkOrderByWaterBody({ waterbody_id }));
      dispatch(fetchgetRouteAssingnment({ waterbody_id }));
      dispatch(fetchwaterbodyImage({ waterbody_id }));
      dispatch(fetchitemNeededWaterBody({ waterbody_id }));
    }
  };

  useEffect(() => {
    if (singleidget) {
      let waterbody_id = singleidget;
      let id = singleidget;
      dispatch(fetchsinglewaterbody({ id }));
      dispatch(fetchwaterbody({ ServiceLocationID }));
      dispatch(fetchgetserviceCheckListSpecificToWaterBody({ waterbody_id }));
      dispatch(fetchgetPoolEquipmemnt({ waterbody_id }));
      dispatch(fetchgetWorkOrderByWaterBody({ waterbody_id }));
      dispatch(fetchgetRouteAssingnment({ waterbody_id }));
      dispatch(fetchwaterbodyImage({ waterbody_id }));
      dispatch(fetchitemNeededWaterBody({ waterbody_id }));
    }
  }, [dispatch, singleidget]);

  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

  const handleNav1 = () => {
    navigate(`/customerview/${customerID}`);
  };

  const handleNav2 = () => {
    navigate("/customer");
  };

  const handleNav3 = () => {
    navigate(`/edit-service-location/${customerID}`);
  };

  return (
    <Fragment>
      <Breadcrumb
        items={[
          {
            title: (
              <p style={{ cursor: "pointer" }} onClick={handleNav2}>
                Customer
              </p>
            ),
          },
          {
            title: (
              <p style={{ cursor: "pointer" }} onClick={handleNav1}>
                {getSingleCustomer?.first_name +
                  " " +
                  getSingleCustomer?.last_name +
                  " "}{" "}
                Profile
              </p>
            ),
          },
          {
            title: (
              <p style={{ cursor: "pointer" }} onClick={handleNav3}>
                Service Location
              </p>
            ),
          },
        ]}
      />
      {waterbody?.length == 1 ? (
        <Accordion>
          {waterbody?.map((item, i) => {
            const eventKey = String(i);
            return (
              <Accordion.Item>
                <Accordion.Header key={i} className="AddAnotherPoolHeader">
                  <span>
                    (
                    {poolTypeName && poolTypeName?.data?.i == i
                      ? poolTypeName?.name
                      : item?.WaterBodyType?.name}
                    ){" "}
                  </span>
                  {poolName && poolName?.data?.i == i
                    ? poolName?.name
                    : item?.name}
                </Accordion.Header>
                {statusdata === "idle" ? (
                  <Accordion.Body key={i} className="abosys">
                    <Form name="dynamic_form_item" onFinish={onFinishs}>
                      <Routefilters
                        data={{
                          singlewaterbody,
                          isFieldsDisabled,
                          setPoolTypeName,
                          setPoolName,
                          i,
                        }}
                      />
                      <RouteAssignment
                        data={{
                          singlewaterbody,
                          getRouteAssingnment,
                          changestatus,
                        }}
                      />
                      <Workorder data={getWorkOrder} />
                      <Equipment data={{ singlewaterbody, getEquipmemnt }} />
                      <Itemneeded
                        data={{ singlewaterbody, getWaterBodyItemNeeded }}
                      />
                      <Servicelist
                        data={{ getserviceCheckList, singlewaterbody }}
                      />

                      <UploadImage data={singlewaterbody} />
                      {waterbodyImage ? (
                        <Previewslider imagePreview={waterbodyImage} />
                      ) : (
                        <></>
                      )}

                      <div className="col-sm-12 accordfinalbtn">
                        <Form.Item>
                          <Button
                            className="bluebtn form redcss"
                            type="primary"
                            // onClick={() => RemovePool(item?.waterbody_id)}
                            onClick={() => handleModal(item._id)}
                          >
                            Remove Pool{" "}
                          </Button>
                          {/* <Button
                          className="bluebtn form"
                          type="primary"
                          htmlType="submit"
                          onClick={() => handleSubmit()}
                        >
                          Save
                        </Button> */}
                        </Form.Item>
                      </div>
                    </Form>
                  </Accordion.Body>
                ) : (
                  <NoData />
                )}
              </Accordion.Item>
            );
          })}
        </Accordion>
      ) : (
        <Accordion flush>
          {waterbody?.map((item, i) => {
            return (
              <Accordion.Item eventKey={i} key={i}>
                <Accordion.Header
                  onClick={() => handleOpen(item?._id)}
                  key={i}
                  className="AddAnotherPoolHeader"
                >
                  <span>
                    (
                    {poolTypeName && poolTypeName?.data?.i == i
                      ? poolTypeName?.name
                      : item?.WaterBodyType?.name}
                    ){" "}
                  </span>
                  {poolName && poolName?.data?.i == i
                    ? poolName?.name
                    : item?.name}
                </Accordion.Header>
                {statusdata === "idle" ? (
                  <Accordion.Body key={i} className="abosys">
                    <Form name="dynamic_form_item" onFinish={onFinishs}>
                      <Routefilters
                        data={{
                          singlewaterbody,
                          isFieldsDisabled,
                          setPoolTypeName,
                          setPoolName,
                          i,
                        }}
                      />
                      <RouteAssignment
                        data={{
                          singlewaterbody,
                          getRouteAssingnment,
                          changestatus,
                        }}
                      />
                      <Workorder data={getWorkOrder} />
                      <Equipment data={{ singlewaterbody, getEquipmemnt }} />
                      <Itemneeded
                        data={{ singlewaterbody, getWaterBodyItemNeeded }}
                      />
                      <Servicelist
                        data={{ getserviceCheckList, singlewaterbody }}
                      />

                      <UploadImage data={singlewaterbody} />
                      {waterbodyImage ? (
                        <Previewslider imagePreview={waterbodyImage} />
                      ) : (
                        <></>
                      )}

                      <div className="col-sm-12 accordfinalbtn">
                        <Form.Item>
                          <Button
                            className="bluebtn form redcss"
                            type="primary"
                            // onClick={() => RemovePool(item?.waterbody_id)}
                            onClick={() => handleModal(item._id)}
                          >
                            Remove Pool{" "}
                          </Button>
                          {/* <Button
                          className="bluebtn form"
                          type="primary"
                          htmlType="submit"
                          onClick={() => handleSubmit()}
                        >
                          Save
                        </Button> */}
                        </Form.Item>
                      </div>
                    </Form>
                  </Accordion.Body>
                ) : (
                  <></>
                )}
              </Accordion.Item>
            );
          })}
        </Accordion>
      )}

      <DeleteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleDelete={RemovePool}
        id={id}
      />
    </Fragment>
  );
}
