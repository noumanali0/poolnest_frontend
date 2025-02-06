import React, { Fragment, useRef, useState } from "react";
import {
  Form,
  Select,
  Input,
  Button,
  Radio,
  Checkbox,
  ColorPicker,
} from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteFilled } from "@ant-design/icons";
import {
  postworkOrderTypeSettingData,
  resetData,
} from "../../redux/postReducer/postWorkorderSetting";
import { toast } from "react-toastify";
import {
  fetchgetfrequency,
  fetchgetfrequencyWorkOrder,
} from "../../redux/Slices/getfrequency";

const { Option } = Select;
function WorkTypeForm() {
  const form = Form.useForm()[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reccurenceData: getfrequency, statusdata } = useSelector(
    (state) => state.getfrequency
  );
  const postDataResult = useSelector(
    (state) => state.postsworkOrderTypeSetting
  );
  const [loading, setIsloading] = useState(false);

  const [descriptionCheckListValue, setdescriptionCheckListValue] =
    useState("");
  const [CheckListValue, setCheckListValue] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [needsInvoiced, setNeedsInvoiced] = useState(true);
  const [alertOffice, setAlertOffice] = useState(true);

  const [requiredPhoto, setRequiredPhoto] = useState(true);
  const [emailCustomer, setEmailCustomer] = useState(true);
  const [allowTech, setAllowTech] = useState(true);

  const [lineDescription, setLineDescription] = useState(null);
  const [lineDescriptionValue, setLineDescriptionValue] = useState();
  const [workNeeded, setworkNeeded] = useState(null);
  const [workPerformed, setworkPerformed] = useState(null);
  const [isTaxable, setIsTaxable] = useState(false);
  const [usePrice, setUsePrice] = useState(false);
  const [colorCode, setColorCode] = useState("#f0b51b"); // Initial color

  const descriptionRef = useRef(null);
  const checkListRef = useRef(null);

  const handleValues = () => {
    if (descriptionCheckListValue && CheckListValue) {
      const newItem = {
        Description: descriptionCheckListValue,
        DescriptionOnComplete: CheckListValue,
      };
      setChecklist([...checklist, newItem]);
      setdescriptionCheckListValue("");
      setCheckListValue("");
    }
  };

  const deleteItem = (index) => {
    const updatedChecklist = [...checklist];
    updatedChecklist.splice(index, 1);
    setChecklist(updatedChecklist);
  };

  const handleColorChange = (color) => {
    const metaColor = color.metaColor;

    const hexColor = `#${metaColor.toHex()}`;
    setColorCode(hexColor);
  };
  const handleRadioChange = (e) => {
    const { value } = e.target;
    setworkNeeded(value === "Work_Needed" ? "Work_Needed" : null);
    setworkPerformed(value === "Work_Performed" ? "Work_Performed" : null);
    setLineDescriptionValue(
      value === "line_item_description" ? lineDescription : null
    );
  };

  const onFinish = async (values) => {
    setIsloading(true);

    const Data = {
      color_code: colorCode,
      recurrence_id: values.recurrence_id,
      name: values.name,
      description: values.description,
      labor_cost: values.labor_cost,
      price: values.price,
      estimated_time_in_mins: values.estimated_time_in_mins,
      default_email_subject: values.default_email_subject,
      default_email_message: values.default_email_message,
      needs_invoiced: needsInvoiced,
      alert_office: alertOffice,
      photo_required: requiredPhoto,
      email_to_customer: emailCustomer,
      allow_tech: allowTech,
      line_item_name: values.line_item_name,

      line_item_description: lineDescriptionValue
        ? lineDescriptionValue
        : workNeeded
        ? workNeeded
        : workPerformed
        ? workPerformed
        : "", //optional
      line_item_price: values.line_item_price, // optional
      line_item_price_taxable: isTaxable, // optional
      use_price_from_workorder: usePrice,
      // line_item_copy_from_work_needed: workNeeded, // optional
      // line_item_copy_from_work_performed: workPerformed, // optional
      check_list: checklist,
    };

    await dispatch(postworkOrderTypeSettingData({ Data }));
    // navigate("/work-order-type")
  };

  useEffect(() => {
    if (postDataResult.data) {
      toast.success("Form submitted successfully!");
      setIsloading(false);

      dispatch(resetData());
      navigate("/work-order-type");
    }
  }, [postDataResult.data, form, navigate]);

  useEffect(() => {
    if (postDataResult.error) {
      const err = postDataResult.error;
      setIsloading(false);

      toast.error(err);
    }
  }, [postDataResult.error, form]);
  const onFinishFailed = (errorInfo) => {
    toast.error(errorInfo);
  };

  useEffect(() => {
    dispatch(fetchgetfrequencyWorkOrder());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="container-fluid modals workOrderTypee">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <div className="row cslocation">
            <div className="col-sm-12 noPad">
              <h4>Basic Info</h4>
              <div className="row editTechnicianFormAdd cslocation">
                <div className="col-sm-6">
                  <Form.Item
                    name="name"
                    rules={[{ required: true }]}
                    label="Type"
                  >
                    <Input placeholder="Type Name" />
                  </Form.Item>
                </div>

                <div className="col-sm-6 colorPicker">
                  <Form.Item
                    label="Color Code"
                    name="color_code"
                    initialValue={colorCode}
                    rules={[
                      { required: true, message: "Color Code is required" },
                    ]}
                  >
                    <ColorPicker showText onChange={handleColorChange} />
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    name="estimated_time_in_mins"
                    rules={[{ required: true }]}
                    label="Est Minute"
                  >
                    <Input placeholder="Est. Minutes" defaultValue={0} />
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    label="Reccurrs"
                    name="recurrence_id"
                    rules={[
                      { required: true, message: "Reccurrs is required" },
                    ]}
                  >
                    <Select placeholder="Reccurrs">
                      {getfrequency?.map((item) => {
                        return <Option value={item?._id}>{item?.label}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    label="Labor Cost"
                    name="labor_cost"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Labor Cost" defaultValue={0} />
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Labor Cost" defaultValue={0} />
                  </Form.Item>
                </div>
                <div className="col-sm-12">
                  <Form.Item
                    name="description"
                    rules={[{ required: true }]}
                    label="Work Order Needed Description"
                  >
                    <Input placeholder="Work Order Needed Description" />
                  </Form.Item>
                </div>

                {/* <div className="col-sm-12">
                  <Form.Item
                    name="alert_office"
                    rules={[{ required: true }]}
                    label="Est Minute"
                    type="hidden"
                    initialValue={true}
                    style={{ display: "none" }}
                  >
                    <Input placeholder="Est. Minutes" defaultValue={0} />
                  </Form.Item>
                </div>

                <div className="col-sm-12">
                  <Form.Item
                    name="photo_required"
                    rules={[{ required: true }]}
                    label="Est Minute"
                    type="hidden"
                    style={{ display: "none" }}
                    initialValue={true}
                  >
                    <Input placeholder="Est. Minutes" defaultValue={0} />
                  </Form.Item>
                </div>

                <div className="col-sm-12">
                  <Form.Item
                    name="email_to_customer"
                    rules={[{ required: true }]}
                    label="Est Minute"
                    type="hidden"
                    style={{ display: "none" }}
                    initialValue={true}
                  >
                    <Input placeholder="Est. Minutes" defaultValue={0} />
                  </Form.Item>
                </div> */}

                {/* <div className="col-sm-12">
                  <Form.Item
                    name="allow_tech"
                    rules={[{ required: true }]}
                    label="Est Minute"
                    type="hidden"
                    style={{ display: "none" }}
                    initialValue={true}
                  >
                    <Input placeholder="Est. Minutes" defaultValue={0} />
                  </Form.Item>
                </div> */}
              </div>
            </div>
          </div>

          <div className="row editTechnicianFormAdd cslocation">
            <div className="col-sm-12 workTypeSection">
              <h6>Line Item Defaults for Invoice</h6>
              <p>
                NOTE: Installed items will be listed separately on the invoice
                are set under Settings Invoicing.
              </p>
              {/* <div className="col-sm-12"> */}
              <Form.Item name="line_item_name" label="Line Item Name">
                <Input placeholder="Leave blank or use work order type name" />
              </Form.Item>
              {/* </div> */}
              <div className="row cslocation newCslocation">
                <div className="col-sm-12 workRadio">
                  <Form.Item label="Line Description" className="forPAd">
                    <Radio.Group onChange={handleRadioChange}>
                      <div className="col-sm-4">
                        <Radio value="line_item_description">
                          <Input
                            placeholder="Leave blank or Fill your own"
                            onChange={(e) =>
                              setLineDescriptionValue(e.target.value)
                            }
                          />
                        </Radio>
                      </div>
                      <div className="col-sm-4">
                        <Radio value="Work_Needed">Work Needed</Radio>
                      </div>
                      <div className="col-sm-4">
                        <Radio value="Work_Performed">Work Performed</Radio>
                      </div>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div className="col-sm-12 forBorderrr">
                  <div className="row cslocation">
                    <div className="col-sm-6">
                      <Checkbox
                        name="use_price_from_workorder"
                        checked={usePrice}
                        onChange={(e) => setUsePrice(e.target.checked)}
                      >
                        Use Price from work order
                      </Checkbox>
                    </div>

                    <div className="col-sm-6">
                      <Checkbox
                        name="line_item_price_taxable"
                        checked={isTaxable}
                        onChange={(e) => setIsTaxable(e.target.checked)}
                      >
                        Price is Taxable
                      </Checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row editTechnicianFormAdd cslocation">
            <div className="col-sm-7 ">
              <div className="row cslocation">
                <div className="col-sm-12 noPad">
                  <div className="container-fluid wordkorder workSetting">
                    <div className="col-sm-8">
                      <h3>Work Order Settings</h3>
                    </div>

                    <div className="col-sm-12 workOrderSettingggss">
                      <Form.Item name="needs_invoiced">
                        <Checkbox
                          checked={needsInvoiced}
                          onChange={(e) => setNeedsInvoiced(e.target.checked)}
                        >
                          This work needs to be invoiced
                        </Checkbox>
                      </Form.Item>
                      <Form.Item name="alert_office">
                        <Checkbox
                          checked={alertOffice}
                          onChange={(e) => setAlertOffice(e.target.checked)}
                        >
                          Alert office when work order added
                        </Checkbox>
                      </Form.Item>
                      <Form.Item name="photo_required">
                        <Checkbox
                          checked={requiredPhoto}
                          onChange={(e) => setRequiredPhoto(e.target.checked)}
                        >
                          Require a photo to finish
                        </Checkbox>
                      </Form.Item>
                      <Form.Item name="email_to_customer">
                        <Checkbox
                          checked={emailCustomer}
                          onChange={(e) => setEmailCustomer(e.target.checked)}
                        >
                          Email the customer when finished
                        </Checkbox>
                      </Form.Item>

                      <Form.Item name="allow_tech">
                        <Checkbox
                          checked={allowTech}
                          onChange={(e) => setAllowTech(e.target.checked)}
                        >
                          Allow techs to add this type
                        </Checkbox>
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 noPad">
                  <div className="container-fluid wordkorder">
                    <div className="row headwork cslocation">
                      <div className="col-sm-12">
                        <h3>Email Info </h3>
                      </div>
                      <div className="col-sm-12">
                        <Form.Item
                          label="Email Subject"
                          name="default_email_subject"
                          rules={[
                            {
                              required: true,
                              message: "Default Email Subject is required",
                            },
                          ]}
                        >
                          <Input placeholder="Default Email Subject" />
                        </Form.Item>
                      </div>
                      <div className="col-sm-12">
                        <Form.Item
                          label="Email"
                          name="default_email_message"
                          rules={[
                            {
                              required: true,
                              message: "Default Email Subject is required",
                            },
                          ]}
                        >
                          <Input.TextArea
                            placeholder="Default Email Message"
                            showCount
                            maxLength={500}
                            rows={5}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-5 checcKlisssst">
              <div className="row">
                <div className="col-sm-12">
                  <h4>Checklist</h4>
                </div>
                <div className="col-sm-5">
                  <Form.Item label="Description">
                    <input
                      type="text"
                      value={descriptionCheckListValue}
                      onChange={(e) =>
                        setdescriptionCheckListValue(e.target.value)
                      }
                    />
                  </Form.Item>
                </div>
                <div className="col-sm-5">
                  <Form.Item label="Description on complete">
                    <input
                      type="text"
                      value={CheckListValue}
                      onChange={(e) => setCheckListValue(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className="col-sm-2 buttonCol-sm-2">
                  <Button
                    onClick={handleValues}
                    className="yellowbtn"
                    style={{ marginRight: 0 }}
                  >
                    Add
                  </Button>
                </div>

                {checklist.length > 0 && (
                  <div className="container-fluid wordkorder valuesListing">
                    {checklist.map((item, index) => (
                      <div className="row" key={index}>
                        <div className="col-sm-5">
                          <p>{item.Description}</p>
                        </div>
                        <div className="col-sm-5">
                          <p>{item.DescriptionOnComplete}</p>
                        </div>
                        <div className="col-sm-2">
                          <p>
                            <DeleteFilled onClick={() => deleteItem(index)} />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-sm-12 submitbtn workBtn">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: 0 }}
                disabled={loading}
              >
                {" "}
                Save{" "}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}

export default WorkTypeForm;
