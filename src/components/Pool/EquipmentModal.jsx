import React, { useState } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import {
  postwaterbodyequipmwntData,
  resetData,
} from "../../redux/postReducer/postEquipment";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetPoolEquipmemnt } from "../../redux/Slices/getEquipment";
import { useEffect } from "react";
import { fetchgetAllEquipmemnt } from "../../redux/Slices/getAllEquipment";
import { FaPlus } from "react-icons/fa";
import EquipmentFormModal from "../AddEquipment/EquipmentForm";
import { Modal } from "react-bootstrap";

const EquipmentForm = ({ data1, Equiptment }) => {
  console.log(Equiptment, "Equiptment");
  const [form] = Form.useForm();
  const [Equipment, setEquipment] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { loading, error, successpost } = useSelector(
    (state) => state.postwaterbodyequipmwnt
  );

  const dispatch = useDispatch();
  const postDataResult = useSelector((state) => state.getAllEquipmemnt);

  useEffect(() => {
    dispatch(fetchgetAllEquipmemnt({}));
  }, [dispatch]);

  const waterbody_id = data1?.propsdata?.singlewaterbody?._id;

  const onFinish = async () => {
    const Data = {
      waterbody_id: waterbody_id,
      equipment_id: Equipment,
    };
    await dispatch(postwaterbodyequipmwntData({ Data }));
  };

  useEffect(() => {
    if (successpost) {
      toast.success(successpost);
      dispatch(fetchgetPoolEquipmemnt({ waterbody_id }));
      dispatch(resetData());
      data1.handleClose();
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, successpost]);

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  return (
    <div className="row fomik addRoute taxratee equipmentModaalllll">
      <Form
        name="Customer"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        disabled={false}
      >
        <div className="row">
          <div className="col-sm-9">
            <Form.Item
              label="Equiptment Name"
              name="equiptment"
              rules={[{ required: true, message: "equiptment is required" }]}
            >
              <Select onChange={setEquipment} placeholder="Equipment">
                {postDataResult?.data?.items?.map((item) => {
                  const isDisabled = Equiptment.some(
                    (eq) => eq.equipment_id === item._id
                  );
                  return (
                    <Option
                      value={item._id}
                      key={item._id}
                      disabled={isDisabled}
                    >
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>

          <div className="col-sm-3">
            <FaPlus className="addviewbtn" onClick={handleShow} />
          </div>

          <div className="col-sm-12 savebtn addProductType taxRate">
            <Form.Item>
              <Button
                disabled={loading}
                className="yellowbtn"
                type="primary"
                htmlType="submit"
              >
                Save Equipment
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Add Equipment
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <EquipmentFormModal data1={handleClose} />
      </Modal>
    </div>
  );
};

export default EquipmentForm;
