import React, { Fragment, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip, Switch } from "antd";
import DeleteModal from "../Modals/DeleteModal";
import ExtendedImageModal from "./ExtendedImageModal";
import CollageView from "./CollageView"; // Import the CollageView component
import { DeletewaterbodyImagesDataData } from "../../redux/postReducer/postPoolImages";
import { fetchwaterbodyImage } from "../../redux/Slices/getpoolImages";
import { AiFillDelete, AiFillEye } from "react-icons/ai";

export default function Previewslider({ imagePreview }) {
  const { data: singlewaterbody } = useSelector(
    (state) => state.singlewaterbody
  );
  const waterbody_id = singlewaterbody?._id;

  const [id, setId] = useState();
  const [deleteModaaal, setDeleteModaaal] = useState(false);
  const [extendedImage, setExtendedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExtendedVisible, setIsExtendedVisible] = useState(false);
  const [isCollageView, setIsCollageView] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = (idd) => {
    setId(idd);
    setDeleteModaaal(true);
  };

  const DeleteImage = async () => {
    await dispatch(DeletewaterbodyImagesDataData({ id }));
    dispatch(fetchwaterbodyImage({ waterbody_id }));
  };

  const openExtendedImage = (index) => {
    setCurrentIndex(index);
    setExtendedImage(imagePreview[index]);
    setIsExtendedVisible(true);
  };

  const handleNextImage = () => {
    const newIndex = (currentIndex + 1) % imagePreview.length;
    setCurrentIndex(newIndex);
    setExtendedImage(imagePreview[newIndex]);
  };

  const handlePrevImage = () => {
    const newIndex =
      (currentIndex - 1 + imagePreview.length) % imagePreview.length;
    setCurrentIndex(newIndex);
    setExtendedImage(imagePreview[newIndex]);
  };

  const closeExtendedImage = () => {
    setIsExtendedVisible(false);
    setExtendedImage(null);
  };

  return (
    <Fragment>
      <div className="container-fluid wordkorder preview">
        {isCollageView ? (
          <CollageView
            images={imagePreview}
            onImageClick={openExtendedImage}
            onDeleteClick={handleDelete}
          />
        ) : (
          <Swiper
            breakpoints={{
              320: { slidesPerView: 1 },
              575: { slidesPerView: 2 },
              820: { slidesPerView: 3 },
              991: { slidesPerView: 5 },
            }}
            spaceBetween={30}
            loop={false}
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper swiperImage"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {imagePreview?.map((data, index) => (
              <SwiperSlide key={data?._id}>
                <div className="imagePreview-css">
                  <img
                    src={data?.Image}
                    style={{ height: "150px", width: "124px" }}
                    alt="Preview"
                  />
                  <Tooltip placement="top" title={data?.Description}>
                    <p>{data?.Description}</p>
                  </Tooltip>
                  <div className="icon-container">
                    <AiFillEye
                      className="eye-icon"
                      onClick={() => openExtendedImage(index)}
                    />
                    <AiFillDelete onClick={() => handleDelete(data?._id)} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <DeleteModal
        modalOpen={deleteModaaal}
        setModalOpen={setDeleteModaaal}
        handleDelete={DeleteImage}
        id={id}
      />
      <ExtendedImageModal
        isVisible={isExtendedVisible}
        images={imagePreview}
        currentImage={extendedImage}
        onClose={closeExtendedImage}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />
    </Fragment>
  );
}
