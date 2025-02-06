import React, { Fragment, useEffect, useState } from "react";
import Trash from "../../assets/img/Trash.png";
import Create from "../../assets/img/Create.png";
import { Button, Form, Input, Space, DatePicker } from "antd";
import Modal from "react-bootstrap/Modal";
import WorkorderModal from "./WorkorderModal";
import EditWorkOrderModal from "./EditWorkOrder";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetWorkOrderByWaterBody } from "../../redux/Slices/getWorkorder";
import {
  DeletewaterbodyWorkOrdertData,
  resetData,
} from "../../redux/postReducer/postWorkorder";
import { toast } from "react-toastify";
import DeleteModal from "../Modals/DeleteModal";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function Workorder({ data }) {
  const navigate = useNavigate();

  const WorkOrder = data;
  const { loading, error, success } = useSelector(
    (state) => state.postworkorder
  );

  const { data: singlewaterbody } = useSelector(
    (state) => state.singlewaterbody
  );
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const [deleteId, setDeleteID] = useState();
  const [deleteModals, setDeleteModals] = useState(false);
  const handleDeleteModalShow = (datas, key) => {
    setDeleteID(datas?._id);
    setDeleteModals(true);
  };

  const waterbody_id = singlewaterbody?._id;

  const [selectedDate, setSelectedDate] = useState(null);

  const [showEdit, setShowEdit] = useState(false);
  const [EditData, setEditData] = useState("");
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (data) => {
    setShowEdit(true);
    setEditData(data);
  };

  const form = Form.useForm()[0];

  const [formData, setFormData] = useState({
    WorkOrder: WorkOrder,
  });

  useEffect(() => {
    if (WorkOrder && WorkOrder) {
      form.setFieldsValue({
        WorkOrder: WorkOrder?.data?.map((location, index) => ({
          work_needed: location?.work_needed,
          tech_name:
            location?.TechnicianData?.first_name +
            " " +
            location?.TechnicianData?.last_name,
          work_needed_type: location?.WorkOrderTypeData?.name,
          price: location?.price,
          // start_date: moment(location?.service_date)?.format('l'),
          key: index.toString(),
        })),
      });
    }
  }, [WorkOrder]);

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const DeleteWorkOrderList = async () => {
    await dispatch(DeletewaterbodyWorkOrdertData({ deleteId }));
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(fetchgetWorkOrderByWaterBody({ waterbody_id }));
      dispatch(resetData());
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };
  const onFinish = (values) => {};
  const WorkOrderHistory = (id) => {
    navigate(`/customer-workorder-history/${id}`);
  };

  return (
    <Fragment>
      <div className="container-fluid wordkorder">
        <div className="row headwork">
          <div className="col-sm-8">
            <h3>Work Order</h3>
          </div>
          {/* <div className='col-sm-2 history'>
            
          </div>
          <div className='col-sm-2'>
          <h3>History</h3>
          </div> */}
        </div>

        <div className="row checklistdata">
          <div className="row fomik dynamic_form_nest_item">
            <div className="row workaddbtn">
              <div className="col-sm-12 btns new-margin">
                <Form.Item>
                  {singlewaterbody?.WorkOrderCount == 0 ? (
                    <Button className="wbtn  disable-work" block>
                      Past Workorder
                    </Button>
                  ) : (
                    <Button
                      onClick={() => WorkOrderHistory(singlewaterbody._id)}
                      className="wbtn"
                      block
                    >
                      Past Workorder
                    </Button>
                  )}
                </Form.Item>
              </div>
              <div className="col-sm-12 btns new-margin">
                <Form.Item>
                  <Button
                    disabled={false}
                    className="wbtn"
                    onClick={handleShow}
                    block
                  >
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
              initialValue={formData.WorkOrder}
            >
              <Form.List name="WorkOrder">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <div className="row slignc">
                          <div className="col-sm-2">
                            <Form.Item
                              {...restField}
                              name={[name, "tech_name"]}
                              label="Tech Name"
                              rules={[
                                {
                                  required: true,
                                  message: "Work Needed Tech Missing",
                                },
                              ]}
                            >
                              <Input readOnly placeholder="Tech name " />
                            </Form.Item>
                          </div>

                          <div className="col-sm-2">
                            <Form.Item
                              {...restField}
                              name={[name, "work_needed"]}
                              label="Work Needed"
                              rules={[
                                {
                                  required: true,
                                  message: "Work Needed Description Missing",
                                },
                              ]}
                            >
                              <Input readOnly placeholder="name " />
                            </Form.Item>
                          </div>

                          <div className="col-sm-3">
                            <Form.Item
                              {...restField}
                              name={[name, "work_needed_type"]}
                              label="Work Needed Type"
                            >
                              <Input readOnly placeholder="name " />
                            </Form.Item>
                          </div>

                          <div className="col-sm-3">
                            <Form.Item
                              name={[name, "price"]}
                              label="Price"
                              rules={[
                                {
                                  required: true,
                                  message: "Work Needed Price Missing",
                                },
                              ]}
                            >
                              <Input readOnly placeholder="price" />
                            </Form.Item>
                          </div>

                          <div className="col-sm-1">
                            <p
                              className="wbtn"
                              onClick={() =>
                                handleShowEdit(WorkOrder?.data[key])
                              }
                            >
                              <img src={Create} style={{ cursor: "pointer" }} />
                            </p>
                          </div>

                          <div className="col-sm-1">
                            <Form.Item>
                              <p
                                disabled={loading}
                                style={{ cursor: "pointer" }}
                                type="secondary"
                                className="wbtn"
                                onClick={() =>
                                  handleDeleteModalShow(
                                    WorkOrder?.data[key],
                                    key
                                  )
                                }
                              >
                                <img src={Trash} />
                              </p>
                            </Form.Item>
                          </div>
                          {/* <div className="col-sm-1"></div> */}
                        </div>
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
          Add Work Order
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <WorkorderModal data={handleClose} />
      </Modal>

      <DeleteModal
        modalOpen={deleteModals}
        setModalOpen={setDeleteModals}
        handleDelete={DeleteWorkOrderList}
        id={deleteId}
      />

      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Edit Work Order
          <Button variant="secondary" onClick={handleCloseEdit}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <EditWorkOrderModal data={{ EditData, handleCloseEdit }} />
      </Modal>
    </Fragment>
  );
}
