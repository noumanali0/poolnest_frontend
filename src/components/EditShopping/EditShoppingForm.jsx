import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Input, Select, Spin } from "antd";
import Autosuggest from "react-autosuggest";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { fetchgetProductType } from "../../redux/Slices/getProductType";
import { fetchAllgetCustomers } from "../../redux/Slices/getCustomer";
import { fetchgetCustomerServices } from "../../redux/Slices/getCustomerService";
import { fetchwaterbody } from "../../redux/Slices/getWaterBody";
import {
  postShopinglistData,
  resetData,
  updateShopinglistData,
} from "../../redux/postReducer/postShopingList";
import { fetchSingleitemNeededShoping } from "../../redux/Slices/getItemNeeded";

export default function ShoppingForm() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(11);
  const [first_name, setFirst_name] = useState("");
  const [dataShow, setShowData] = useState("inventory");
  const [saveData, setSaveData] = useState("");
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({});

  const { data: getProductData } = useSelector((state) => state.getProductData);
  const { data: getitemNeededData } = useSelector(
    (state) => state.getitemNeededData
  );
  const { data: getCustomerService } = useSelector(
    (state) => state.getCustomerService
  );
  const { data: getCustomer, loading: customerLoading } = useSelector(
    (state) => state.getCustomer
  );
  const { data: waterbody } = useSelector((state) => state.waterbody);
  const { data, loading, success, error } = useSelector(
    (state) => state.postShopinglist
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleitemNeededShoping({ id }));
    dispatch(fetchgetProductType());
  }, [dispatch, id]);

  useEffect(() => {
    setFormData({
      name: getitemNeededData?.name,
      price: getitemNeededData?.price || "",
      quantity: getitemNeededData?.quantity || "",
      description: getitemNeededData?.description || "",
    });
  }, [getitemNeededData]);

  const getSuggestions = (input) => {
    const filteredSuggestions =
      getProductData?.items?.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      ) || [];
    setSuggestions(filteredSuggestions);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setSaveData(suggestion);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Search",
    value,
    onChange,
  };

  const onFinish = async (values) => {
    const Data = {
      name: values?.name,
      quantity: values?.Quantity,
      description: values?.description,
      price: values?.price,
      waterbody_id: values?.WaterBody_id,
    };
    await dispatch(updateShopinglistData({ Data, id }));
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      navigate("/shopping-list");
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [success, error, dispatch, navigate]);

  const handleSearch = debounce((value) => {
    setFirst_name(value);
    setCurrentPage(11);
  }, 300);

  useEffect(() => {
    dispatch(fetchAllgetCustomers({ currentPage, first_name }));
  }, [dispatch, currentPage, first_name]);

  const handleScroll = (event) => {
    const { target } = event;
    if (
      target.scrollTop + target.offsetHeight === target.scrollHeight &&
      !customerLoading
    ) {
      if (currentPage < getCustomer?.totalCount) {
        setCurrentPage((prevPage) => prevPage + currentPage);
      }
    }
  };

  const CustomerSelect = (id) => {
    dispatch(fetchgetCustomerServices({ id }));
  };

  const LocationSelect = (ServiceLocationID) => {
    dispatch(fetchwaterbody({ ServiceLocationID }));
  };

  useEffect(() => {
    form.setFieldsValue({
      name: formData?.name,
      price: formData?.price || "",
      quantity: formData?.quantity || "",
      description: formData?.description || "",
    });
  }, [formData, form]);

  const handleChangeData = (e) => {
    setShowData(e);
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  return (
    <Fragment>
      <div className="row fomik customer shoppinfgForm cslocation">
        <Form
          name="Customer"
          onValuesChange={handleFormValuesChange}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={formData}
        >
          <div className="row cslocation">
            <div className="col-sm-12">
              <Form.Item name="name" label="Item">
                <Input placeholder="Name" />
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item name="Assignto" label="Assign to">
                <Select
                  defaultValue="inventory"
                  placeholder="Assign to"
                  onChange={handleChangeData}
                >
                  <Option value="inventory">Inventory</Option>
                  <Option value="Customer">Customer</Option>
                </Select>
              </Form.Item>
            </div>
            {dataShow !== "inventory" && (
              <>
                <div className="col-sm-6">
                  <Form.Item name="Assign Customer" label="Select Customer">
                    <Select
                      showSearch
                      onSearch={handleSearch}
                      placeholder="Select Customer"
                      onPopupScroll={handleScroll}
                      filterOption={false}
                      notFoundContent={
                        customerLoading ? <Spin size="small" /> : null
                      }
                    >
                      {getCustomer?.items?.map((item) => (
                        <Option key={item._id} value={item._id}>
                          {item.first_name} {item.last_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    name="Assign Location"
                    label="Select Service Location"
                  >
                    <Select
                      onChange={LocationSelect}
                      placeholder="Select Location"
                    >
                      {getCustomerService?.map((item) => (
                        <Option key={item._id} value={item._id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item name="WaterBody_id" label="Select WaterBody">
                    <Select placeholder="Select WaterBody">
                      {waterbody?.map((item) => (
                        <Option key={item._id} value={item._id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </>
            )}
            <div className="col-sm-6">
              <Form.Item name="description" label="Description">
                <Input placeholder="Part Description" />
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item name="quantity" label="Quantity">
                <Input
                  placeholder="Quantity"
                  defaultValue={0}
                  onKeyPress={(e) => {
                    if (!/^\d*\.?\d*$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item name="price" label="Price">
                <Input
                  placeholder="Price"
                  onKeyPress={(e) => {
                    if (!/^\d*\.?\d*$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </div>
            <div className="col-sm-12 savebtn editShoppingFormSaveBtn">
              <Form.Item>
                <Button
                  loading={loading}
                  disabled={loading}
                  className="yellowbtn"
                  type="primary"
                  htmlType="submit"
                >
                  Save
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}
