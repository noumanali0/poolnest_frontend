import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";

const ConfirmDeleteMiscellaneousInvoice = ({
  isModalOpen,
  handleOk,
  handleCancel,
  loading
}) => {
  return (
    <React.Fragment>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are You Sure You Want To Delete Miscellaneous Invoice</p>
      </Modal>
    </React.Fragment>
  );
};

ConfirmDeleteMiscellaneousInvoice.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ConfirmDeleteMiscellaneousInvoice;
