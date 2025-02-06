import { Button, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetProductByType } from "../../redux/Slices/getProduct";
import { Modal } from "react-bootstrap";
import AddProductTypeForm from "../AddProductType/AddProductTypeForm";

const ShoppingDropDown = ({ setType }) => {
  const dispatch = useDispatch();

  const { data: getProductType } = useSelector((state) => state.getProductType);

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const currentPage = 1;
  const handleChange = (item_type_id) => {
    dispatch(fetchgetProductByType({ item_type_id, currentPage }));
  };

  return (
    <div className="row shoppingDropDown cslocation">
      <div className="col-sm-12">
        <Button
          disabled={false}
          className="AddNewTypeBtnWorkOrder"
          onClick={handleShow}
          block
        >
          + Add New Type
        </Button>
        <Form.Item
          name="name"
          label="Item Type"
          // rules={[{ required: true, message: "Please input name" }]}
        >
          <Select
            placeholder="Select Type"
            onChange={handleChange}
            showSearch
            filterOption={filterOption}
          >
            {getProductType &&
              getProductType?.items?.map((item) => {
                return <Option value={item._id}>{item.name}</Option>;
              })}
          </Select>
        </Form.Item>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Add Item Type
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <AddProductTypeForm data={handleClose} />
      </Modal>
    </div>
  );
};

export default ShoppingDropDown;
