import React, { useState, useEffect } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateRateTaxPostData,
  postRateTaxPostData,
} from "../../redux/postReducer/postRateTax";
import { fetchSalesAllTax, fetchSalesTax } from "../../redux/Slices/getSaleTax";
import { fetchSalesTaxGroup } from "../../redux/Slices/getSaleGroup";

const AddProductTypeForm = ({ data1 }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState();

  const { data: SalesTax, status } = useSelector((state) => state.SalesTax);

  const [selectedIds, setSelectedIds] = useState([]);
  const [totalRate, setTotalRate] = useState(0);

  const calculateTotalRate = (selectedIds) => {
    // Calculate total rate for selected items
    const newTotalRate = selectedIds.reduce((acc, selectedId) => {
      const selectedItem = SalesTax.items?.find(
        (item) => item._id === selectedId
      );
      return acc + (selectedItem ? selectedItem.Rate : 0);
    }, 0);

    return newTotalRate;
  };

  const handleCheckboxChange = (id, rate, checked) => {
    let newSelectedIds;

    if (checked) {
      newSelectedIds = [...selectedIds, id];
    } else {
      newSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
    }

    setSelectedIds(newSelectedIds);

    // Update total rate
    const newTotalRate = calculateTotalRate(newSelectedIds);
    setTotalRate(newTotalRate);
  };
  console.log(data1, "data1");
  useEffect(() => {
    setFormData({
      name: data1?.Data?.name,
      Rate: data1?.Data?.SalesTaxGroupSalesTaxId?.Rate,
    });
  }, [data1]);
  console.log(data1, "<====data1");
  const onFinish = async (values, key) => {
    const id = data1?.Data?._id;
    values.SalesTaxGroup = selectedIds;

    const value = {
      name: values.name,
      SalesTaxGroup: selectedIds,
    };

    await dispatch(UpdateRateTaxPostData({ id, value }));
  


    dispatch(fetchSalesTax({}));
    const currentPage = 1 
    dispatch(fetchSalesTaxGroup({ currentPage }));
    data1.handleClose();
  };
  console.log(data1, "cha;ja");
  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

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

  form.setFieldsValue({
    id: formData?.id,
    name: formData?.name,
    Rate: formData?.Rate,
  });
  useEffect(() => {
    // Calculate initial total rate based on default selected items
    const initialSelectedIds =
      data1?.Data?.SalesTaxGroupSalesTaxGroupNameId?.map(
        (item) => item.SalesTaxGroupSalesTaxId._id
      ) || [];
    const initialTotalRate = calculateTotalRate(initialSelectedIds);
    setSelectedIds(initialSelectedIds);
    setTotalRate(initialTotalRate);
  }, [data1]);
  useEffect(() => {
    dispatch(fetchSalesAllTax());
  }, [dispatch]);

  return (
    <div className="row fomik addRoute taxratee">
      <Form
        name="Customer"
        form={form}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onFinish={onFinish}
      >
        <div className="row cslocation">
          <div className="col-sm-12">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input Name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </div>
          <div className="col-sm-12">
            <p className="selectrateinput">Select Rate</p>
          </div>
          {SalesTax?.items?.map((item, i) => (
            <div className="col-sm-6 workOrderSettingggss">
              <Form.Item name={item._id} valuePropName="checked" key={i}>
                <Checkbox
                  onChange={(e) =>
                    handleCheckboxChange(item._id, item.Rate, e.target.checked)
                  }
                  defaultChecked={
                    data1?.Data?.SalesTaxGroupSalesTaxGroupNameId?.some(
                      (group) =>
                        group?.SalesTaxGroupSalesTaxId?._id === item._id
                    ) || false
                  }
                >
                  {item.name}
                </Checkbox>
              </Form.Item>
            </div>
          ))}
 
          <div className="col-sm-12">
            <p className="selectrateinput">Total Combined Rate: {totalRate} %</p>
          </div>
          <div className="col-sm-12 savebtn addProductType taxRate">
            <Form.Item>
              <Button className="yellowbtn" type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddProductTypeForm;
