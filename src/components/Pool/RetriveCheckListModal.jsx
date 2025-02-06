import React, { Fragment } from "react";
import {
  Form,
  Select,
  Input,
  Space,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchRetrieveDeletedserviceCheckListSpecificToWaterBody, fetchgetserviceCheckListSpecificToWaterBody } from "../../redux/Slices/getserviceCheckList";
import { BiCaretRightCircle } from "react-icons/bi";

const { Option } = Select;
function RetriveServiceListModal({ data1 }) {
  const dispatch = useDispatch();

    const { data: singlewaterbody } = useSelector(
    (state) => state.singlewaterbody
  );

  const { data: getserviceCheckList, status } = useSelector(
    (state) => state.getserviceCheckList
  );


  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const waterbody_id = singlewaterbody?._id;

  const onFinish = async (values) => {
   
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  console.log(data1)

  const RetriveCheckList = async (CheckListId) => {
    await dispatch(fetchRetrieveDeletedserviceCheckListSpecificToWaterBody({ waterbody_id , CheckListId }));
    dispatch(fetchgetserviceCheckListSpecificToWaterBody({ waterbody_id }));

    if(getserviceCheckList?.DeletedCheckList?.length == 0){
      data1?.handleCloseRetrive();
    }
  };

  return (
    <Fragment>
      <div className="container-fluid modals">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
          disabled={false}
        >
          <div className="row">
            <div className="col-sm-12">
              <div className="row myselect retrive">
                {data1?.getserviceCheckList?.DeletedCheckList?.map(
                  (item, key) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <div className="row slignc">
                        <div className="col-sm-5">
                          <Form.Item label="Description">
                            <Input
                              value={item?.Description}
                              readOnly
                              placeholder="Description "
                            />
                          </Form.Item>
                        </div>

                        <div className="col-sm-5">
                          <Form.Item
                            label="Description on Complete"
                            defaultValue={item?.DescriptionOnComplete}
                          >
                            <Input
                              value={item?.DescriptionOnComplete}
                              readOnly
                              placeholder="Description on Complete"
                            />
                          </Form.Item>
                        </div>

                        <div className="col-sm-2 retrive">
                          <BiCaretRightCircle   onClick={() => RetriveCheckList(item?._id)}/>
                        </div>
                      </div>
                    </Space>
                  )
                )}
              </div>
            </div>
          </div>

        </Form>
      </div>
    </Fragment>
  );
}

export default RetriveServiceListModal;
