import React, { Fragment, useState } from "react";
import {
  Form,
  Select,
  Input,
  Button,
  Radio,
  Checkbox,
  ColorPicker,
} from "antd";
import { fetchgetfrequencyWorkOrder } from "../../redux/Slices/getfrequency";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteFilled } from "@ant-design/icons";
import {
  editWorkOrderTypeData,
  resetData,
} from "../../redux/postReducer/postWorkorderSetting";
import { toast } from "react-toastify";

const { Option } = Select;
function EditWorkTypeForm({ state }) {
  const form = Form.useForm()[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { reccurenceData: getfrequency, statusdata } = useSelector(
    (state) => state.getfrequency
  );
  const postDataResult = useSelector(
    (state) => state.postsworkOrderTypeSetting
  );

  const [descriptionCheckListValue, setdescriptionCheckListValue] =
    useState("");
  const [CheckListValue, setCheckListValue] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [needsInvoiced, setNeedsInvoiced] = useState(false);
  const [alertOffice, setAlertOffice] = useState(false);

  const [requiredPhoto, setRequiredPhoto] = useState(false);
  const [emailCustomer, setEmailCustomer] = useState(false);
  const [allowTech, setAllowTech] = useState(false);

  const [lineDescription, setLineDescription] = useState(null);
  const [lineDescriptionValue, setLineDescriptionValue] = useState();
  const [workNeeded, setworkNeeded] = useState(false);
  const [workPerformed, setworkPerformed] = useState(false);
  const [isTaxable, setIsTaxable] = useState(false);
  const [usePrice, setUsePrice] = useState(false);
  const [colorCode, setColorCode] = useState(""); // Initial color

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
    setworkNeeded(value === "line_item_copy_from_work_needed" ? true : false);
    setworkPerformed(
      value === "line_item_copy_from_work_performed" ? true : false
    );

    setLineDescription(
      value === "line_item_description" ? lineDescription : ""
    );
  };

  useEffect(() => {
    dispatch(fetchgetfrequencyWorkOrder());
  }, [dispatch]);
  /* eslint-enable no-template-curly-in-string */
  const onFinish = (values) => {
    values.color_code = colorCode ? colorCode : state?.id?.color_code;
    values.line_item_price_taxable = isTaxable;
    const id = state?.id?._id;

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

      line_item_description: values.line_item_description, //optional
      line_item_price: values.line_item_price, // optional
      line_item_price_taxable: isTaxable, // optional
      use_price_from_workorder: usePrice,
      line_item_copy_from_work_needed: workNeeded, // optional
      line_item_copy_from_work_performed: workPerformed, // optional

      colorCode: colorCode ? colorCode : state?.id?.color_code,
      line_item_price_taxable: isTaxable,
      check_list: checklist,
    };
    dispatch(editWorkOrderTypeData({ id, Data }));
    // navigate("/work-order-type")
  };
  // Handle successful form submission
  useEffect(() => {
    if (postDataResult.data) {
      form.resetFields();
      toast.success("Form submitted successfully!");
      dispatch(resetData());
      navigate("/work-order-type");
    }
  }, [postDataResult.data, form, navigate]);

  useEffect(() => {
    if (postDataResult.error) {
      const err = postDataResult.error;
      toast.error(err);
    }
  }, [postDataResult.error, form]);
  const onFinishFailed = (errorInfo) => {
    toast.error("Failed:", errorInfo);
  };

  useEffect(() => {
    if (state) {
      form.setFieldsValue({
        recurrence_id: state?.id?.recurrence_id,
        name: state?.id?.name,
        description: state?.id?.description,
        labor_cost: state?.id?.labor_cost,
        price: state?.id?.price,
        estimated_time_in_mins: state?.id?.estimated_time_in_mins,
        default_email_subject: state?.id?.default_email_subject,
        default_email_message: state?.id?.default_email_message,
        needs_invoiced: needsInvoiced,
        alert_office: alertOffice,
        photo_required: requiredPhoto,
        email_to_customer: emailCustomer,
        allow_tech: allowTech,
        line_item_name: state?.id?.line_item_name,
        line_item_description: state?.id?.line_item_description, //optional
        line_item_price: state?.id?.line_item_price, // optional
        line_item_price_taxable: isTaxable, // optional
        use_price_from_workorder: usePrice,
        line_item_copy_from_work_needed: workNeeded, // optional
        line_item_copy_from_work_performed: workPerformed, // optional
        checklist: checklist,
        color_code: state?.id?.color_code,
        needs_invoiced: state?.id?.needs_invoiced,
        alert_office: state?.id?.alert_office,
        photo_required: state?.id?.photo_required,
        email_to_customer: state?.id?.email_to_customer,
        allow_tech: state?.id?.allow_tech,
        line_item_price_taxable: state?.id?.line_item_price_taxable,
      });

      setIsTaxable(state?.id?.line_item_price_taxable);
    }
  }, [state]);

  useEffect(() => {
    setChecklist(
      state?.id?.CheckListWorkOrderTypeData?.map((item) => ({ ...item }))
    );
  }, []);

  return (
    <Fragment>
      <div className="container-fluid modals workOrderTypee">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <div className="row">
            <div className="col-sm-12 noPad">
              <h4>Basic Info</h4>
              <div className="row editTechnicianFormAdd cslocation">
                <div className="col-sm-12">
                  <Form.Item
                    name="name"
                    rules={[{ required: true }]}
                    label="Type"
                  >
                    <Input placeholder="Type Name" />
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    name="description"
                    rules={[{ required: true }]}
                    label="Work Order Needed Description"
                  >
                    <Input placeholder="Work Order Needed Description" />
                  </Form.Item>
                </div>

                <div className="col-sm-6 colorPicker">
                  <Form.Item
                    label="Color Code"
                    name="color_code"
                    // initialValue={state?.id?.color_code}
                    rules={[
                      { required: true, message: "Color Code is required" },
                    ]}
                  >
                    <ColorPicker showText onChange={handleColorChange} />
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
                <div className="col-sm-12">
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
                    name="estimated_time_in_mins"
                    rules={[{ required: true }]}
                    label="Est Minute"
                  >
                    <Input placeholder="Est. Minutes" defaultValue={0} />
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
              {/* <div className="col-sm-12">/ */}
              <Form.Item name="line_item_name" label="Line Item Name">
                <Input placeholder="Line Name" />
              </Form.Item>
              {/* </div> */}
              <div className="row cslocation newCslocation">
                <div className="col-sm-12 workRadio">
                  <Form.Item label="Line Description" className="forPAd">
                    <Radio.Group
                      // onChange={handleRadioChange}
                      onChange={handleRadioChange}
                      // defaultValue={state.id.default_radio_value}
                    >
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
                        <Radio value="line_item_copy_from_work_needed">
                          Work Needed
                        </Radio>
                      </div>
                      <div className="col-sm-4">
                        <Radio value="line_item_copy_from_work_performed">
                          Work Performed
                        </Radio>
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
                    {/* <div className="col-sm-0 valueForm2 pd">
                      <Form.Item name="line_item_price_taxable">
                        <span>
                          <Checkbox
                            checked={isTaxable}
                            onChange={(e) => setIsTaxable(e.target.checked)}
                          />
                        </span>
                      </Form.Item>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row editTechnicianFormAdd cslocation">
            <div className="col-sm-7">
              <div className="row cslocation">
                <div className="col-sm-12 noPad">
                  <div className="container-fluid wordkorder workSetting">
                    <div className="col-sm-12">
                      <h3>Work Order Settings</h3>
                    </div>

                    <div className="col-sm-12 workOrderSettingggss">
                      <Form.Item name="needs_invoiced" valuePropName="checked">
                        <Checkbox
                          checked={needsInvoiced}
                          onChange={(e) => setNeedsInvoiced(e.target.checked)}
                        >
                          This work needs to be invoiced
                        </Checkbox>
                      </Form.Item>
                      <Form.Item
                        name="alert_office"
                        valuePropName="checked"
                        checked={alertOffice}
                        onChange={(e) => setAlertOffice(e.target.checked)}
                      >
                        <Checkbox>Alert office when work order added</Checkbox>
                      </Form.Item>
                      <Form.Item name="photo_required" valuePropName="checked">
                        <Checkbox
                          checked={requiredPhoto}
                          onChange={(e) => setRequiredPhoto(e.target.checked)}
                        >
                          Require a photo to finish
                        </Checkbox>
                      </Form.Item>
                      <Form.Item
                        name="email_to_customer"
                        valuePropName="checked"
                      >
                        <Checkbox
                          checked={emailCustomer}
                          onChange={(e) => setEmailCustomer(e.target.checked)}
                        >
                          Email the customer when finished
                        </Checkbox>
                      </Form.Item>
                      <Form.Item name="allow_tech" valuePropName="checked">
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
                          label="Email "
                          name="default_email_message"
                          rules={[
                            {
                              required: true,
                              message: "Default Email is required",
                            },
                          ]}
                        >
                          <Input.TextArea
                            placeholder="Default Email Message"
                            showCount
                            maxLength={500}
                            rows={8}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-5 checcKlisssst">
              <div className="row cslocation">
                <div className="col-sm-12">
                  <h4>Checklist</h4>
                </div>
                <div className="col-sm-5">
                  <Form.Item
                    label="Description"
                    // rules={[{ required: true }]}
                  >
                    <Input
                      type="text"
                      value={descriptionCheckListValue}
                      onChange={(e) =>
                        setdescriptionCheckListValue(e.target.value)
                      }
                    />
                  </Form.Item>
                </div>
                <div className="col-sm-5">
                  <Form.Item
                    label="Description on complete"
                    // rules={[{ required: true }]}
                    className="Descriptiononcomplete"
                  >
                    <Input
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

                {checklist?.length > 0 && (
                  <div className="container-fluid wordkorder valuesListing">
                    {checklist?.map((item, index) => (
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

export default EditWorkTypeForm;
