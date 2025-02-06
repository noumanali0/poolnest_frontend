import React from "react";
import { Tooltip } from "antd";
import { AiFillEye, AiFillDelete } from "react-icons/ai";

const CollageView = ({ images, onImageClick, onDeleteClick }) => {
  return (
    <div className="collage-container">
      {images.map((data, index) => (
        <div key={data?._id} className="collage-item">
          <img
            src={data?.Image}
            alt="Collage"
            className="collage-image"
            onClick={() => onImageClick(index)}
          />
          <Tooltip placement="top" title={data?.Description}>
            <p>{data?.Description}</p>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};

export default CollageView;
