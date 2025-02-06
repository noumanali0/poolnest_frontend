import React, { Fragment, useState } from "react";
import Trash from "../../assets/img/Trash.png";
import Create from "../../assets/img/Create.png";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, DatePicker } from "antd";
import Switch from "antd/lib/switch";
import Modal from "react-bootstrap/Modal";
import EquipmentModal from "./EquipmentModal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetPoolEquipmemnt } from "../../redux/Slices/getEquipment";
import {
  DeletewaterbodyEquipmenttData,
  resetData,
} from "../../redux/postReducer/postEquipment";
import DeleteModal from "../Modals/DeleteModal";
import { toast } from "react-toastify";

export default function Servicelist({ data }) {
  // const Equiptment = data?.Equipment;

  const Equiptment = data?.getEquipmemnt;
  const waterbody_id = data?.singlewaterbody?._id;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { loading, error, success } = useSelector(
    (state) => state.postwaterbodyequipmwnt
  );

  const [Edit, setEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = async (data) => {
    setShowEdit(true);
    setEdit(data);
  };

  const [id, setId] = useState();
  const [deleteModaaal, setDeleteModaaal] = useState(false);
  const handleDelete = (datas, key) => {
    setId(datas?._id);
    setDeleteModaaal(true);
  };

  const form = Form.useForm()[0];

  const propsdata = data;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    Equipment: Equiptment,
  });

  useEffect(() => {
    if (Equiptment && Equiptment) {
      form.setFieldsValue({
        Equipment: Equiptment.map((location, index) => ({
          name: location?.EquipmentWaterBodyEquipmentData?.name,
          description: location?.EquipmentWaterBodyEquipmentData?.description,
          key: index.toString(),
        })),
      });
    }
  }, [Equiptment]);

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const DeleteEquiptmentList = async (datas, key) => {
    await dispatch(DeletewaterbodyEquipmenttData({ id }));
    dispatch(fetchgetPoolEquipmemnt({ waterbody_id }));
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
    toast.error("Please fill all required fields!");
  };
  const onFinish = (values) => {};

  return (
    <Fragment>
      <div className="container-fluid wordkorder">
        <div className="row headwork">
          <div className="col-sm-8">
            <h3>Equipment</h3>
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
              initialValue={formData.Equipment}
            >
              <Form.List name="Equipment">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <div className="row slignc">
                          <div className="col-sm-10">
                            <Form.Item
                              {...restField}
                              name={[name, "name"]}
                              label="Name"
                            >
                              <Input readOnly placeholder="name" />
                            </Form.Item>
                          </div>

                          <div className="col-sm-1">
                            {/* <p className="wbtn" onClick={() => handleShowEdit(Equiptment[key],key)}>
                              <img src={Create} style={{cursor:"pointer"}}/>
                            </p>  */}
                          </div>

                          <div className="col-sm-1">
                            <Form.Item>
                              <p
                                style={{ cursor: "pointer" }}
                                type="secondary"
                                className="wbtn"
                                onClick={() =>
                                  handleDelete(Equiptment[key], key)
                                }
                              >
                                <img src={Trash} />
                              </p>
                            </Form.Item>
                          </div>
                          <div className="col-sm-1"></div>
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
          Add Equipment
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <EquipmentModal
          data1={{ handleClose, propsdata }}
          Equiptment={Equiptment}
        />
      </Modal>

      <DeleteModal
        modalOpen={deleteModaaal}
        setModalOpen={setDeleteModaaal}
        handleDelete={DeleteEquiptmentList}
        id={id}
      />
    </Fragment>
  );
}
