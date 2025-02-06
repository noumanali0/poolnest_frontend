import React, { useState } from "react";
import { Button, Form, Input, Space, Select, DatePicker, Radio } from "antd";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { fetchgetwaterbodyType } from "../../redux/Slices/getWaterbodyType";
import { fetchgetfrequency } from "../../redux/Slices/getfrequency";
import { fetchgetRateType } from "../../redux/Slices/getRateType";
import { fetchgetLaborCost } from "../../redux/Slices/getLaborCost";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import PoolProspectModal from './PoolProspectModal'

const { Option } = Select;

const ProspectPoolForm = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const dispatch = useDispatch();
    const postDataResult = useSelector((state) => state.Technician);
    const postfrequency = useSelector((state) => state.getfrequency);
    const laborcosttype = useSelector((state) => state.getLaborCost);
    const racetype = useSelector((state) => state.getRateType);
    const [formData, setFormData] = useState({
        Pools: [{ name: "" }],
    });
    const [form] = Form.useForm();  
    const navigate = useNavigate()
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleDateChange = (date) => {
        const formattedDate = moment(date).format("YYYY-MM-DD");
        setSelectedDate(formattedDate);
    };

    const handleDayChange = (value) => {
        setSelectedDay(value);
    };

    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    };

    useEffect(() => {
        dispatch(fetchTechnician());
        dispatch(fetchgetwaterbodyType());
        dispatch(fetchgetfrequency());
        dispatch(fetchgetRateType());
        dispatch(fetchgetLaborCost());
    }, [dispatch]);

    const onFinish = (values) => {
        navigate('/prospect');
    };

    return (
        <div className="row fomik">
            <Form
                name="dynamic_form_nest_item"
                autoComplete="off"
                form={form}
                onFinish={onFinish}
            >
                <Form.List name="Pools" initialValue={formData.Pools}>
                    {(fields, { add, remove }) => (
                        <>
                            <Accordion defaultActiveKey="0" flush>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Accordion.Item eventKey={String(key)} key={key}>
                                        <Accordion.Header>
                                            <span>Pool Name</span>{" "}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <Space
                                                key={key}
                                                style={{ display: "flex", marginBottom: 8 }}
                                                align="baseline"
                                            >
                                            
                                                <div className="row cslocation addPOOLCustomer">
                                                    <div className="col-sm-12 heads">
                                                        <h3>Water Body</h3>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <Form.Item
                                                            {...restField}
                                                            label="Pool Name"
                                                            name={[name, "poolName"]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Pool Name is Invalid",
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Pool Name" type="text" />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-sm-10 swicthbtn radioAddPoolCustomer">
                                                        <Form.Item
                                                            name={[name, "waterbody_type_id"]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Please select Waterbody Type",
                                                                },
                                                            ]}
                                                        >
                                                            <Radio.Group>
                                                                <div className="col-sm-2 switchbtn radioBtnAddPoolCustomer">
                                                                    <Radio value='1'>Test</Radio>
                                                                </div>
                                                                <div className="col-sm-2 switchbtn radioBtnAddPoolCustomer">
                                                                    <Radio value='2'>Test Pool</Radio>
                                                                </div>
                                                                <div className="col-sm-2 switchbtn radioBtnAddPoolCustomer">
                                                                    <Radio value='3'>ChildPool</Radio>
                                                                </div>
                                                                <div className="col-sm-2 switchbtn radioBtnAddPoolCustomer">
                                                                    <Radio value='4'>Pool</Radio>
                                                                </div>
                                                                <div className="col-sm-2 switchbtn radioBtnAddPoolCustomer">
                                                                    <Radio value='5'>Spa</Radio>
                                                                </div>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                        
                                                    </div>
                                                    <div className="col-sm-2 addPoolTypeBtn prospectt">
                                                        <Button className="bluebtn" onClick={handleShow}>
                                                            Add Pool Type{" "}
                                                        </Button>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <Form.Item
                                                            name={[name, "rate"]}
                                                            label="Rate"
                                                            rules={[
                                                                { 
                                                                    required: true, 
                                                                    message: "Invalid Rate"
                                                                }
                                                            ]}
                                                        >
                                                            <Input placeholder="Rate" type="number" />
                                                        </Form.Item>
                                                    </div>

                                                    <div className="col-sm-3">
                                                        <Form.Item
                                                            // name=""
                                                            name={[name, "rate_type_id"]}
                                                            label="Rate Type"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Rate Type is required",
                                                                },
                                                            ]}
                                                        >
                                                        <Select placeholder="Rate Type">
                                                            {racetype?.data?.map((item) => {
                                                                return (
                                                                    <Option value={item._id}>
                                                                        {item.label}
                                                                    </Option>
                                                                );
                                                            })}
                                                        </Select>
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <Form.Item
                                                            label="Labor Cost"
                                                            // name=""
                                                            name={[name, "labor_cost"]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Invalid Labor Cost",
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Labor Cost" type="number" />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <Form.Item
                                                            name={[name, "labor_cost_type_id"]}
                                                            label="Labor Cost Type"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Labor Cost Type is required",
                                                                },
                                                            ]}
                                                        >
                                                        <Select placeholder="Labot Cost Type">
                                                            {laborcosttype?.data?.map((item) => {
                                                                return (
                                                                    <Option value={item._id}>
                                                                        {item.label}
                                                                    </Option>
                                                                );
                                                            })}
                                                        </Select>
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <Form.Item
                                                            // name=""
                                                            name={[name, "minutes_per_stop"]}
                                                            label="Minutes at Stop"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Invalid Minutes Of Stop",
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Minutes Of Stop" type="number" />
                                                        </Form.Item>
                                                    </div>

                                                    <div className="col-sm-4">
                                                        <Form.Item
                                                        // name=""
                                                        name={[name, "size"]}
                                                        label="Gallons"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Invalid Size",
                                                            },
                                                        ]}
                                                        >
                                                            <Input placeholder="Size" type="number" />
                                                        </Form.Item>
                                                    </div>

                                                    <div className="col-sm-4">
                                                        <Form.Item
                                                            // name=""
                                                            name={[name, "pressure"]}
                                                            label="Base Filter Pressure"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Invalid pressure",
                                                                },
                                                            ]}
                                                        >
                                                        <Input placeholder="Pressure" type="text" />
                                                        </Form.Item>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <Form.Item
                                                            // name=""
                                                            name={[name, "notes"]}
                                                            label="Notes"
                                                            rules={[
                                                            {
                                                                required: true,
                                                                message: "Invalid notes",
                                                            },
                                                            ]}
                                                        >
                                                            <Input placeholder="Notes" type="text" />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-sm-12 heads">
                                                        <h3>Route Assignment</h3>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <Form.Item
                                                            // name="technician_id"
                                                            name={[name, "technician_id"]}
                                                            label="Tech Name"
                                                        >
                                                            <Select placeholder="Tech">
                                                                {postDataResult.data && postDataResult?.data?.items?.map((item) => {
                                                                    return (
                                                                        <Option value={item._id}>
                                                                            {item.first_name}
                                                                        </Option>
                                                                    );
                                                                })}
                                                            </Select>
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <Form.Item
                                                            // name=""
                                                            name={[name, "assigned_day"]}
                                                            label="Day Of Week"
                                                        >
                                                            <Select
                                                                placeholder="Day Of Week"
                                                                onChange={handleDayChange}
                                                                value={selectedDay}
                                                            >
                                                                <Option value="monday">Monday</Option>
                                                                <Option value="tuesday">Tuesday</Option>
                                                                <Option value="wednesday">Wednesday</Option>
                                                                <Option value="thursday">Thursday</Option>
                                                                <Option value="friday">Friday</Option>
                                                                <Option value="saturday">Saturday</Option>
                                                                <Option value="sunday">Sunday</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-sm-2 forFour">
                                                        <Form.Item
                                                            // name= ""
                                                            name={[name, "frequency_id"]}
                                                            label="Frequency"
                                                        >
                                                            <Select placeholder="Never">
                                                                {postfrequency?.data?.map((item) => {
                                                                    return (
                                                                        <Option value={item._id}>
                                                                            {item.label}
                                                                        </Option>
                                                                    );
                                                                })}
                                                            </Select>
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-sm-2 forFour">
                                                        <Form.Item
                                                            // name=""
                                                            name={[name, "start_date"]}
                                                            label="Start Date"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Start Date is Required",
                                                                },
                                                            ]}
                                                        >
                                                            <DatePicker
                                                                selected={selectedDate}
                                                                onChange={handleDateChange}
                                                                placeholderText="Select Start date"
                                                            />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-sm-2 forFour">
                                                        <Form.Item
                                                            // name= ""
                                                            name={[name, "stop_date"]}
                                                            label="End Date"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "End Date is Required",
                                                                },
                                                            ]}
                                                        >
                                                            <DatePicker
                                                                selected={selectedEndDate}
                                                                onChange={handleEndDateChange}
                                                                minDate={new Date()} // Disable past dates (today and beyond)
                                                                dateFormat="yyyy-MM-dd" // Set the desired date format
                                                                placeholderText="Select End date"
                                                            />
                                                        </Form.Item>
                                                    </div>

                                                    <div className="col-sm-12 buttonsservice">
                                                        <Form.Item className="savebtn">
                                                            {" "}
                                                            <Button
                                                                className="yellowbtn"
                                                                onClick={() => onFinish(form.getFieldsValue())}  // Removed the key parameter
                                                                htmlType="submit"
                                                            >
                                                                Convert
                                                            </Button>
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                            </Space>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </>
                    )}
                </Form.List>
            </Form>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Body>
                    Prospect Pool Type
                    <Button variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                </Modal.Body>
                <PoolProspectModal data={handleClose}/>
            </Modal>
        </div>
    );
};

export default ProspectPoolForm;