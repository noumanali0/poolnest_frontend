import { Modal } from "antd";
import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const DeleteModal = ({ setModalOpen, modalOpen, handleDelete, id }) => {
  const handleSubmit = () => {
    handleDelete(id);
    setModalOpen(false);
  };

  return (
    <Modal
      title=""
      centered
      open={modalOpen}
      onOk={handleSubmit}
      onCancel={() => setModalOpen(false)}
      className="deleteModal"
    >
      <p>Are You Sure You Want to Delete this Data ?</p>
      <RiDeleteBin3Line className="deleteICon" />
    </Modal>
  );
};

export default DeleteModal;
