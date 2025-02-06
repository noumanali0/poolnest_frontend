import React, { useState } from "react";
import { Select, Card, Input, Button, Row, Col, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Title, Text } = Typography;

const CustomerNotes = () => {
  const [isEditingNotes, setIsEditingNotes] = useState(true);

  const handleEditNotes = () => {
    setIsEditingNotes((prev) => !prev);
  };
  return (
    <>
      <div className="pt-2">
        <Title level={5} className="pb-2">
          Customer Notes:
        </Title>
        <Card
          style={{ backgroundColor: "#ddd", minHeight: 120, padding: "0px" }}
        >
          {/* If editing, show text area + buttons */}
          <div className="d-flex justify-content-end w-100">
            <Button
              icon={<EditOutlined />}
              type="text"
              onClick={handleEditNotes}
            />
          </div>

          <>
            <TextArea rows={4} disabled={isEditingNotes} />
          </>
        </Card>
      </div>
    </>
  );
};

export default CustomerNotes;
