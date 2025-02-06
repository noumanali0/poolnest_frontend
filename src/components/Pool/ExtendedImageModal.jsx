import React, { useState } from "react";
import { Modal, Switch } from "antd";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import CollageView from "./CollageView"; // Import the CollageView component

const ExtendedImageModal = ({
  isVisible,
  images,
  currentImage,
  onClose,
  onNext,
  onPrev,
}) => {
  const [isCollageView, setIsCollageView] = useState(true); // State for collage view

  return (
    <Modal visible={isVisible} footer={null} onCancel={onClose} width={800}>
      <div className="extended-image-container">
        <div className="view-toggle">
          <span>Single Image View</span>
          <Switch checked={isCollageView} onChange={setIsCollageView} />
          <span>Collage View</span>
        </div>

        {isCollageView ? (
          <CollageView images={images} onImageClick={onNext} />
        ) : (
          <div className="flex-collage">
            <AiOutlineLeft className="nav-arrow" onClick={onPrev} />
            <img
              src={currentImage?.Image}
              alt="Extended"
              className="extended-image"
            />
            <AiOutlineRight className="nav-arrow" onClick={onNext} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ExtendedImageModal;
