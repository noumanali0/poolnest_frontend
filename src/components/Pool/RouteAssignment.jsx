import React, { useState, Fragment, useEffect } from "react";
import { Button, Form, Input, Space, Select } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UpdatewaterbodyData } from "../../redux/postReducer/postWaterbody";
import Trash from '../../assets/img/Trash.png';
import Create from '../../assets/img/Create.png';
import { Modal } from "react-bootstrap";
import RouteAssignmentModal from "./RouteAssignmentModal";
import EditRouteAssignmentModal from "./EditRouteAssignmentModal";
import { fetchgetRouteAssingnment } from "../../redux/Slices/getRouteAssignment";
import { DeleterWaterBodyRouteAssignmentData ,resetData} from "../../redux/postReducer/postRouteAssignment";
import moment from "moment/moment";
import DeleteModal from "../Modals/DeleteModal";


const { Option } = Select;

export default function Routefilters({data}) {

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const { data: Technician } = useSelector((state) => state.Technician);
  const { data: getRouteAssingnment } = useSelector(
    (state) => state.getRouteAssingnment
  );
  const { success, error , loading } = useSelector((state) => state.postrouteAssignment);

  const dispatch = useDispatch();


  let waterbody_id = data?.singlewaterbody?._id;

  const [formData, setFormData] = useState({
    ServiceAssignment: getRouteAssingnment,
  });

  const form = Form.useForm()[0];


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deleteModals, setDeleteModals] = useState(false);
  const [id, setID] = useState()
  const handleDeleteModalShow = (data, key) => {
    setDeleteModals(true);
    setID(data[key]?._id);
  }

  const [showEdit, setShowEdit] = useState(false);
  const [EditData, setEditData] = useState("");
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (data) => {
    setShowEdit(true)
    setEditData(data)
  };



  useEffect(() => {
    if (getRouteAssingnment) {
      form.setFieldsValue({
        ServiceCheckList:getRouteAssingnment ?  getRouteAssingnment.map((location, index) => ({
          technician_id: location?.RouteAssignmentTechnician?.first_name,
          assigned_date: location?.assigned_date,
          frequency_id: location?.RouteAssignmentFrequency?.label,
          start_date: moment(location?.start_date)?.format('l'),
          end_date: location?.end_date ? moment(location?.end_date)?.format('l') : "No End",
          key: index.toString(),
        })) : null,
      });
    }
  }, [getRouteAssingnment, form]);

  const postfrequency = useSelector((state) => state.getfrequency);

  // const handleDateChange = (date) => {
    
  //   setSelectedDate(date);
  // };

  const handleDateChange = (e, date) => {
    const utcDate = moment.utc(date).format(); // Convert date to UTC format
    setSelectedDate(utcDate);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const onFinish = (values, key) => {
    // dispatch(postwaterbodyData({ values }));
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const DeleteRouteAssignmentList = async (data, key) => {
    await dispatch(DeleterWaterBodyRouteAssignmentData({ id }));
    dispatch(fetchgetRouteAssingnment({ waterbody_id }));

  };

  useEffect(() => {
    if (success) {
      console.log(success,"success")
      toast.success(success);
      dispatch(resetData());
    }
    if (error) {
      console.log(error,"error")

      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  //
  return (
    <Fragment>
      <div className="container-fluid wordkorder">
        <div className="row headwork">
          <div className="col-sm-8">
            <h3>Route Assignment</h3>
          </div>
          <div className="col-sm-2 history">{/* <h3>History</h3> */}</div>
          <div className="col-sm-2"></div>
        </div>

        <div className="row checklistdata">
          <div className="row fomik dynamic_form_nest_item">
            <div className="row workaddbtn">
              <div className="col-sm-12 btns">
                <Form.Item>
                  <Button disabled={false} className="wbtn" onClick={handleShow} block>
                    + Add New
                  </Button>
                </Form.Item>
              </div>
            </div>
            <Form
              name="dynamic_form_nest_item"
              onValuesChange={handleFormValuesChange}
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              initialValue={formData?.ServiceAssignment}
            >
              <Form.List name="ServiceCheckList">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        {
                          data?.changestatus == "idle" ? <div className="row routeFilterr pool">
                          <div className="col-sm-2">
                            <Form.Item
                              {...restField}
                              label="Tech Name"
                              name={[name, "technician_id"]}
                            >
                              <Select disabled placeholder="Tech">
                                {Technician &&
                                  Technician?.items?.map((item, i) => {
                                    return (
                                      <Option value={item.id}>
                                        {item.first_name}
                                      </Option>
                                    );
                                  })}
                              </Select>
                            </Form.Item>
                          </div>
                          <div className="col-sm-2">
                            <Form.Item
                              {...restField}
                              label="Day Of Week"
                              name={[name, "assigned_date"]}
                              
                            >
                              <Select disabled placeholder="Day Of Week">
                                <Option value="monday">Monday</Option>
                                <Option value="tuesday">Tuesday</Option>
                                <Option value="wednesday">Wednesday</Option>
                                <Option value="thursday">Thursday</Option>
                                <Option value="friday">Friday</Option>
                                <Option value="saturday">Saturday</Option>
                                <Option value="sunday">Sunday</Option>
                              </Select>
                            </Form.Item>
                          </div>
                          <div className="col-sm-2">
                            <Form.Item
                              name={[name, "frequency_id"]}
                              label="Frequency"readOnly
                            >
                              <Select disabled placeholder="Frequency">
                                {postfrequency?.data?.map((item) => (
                                  <Option
                                    key={item._id}
                                    value={item.frequency_id}
                                  >
                                    {item.name}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </div>
                          <div className="col-sm-2">
                            <Form.Item
                              name={[name, "start_date"]}
                              label="Start date"
                            >
                              <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy-mm-dd" // Set the desired date format
                                placeholderText="Select Start date"
                                readOnly
                              />
                            </Form.Item>
                          </div>
                          <div className="col-sm-2">
                            <Form.Item
                              name={[name, "end_date"]}
                              label="End date"
                            >
                              <DatePicker
                                selected={selectedEndDate}
                                onChange={handleEndDateChange}
                                minDate={new Date()} // Disable past dates (today and beyond)
                                dateFormat="yyyy-mm-dd" // Set the desired date format
                                placeholderText="Select End date"
                                readOnly
                              />
                            </Form.Item>
                          </div>
                          <div className="col-sm-1">
                            <p className="wbtn">
                              <img src={Create} style={{ cursor: "pointer" }} onClick={() => handleShowEdit(data?.getRouteAssingnment[key])}/>
                            </p>
                          </div>

                          <div className="col-sm-1 dltIconnnnnnnn">
                            <Form.Item>
                              <p
                                style={{ cursor: "pointer" }}
                                type="secondary"
                                className="wbtn"
                                onClick={() =>
                                  handleDeleteModalShow(
                                    data?.getRouteAssingnment,
                                    key
                                  )
                                }
                              >
                                <img src={Trash} />
                              </p>
                            </Form.Item>
                          </div>
                        </div> : <></>
                        }
                        
                      </Space>
                    ))}
                  </>
                )}
              </Form.List>
            </Form>
          </div>
        </div>
      </div>
  

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Add Route Assignment
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <RouteAssignmentModal data={{ data, handleClose }} />
      </Modal>

      <DeleteModal
        modalOpen={deleteModals}
        setModalOpen={setDeleteModals}
        handleDelete={DeleteRouteAssignmentList}
        id={id}
      />

      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Edit Route Assignment
          <Button variant="secondary" onClick={handleCloseEdit}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <EditRouteAssignmentModal data={{ EditData, handleCloseEdit }} />
      </Modal>
    </Fragment>
  );
}
