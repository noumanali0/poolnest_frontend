import React, { useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux';
import { fetchTechnician } from '../../redux/Slices/GetTechnician';
import { fetchgetfrequency } from '../../redux/Slices/getfrequency';

const ServiceProspect = () => {


  const { data: Technician } = useSelector((state) => state.Technician);
  const postfrequency = useSelector((state) => state.getfrequency);
  const customertype = useSelector((state) => state.getCustomerType);
  const customercity = useSelector((state) => state.getCustomerCity);
  const customercountry = useSelector((state) => state.getCustomerCountry);
  const userProfile = useSelector((state) => state.profileDetail);
  const GetSaleGroup = useSelector((state) => state.SalesTaxGroupName);
  const postwaterType = useSelector((state) => state.getwaterbodyType);
  const racetype = useSelector((state) => state.getRateType);


  const dispatch = useDispatch()
  useEffect(() => {
    if (Technician?.length === 0) {
      dispatch(fetchTechnician());
    }

    if (postfrequency?.data?.length === 0) {
      dispatch(fetchgetfrequency());
    }
  }, [dispatch]);

  return (
    <div>
       <div className="col-sm-12 workTypeSection">
            <div className="row cslocation">
              <div className="col-sm-12">
                <h3 className="subHeadingAddProspect">
                  Water Body Information
                </h3>
              </div>
              <div className="col-sm-12">
                <div className="row cslocation">
                  <div className="col-sm-4">
                    <Form.Item
                      name="waterbodyName"
                      label="Water Body Name"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Water Body Name",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Water Body Name" />
                    </Form.Item>
                  </div>
                  <div className="col-sm-4">
                    <Form.Item
                      name="waterBodyType"
                      label="Water Body Type"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Water Body Type",
                        },
                      ]}
                    >
                      <Select placeholder="Water Body Type">
                        {postwaterType?.data?.map((item) => {
                          return <Option value={item._id}>{item.name}</Option>;
                        })}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-sm-4">
                    <Form.Item
                      name="minutes"
                      label="Minutes at Stop"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Minutes at Stop",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Minutes at Stop" />
                    </Form.Item>
                  </div>
                  <div className="col-sm-4">
                    <Form.Item
                      name="Gallons"
                      label="Gallons"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Gallons",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Gallons" />
                    </Form.Item>
                  </div>
                  <div className="col-sm-4">
                    <Form.Item
                      name="baseFilterPressure"
                      label="Base Filter Pressure"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Base Filter Pressure",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Base Filter Pressure" />
                    </Form.Item>
                  </div>

                  <div className="col-sm-4">
                    <Form.Item
                      name="estimated_time_minutes"
                      label="Estimated Time Minutes"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Estimated Time Minutes",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Estimated Time Minutes" />
                    </Form.Item>
                  </div>

                  <div className="col-sm-12">
                    {/* <Form.Item
                      name="frequency"
                      label="Select Frequency"
                      className="checkboXFreq"
                    >
                      <Checkbox.Group onChange={handleFrequencyChange}>
                        {postfrequency?.data?.map((item, i) => {
                          return (
                            <Checkbox value={item?._id}>{item?.label}</Checkbox>
                          );
                        })}
                      </Checkbox.Group>
                    </Form.Item> */}
                  </div>
                  <div className="col-sm-12">
                    <h3 className="subHeadingAddProspect">Frequency</h3>
                  </div>
                  <div className="col-sm-12 frwquencyss">
                    <div className="row cslocation frequencyDetail">
                      <Form ref={formRef} style={{ width: "100%" }}>
                        <div className="col-sm-3">
                          <Form.Item
                            name={`rate`}
                            label="Rate"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter Rate",
                              },
                            ]}
                            onChange={(e) => setRateData(e.target.value)}
                          >
                            <Input type="text" placeholder="Rate" />
                          </Form.Item>
                        </div>
                        <div className="col-sm-3">
                          <Form.Item
                            name={[name, "rate_type_id"]}
                            label="Rate Type"
                            rules={[
                              {
                                required: true,
                                message: "Rate Type is required",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Rate Type"
                              onChange={(value, option) =>
                                setRateType({
                                  id: value,
                                  name: option.children,
                                })
                              }
                            >
                              {racetype?.data?.map((item) => (
                                <Select.Option key={item._id} value={item._id}>
                                  {item.label}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
                        <div className="col-sm-3">
                          <Form.Item
                            name={[name, "frequency"]}
                            label="Frequency"
                            rules={[
                              {
                                required: true,
                                message: "Frequency is required",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Frequency"
                              onChange={(value, option) =>
                                setFrequencydata({
                                  id: value,
                                  name: option.children,
                                })
                              }
                              value={Frequencydata}
                            >
                              {postfrequency?.data?.map((item) => (
                                <Select.Option key={item._id} value={item._id}>
                                  {item.label}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
                        <div className="col-sm-2">
                          <Button
                            type="primary"
                            onClick={handleAddRow}
                            className="bluebtn handleAddRow"
                          >
                            Add New
                          </Button>
                        </div>
                      </Form>
                    </div>

                    {ProspectArray.map((item, i) => (
                      <div key={i} className="row cslocation frequencyDetail">
                        <div className="col-sm-3">
                          <Form.Item label="Rate">
                            <Input
                              value={item?.rate}
                              type="text"
                              placeholder="Rate"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-sm-3">
                          <Form.Item label="Rate Type">
                            <Input
                              value={item?.rate_type_name}
                              type="text"
                              placeholder="Rate Type"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-sm-3">
                          <Form.Item label="FrequencyId">
                            <Input
                              value={item?.Frequencyname}
                              type="text"
                              placeholder="FrequencyId"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-sm-2">
                          <Button
                            type="primary"
                            onClick={() => handleRemove(i)}
                            className="bluebtn"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default ServiceProspect