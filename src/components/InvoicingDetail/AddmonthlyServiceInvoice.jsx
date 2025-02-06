import React, { useEffect } from "react";
import { Button, Form, Input, Space, Select, DatePicker, Radio } from "antd";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useSelector } from "react-redux";
import { fetchgetLaborCost } from "../../redux/Slices/getLaborCost";
import { useDispatch } from "react-redux";
import { fetchgetitemNeededShoping } from "../../redux/Slices/getItemNeeded";

const AddItemInvoice = () => {
  const { data: getLaborCost } = useSelector((state) => state.getLaborCost);
  const { data: getitemNeededData } = useSelector(
    (state) => state.getitemNeededData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchgetLaborCost());
    dispatch(fetchgetitemNeededShoping({}));
  }, []);
  const handleSave = () => {};
  return (
    <tr>
      <td className="no-line text-center">
        <Form.Item className="editinvoice-forminput">
          <DatePicker
            placeholder="Service date"
            className="editinvoice-input"
          />
        </Form.Item>
      </td>
      <td className="no-line text-center">
        <Form.Item className="editinvoice-forminput">
          <select placeholder="Labot Cost Type" className="customselect-css">
            {getLaborCost?.map((item) => {
              return <option value={item._id}>{item.label}</option>;
            })}
          </select>
        </Form.Item>
      </td>
      <td className="no-line text-center">
        <Form.Item className="editinvoice-forminput">
          <Input
            placeholder="Description 1"
            type="text"
            className="editinvoice-input"
          />
        </Form.Item>
      </td>
     
      <td className="no-line text-center">
        {" "}
        <Form.Item className="editinvoice-forminput">
          <Input placeholder="Rate" type="text" className="editinvoice-input" />
        </Form.Item>
      </td>
      <td className="no-line text-center">
        {" "}
        <Form.Item className="editinvoice-forminput">
          <Input
            placeholder="Quantity"
            type="text"
            className="editinvoice-input"
          />
        </Form.Item>
      </td>
      <td className="no-line text-center">
        {" "}
        <Form.Item className="editinvoice-forminput">
          <Input
            placeholder="Price"
            type="text"
            className="editinvoice-input"
          />
        </Form.Item>
      </td>
      <td></td>
      <td className="text-center">
        <strong>17%</strong>
      </td>
      <td className="text-center">Unpaid</td>
      <td>
        <MdOutlineSaveAlt onClick={handleSave} className="addnewlist" />
      </td>
    </tr>
  );
};

export default AddItemInvoice;
