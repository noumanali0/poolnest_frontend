import { Typography } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const { Title, Text } = Typography;

const CustomerDetails = ({ Name, serviceAddress, autoplay }) => {
  return (
    <div className="pt-4 pb-2">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <Title level={4}>{Name}</Title>
          <div className="d-flex flex-column">
            <Text>
              Service Location:{" "}
              <span className="text-muted">
                123 Main St.
                <br />
                {serviceAddress}
              </span>
            </Text>
          </div>
        </div>
        <div>
          <div className="d-flex flex-column align-items-end">
            <Text strong>Billing Method</Text>
            <Text>
              Autopay: <span className="text-muted">{autoplay}</span>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
