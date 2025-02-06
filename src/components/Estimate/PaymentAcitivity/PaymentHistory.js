import React from "react";
import { Table, Button } from "antd";
import { MailOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const PaymentHitory = ({ data }) => {
  // Color-coded badge for status
  const renderStatus = (status) => {
    // Match your color codes from the screenshot
    const styleCommon = {
      padding: "4px 8px",
      borderRadius: 6,
      color: "black",
      fontWeight: "bold",
      display: "inline-block",
      minWidth: 80,
    };
    switch (status) {
      case "Paid":
        return (
          <span style={{ backgroundColor: "#5CEF30", ...styleCommon }}>
            Paid
          </span>
        );
      case "Refunded":
        return (
          <span
            style={{
              backgroundColor: "#C7DEFA",
              color: "black",
              ...styleCommon,
            }}
          >
            Refunded
          </span>
        );
      case "Overdue":
        return (
          <span style={{ backgroundColor: "#EF3033", ...styleCommon }}>
            Overdue
          </span>
        );
      case "Credit":
        return (
          <span style={{ backgroundColor: "#999", ...styleCommon }}>
            Credit
          </span>
        );
      default:
        return (
          <span
            style={{
              backgroundColor: "#FADB14",
              color: "black",
              ...styleCommon,
            }}
          >
            {status}
          </span>
        );
    }
  };

  const columns = [
    {
      title: (
        <span>
          Date <small style={{ fontSize: "0.8rem" }}>⇅</small>
        </span>
      ),
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date), // simplistic date sort
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (val) => renderStatus(val),
    },
    {
      title: (
        <span>
          Invoice # <small style={{ fontSize: "0.8rem" }}>⇅</small>
        </span>
      ),
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      sorter: (a, b) => {
        // if it's "Credit" or a numeric invoice
        const an = isNaN(a.invoiceNumber) ? Number.MAX_VALUE : a.invoiceNumber;
        const bn = isNaN(b.invoiceNumber) ? Number.MAX_VALUE : b.invoiceNumber;
        return an - bn;
      },
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Invoice Total",
      dataIndex: "invoiceTotal",
      key: "invoiceTotal",
      render: (val) => (val !== undefined ? `$${val.toLocaleString()}` : ""),
      sorter: (a, b) => a.invoiceTotal - b.invoiceTotal,
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      render: (val) => (val !== undefined ? `$${val.toLocaleString()}` : ""),
    },
    {
      title: "Mode",
      dataIndex: "mode",
      key: "mode",
    },
    {
      title: (
        <span>
          Payment Date <small style={{ fontSize: "0.8rem" }}>⇅</small>
        </span>
      ),
      dataIndex: "paymentDate",
      key: "paymentDate",
      sorter: (a, b) => new Date(a.paymentDate) - new Date(b.paymentDate),
      render: (val, record) => {
        // If Overdue, show some special text in red if you want
        if (record.status === "Overdue" && typeof val === "string") {
          return <span style={{ color: "red" }}>{val}</span>;
        }
        return val || "";
      },
    },
    {
      title: (
        <span>
          Refund Date <small style={{ fontSize: "0.8rem" }}>⇅</small>
        </span>
      ),
      dataIndex: "refundDate",
      key: "refundDate",
      sorter: (a, b) => new Date(a.refundDate) - new Date(b.refundDate),
      render: (val) => (val ? val : ""),
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <div className="d-flex align-items-center" style={{ gap: 8 }}>
          {/* Email icon */}
          <MailOutlined style={{ cursor: "pointer", fontSize: 16 }} />
          {/* Edit icon */}
          <EditOutlined style={{ cursor: "pointer", fontSize: 16 }} />
          {/* Delete icon */}
          <DeleteOutlined style={{ cursor: "pointer", fontSize: 16 }} />
        </div>
      ),
    },
  ];

  return (
    <div className="row p-3">
      <div className="col-sm-12">
        <div className="d-flex justify-content-end align-items-center mb-2 w-100">
          <Button
            type="primary"
            style={{
              backgroundColor: "#f9c82b",
              border: "none",
              color: "black",
            }}
          >
            + Add Payment
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          // add a custom className to combine AntD + Bootstrap styling if you like
          className="table table-striped"
          rowKey="key"
        />
      </div>
    </div>
  );
};

export default PaymentHitory;
