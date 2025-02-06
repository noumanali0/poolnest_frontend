import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Input, Select, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Autosuggest from "react-autosuggest";
import debounce from "lodash/debounce";
import { fetchgetProductType } from "../../redux/Slices/getProductType";
import {
  postShopinglistData,
  resetData,
} from "../../redux/postReducer/postShopingList";
import { fetchAllgetCustomers } from "../../redux/Slices/getCustomer";
import { fetchgetCustomerServices } from "../../redux/Slices/getCustomerService";
import { fetchwaterbody } from "../../redux/Slices/getWaterBody";

export default function ShoppingForm({ type }) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [DataShow, setShowData] = useState("inventory");
  const [saveData, setsaveData] = useState("");
  const { data: getProductData } = useSelector((state) => state.getProductData);
  const { data: getCustomerService } = useSelector(
    (state) => state.getCustomerService
  );
  const { data: getCustomer, loading: customerLoading } = useSelector(
    (state) => state.getCustomer
  );
  const { data: waterbody } = useSelector((state) => state.waterbody);
  const { loading, success, error } = useSelector(
    (state) => state.postShopinglist
  );
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(11);
  const [first_name, setfirst_name] = useState("");

  useEffect(() => {
    dispatch(fetchgetProductType({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllgetCustomers({ first_name }));
  }, [dispatch, first_name]);

  const handleSearch = debounce((value) => {
    setfirst_name(value);
    setCurrentPage(11); // Reset to the first page on new search
  }, 300);

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

  const handleCustomer = (id) => {
    dispatch(fetchgetCustomerServices({ id }));
  };

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
    form.setFieldsValue({ name: suggestion.name });
    setsaveData(suggestion);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Search Items",
    value,
    onChange,
  };

  const onFinish = async (values) => {
    const Data = {
      name: saveData?.name === undefined ? value : saveData?.name,
      quantity: values.Quantity === undefined ? 1 : values.Quantity,
      description: values.description,
      price: values.price,
      waterbody_id: values?.WaterBody_id,
    };
    await dispatch(postShopinglistData({ Data }));
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

  const LocationSelect = (ServiceLocationID) => {
    dispatch(fetchwaterbody({ ServiceLocationID }));
  };

  useEffect(() => {
    setFormData({
      description: saveData?.description || "",
      price: saveData?.price,
    });
  }, [saveData]);

  const handleChangeData = (e) => {
    setShowData(e);
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  return (
    <Fragment>
      <div className="row fomik customer cslocation shoppinfgForm">
        <Form
          name="Customer"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="row cslocation">
            <div className="col-sm-12">
              <Form.Item name="name" label="Item">
                <Select
                  showSearch
                  placeholder="Select an Item"
                  optionFilterProp="children" // Enables filtering based on option text
                  onChange={(value, option) => {
                    setsaveData(option.item); // Store the selected item data
                    form.setFieldsValue({ name: option.children }); // Update form field
                  }}
                >
                  {getProductData?.items?.map((item) => (
                    <Select.Option key={item.id} value={item.name} item={item}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item name="Assignto" label="Assign to">
                <Select
                  defaultValue={"inventory"}
                  placeholder="Assign to"
                  onChange={handleChangeData}
                >
                  <Option value="inventory">Inventory</Option>
                  <Option value="Customer">Customer</Option>
                </Select>
              </Form.Item>
            </div>

            {DataShow !== "inventory" && (
              <>
                <div className="col-sm-6">
                  <Form.Item
                    name="Assign Customer"
                    label="Select Customer"
                    rules={[{ required: true, message: "Please input Name!" }]}
                  >
                    <Select
                      showSearch
                      onSearch={handleSearch}
                      placeholder="Select Customer"
                      onPopupScroll={handleScroll}
                      filterOption={false}
                      onChange={handleCustomer}
                      notFoundContent={
                        customerLoading ? <Spin size="small" /> : null
                      }
                    >
                      {getCustomer?.items?.map((item) => (
                        <Option key={item._id} value={item._id}>
                          {item.first_name + " " + item.last_name}
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

            <div className="col-sm-6 shoppingFormDesc">
              <Form.Item name="description" label="Description">
                <Input placeholder="Part Description" />
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item name="Quantity" label="Quantity">
                <Input placeholder="Quantity" defaultValue={0} />
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please input Name!" }]}
                onKeyPress={(e) => {
                  if (!/^\d*\.?\d*$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              >
                <Input placeholder="Price" />
              </Form.Item>
            </div>

            <div className="col-sm-12 savebtn">
              <Form.Item>
                <Button
                  className="yellowbtn"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}
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
