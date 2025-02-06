import React, { Fragment, useState } from "react";
import Trash from "../../assets/img/Trash.png";
import Create from "../../assets/img/Create.png";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, DatePicker } from "antd";
import Switch from "antd/lib/switch";
import Modal from "react-bootstrap/Modal";
import ServiceListModal from "./ServiceCheckListModal";
import EditServiceListModal from "./EditServiceListModal";
import RetriveCheckListModal from "./RetriveCheckListModal";
import {
  fetchgetserviceCheckList,
  fetchgetserviceCheckListSpecificToWaterBody,
} from "../../redux/Slices/getserviceCheckList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteGenericCheckListFromWaterBody,
  resetData,
} from "../../redux/postReducer/postServiceCheckList";
import DeleteModal from "../Modals/DeleteModal";
import { toast } from "react-toastify";

export default function Servicelist({ data }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { loading, error, success } = useSelector(
    (state) => state.postserviceCheckList
  );

  const [showRetrive, setShowRetrive] = useState(false);
  const handleCloseRetrive = () => setShowRetrive(false);
  const handleShowRetrive = () => setShowRetrive(true);

  const [Edit, setEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = async (data) => {
    setShowEdit(true);
    setEdit(data);
  };

  const [CheckListId, setCheckListId] = useState();
  const [deleteModaaal, setDeleteModaaal] = useState(false);
  const handleDelete = async (id, key) => {
    await setCheckListId(id);
    setDeleteModaaal(true);
  };

  const waterbody_id = data?.singlewaterbody?._id;
  const form = Form.useForm()[0];

  const propsdata = data;
  const dispatch = useDispatch();
  const { data: getserviceCheckList, status } = useSelector(
    (state) => state.getserviceCheckList
  );

  const [formData, setFormData] = useState({
    ServiceCheckList: getserviceCheckList?.items,
  });

  useEffect(() => {
    if (getserviceCheckList && getserviceCheckList) {
      form.setFieldsValue({
        ServiceCheckList: getserviceCheckList?.items?.map(
          (location, index) => ({
            description: location.Description,
            description_on_complete: location.DescriptionOnComplete,
            key: index.toString(),
          })
        ),
      });
    }
  }, [getserviceCheckList]);

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const DeleteCheckList = async () => {
    await dispatch(
      DeleteGenericCheckListFromWaterBody({ waterbody_id, CheckListId })
    );
    dispatch(fetchgetserviceCheckListSpecificToWaterBody({ waterbody_id }));
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
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

  return (
    <Fragment>
      <div className="container-fluid wordkorder">
        <div className="row headwork">
          <div className="col-sm-8">
            <div className="Retrive_btn_css">
              <h3>Service Check List</h3>
              {getserviceCheckList?.DeletedCheckList?.length > 0 ? (
                <button className="bluebtn" onClick={handleShowRetrive}>
                  Retrieve CheckList
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>

        <div className="row checklistdata">
          <div className="row fomik dynamic_form_nest_item">
            <div className="row workaddbtn">
              <div className="col-sm-12 btns">
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
              initialValue={formData.ServiceCheckList}
            >
              {getserviceCheckList &&
                getserviceCheckList?.DefaultCheckList?.map((item, key) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <div className="row slignc">
                      <div className="col-sm-5">
                        <Form.Item label="Description">
                          <Input
                            value={item?.Description}
                            readOnly
                            placeholder="Description "
                          />
                        </Form.Item>
                      </div>

                      <div className="col-sm-5">
                        <Form.Item
                          label="Description on Complete"
                          defaultValue={item?.DescriptionOnComplete}
                        >
                          <Input
                            value={item?.DescriptionOnComplete}
                            readOnly
                            placeholder="Description on Complete"
                          />
                        </Form.Item>
                      </div>

                      <div className="col-sm-1">
                        <p
                          className="wbtn"
                          onClick={() => handleShowEdit(item, key)}
                        >
                          <img src={Create} style={{ cursor: "pointer" }} />
                        </p>
                      </div>

                      <div className="col-sm-1">
                        <Form.Item>
                          <p
                            style={{ cursor: "pointer" }}
                            type="secondary"
                            className="wbtn"
                            onClick={() => handleDelete(item?._id, key)}
                          >
                            <img src={Trash} />
                          </p>
                        </Form.Item>
                      </div>
                    </div>
                  </Space>
                ))}
              {getserviceCheckList &&
                getserviceCheckList?.ServiceCheckList?.map((item, key) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <div className="row slignc">
                      <div className="col-sm-5">
                        <Form.Item label="Description">
                          <Input
                            value={item?.Description}
                            readOnly
                            placeholder="Description "
                          />
                        </Form.Item>
                      </div>

                      <div className="col-sm-5">
                        <Form.Item
                          label="Description on Complete"
                          defaultValue={item?.DescriptionOnComplete}
                        >
                          <Input
                            value={item?.DescriptionOnComplete}
                            readOnly
                            placeholder="Description on Complete"
                          />
                        </Form.Item>
                      </div>

                      <div className="col-sm-1">
                        <p
                          className="wbtn"
                          onClick={() => handleShowEdit(item, key)}
                        >
                          <img src={Create} style={{ cursor: "pointer" }} />
                        </p>
                      </div>

                      <div className="col-sm-1">
                        <Form.Item>
                          <p
                            style={{ cursor: "pointer" }}
                            type="secondary"
                            className="wbtn"
                            onClick={() => DeleteCheckList(item?._id, key)}
                          >
                            <img src={Trash} />
                          </p>
                        </Form.Item>
                      </div>
                    </div>
                  </Space>
                ))}
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
          Add Service
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X
          </Button>
        </Modal.Body>
        <ServiceListModal data1={{ handleClose, propsdata }} />
      </Modal>

      <Modal
        show={showRetrive}
        onHide={handleCloseRetrive}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Retrive CheckList
          <Button variant="secondary" onClick={handleCloseRetrive}>
            {" "}
            X
          </Button>
        </Modal.Body>
        <RetriveCheckListModal
          data1={{ handleCloseRetrive, getserviceCheckList }}
        />
      </Modal>

      <DeleteModal
        modalOpen={deleteModaaal}
        setModalOpen={setDeleteModaaal}
        handleDelete={DeleteCheckList}
        id={CheckListId}
      />
      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Edit Service
          <Button variant="secondary" onClick={handleCloseEdit}>
            {" "}
            X
          </Button>
        </Modal.Body>
        <EditServiceListModal data1={{ handleCloseEdit, Edit, waterbody_id }} />
      </Modal>
    </Fragment>
  );
}
