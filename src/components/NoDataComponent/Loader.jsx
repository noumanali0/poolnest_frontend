import React from "react";
import { Skeleton } from "antd";
import Animate from "../../assets/img/sunrise.json";
import Lottie from "lottie-react";

const NoData = () => {
  return (
    <div className="nodata_div">
      <Lottie
        animationData={Animate}
        loop={true}
        className="Lottie compLottie"
      />
    </div>
  );
};

export default NoData;
