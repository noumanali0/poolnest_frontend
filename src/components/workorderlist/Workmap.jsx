import React, { useEffect, useState, useRef } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { useSelector } from "react-redux";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { renderToString } from "react-dom/server";
import { FaClock, FaCompass, FaUser } from "react-icons/fa6";

function GoogleMap({ google, data }) {
  const { data: activeServicedashboard } = useSelector(
    (state) => state.activeServicedashboard
  );

  const { data: WorkOrderRouteApi } = useSelector(
    (state) => state.WorkOrderRouteApi
  );

  console.log(activeServicedashboard);
  console.log(data);

  const MapData = WorkOrderRouteApi?.data && WorkOrderRouteApi?.data[0];

  const { data: ZoomToMap } = useSelector((state) => state.ZoomToMap);

  const [activeMarker, setActiveMarker] = useState(null);
  const [zoom, setzoom] = useState(10);
  const [originalCoordinates, setOriginalCoordinates] = useState({
    lat: "38.922579",
    lng: "-77.042388",
  });
  const [selectedPlace, setSelectedPlace] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.map;
    }
  }, []);

  useEffect(() => {
    if (ZoomToMap.length !== 0) {
      setOriginalCoordinates({
        lat: ZoomToMap?.RouteAssignmentWaterBody?.servicelat,
        lng: ZoomToMap?.RouteAssignmentWaterBody?.servicelong,
      });
      setzoom(15);
    }
  }, [ZoomToMap, activeServicedashboard]);

  useEffect(() => {
    console.log(data?.data);
    if (data?.data?.length !== 0) {
      const coordinatesData = data?.data?.map((item) => ({
        lat: parseFloat(item?.Data[0]?.latitude),
        lng: parseFloat(item?.Data[0]?.longitude),
        name: item?.Data[0]?.first_name,
        tech_color_code: item?.Data[0]?.color_code,
        totalPool: item?.Data[0]?.TotalPools,
        completedPools: item?.Data[0]?.completedPools,
        skippedcount: item?.skippedcount,
        totaldistance: item?.totaldistance,
        totaltime: item?.totaltime,
      }));
      setOriginalCoordinates({
        lat: coordinatesData && coordinatesData[0].lat,
        lng: coordinatesData && coordinatesData[0].lng,
      });
    } else {
      setOriginalCoordinates({
        lat: 38.922579,
        lng: -77.042388,
      });
    }
  }, [activeServicedashboard]);

  const coordinatesData = MapData?.Data?.flatMap((item) =>
    item.RouteAssignmentTechnician.map((service) => ({
      lat: parseFloat(service.RouteAssignmentWaterBody?.servicelat),
      lng: parseFloat(service.RouteAssignmentWaterBody?.servicelong),
      name: service.RouteAssignmentWaterBody?.customer_name,
      tech_color_code: item?.color_code,
      tech_name: item?.first_name,
      frequency: service?.RouteAssignmentFrequency?.label,
      address: service?.RouteAssignmentWaterBody?.service_address,
    }))
  );

  console.log(coordinatesData, "coordinatesData");
  const onMarkerClick = (props, marker) => {
    setActiveMarker(marker);
    setSelectedPlace(props);
  };

  const onClose = () => {
    if (activeMarker) {
      setActiveMarker(null);
      setSelectedPlace(null);
    }
  };

  console.log(selectedPlace, "selectedPlace ==========");

  return (
    <div className="workOrderMap">
      <div className="googlemap_frame">
        <Map
          google={google}
          center={originalCoordinates}
          initialCenter={originalCoordinates}
          zoom={zoom}
          ref={mapRef}
          className="mapRadius"
        >
          {coordinatesData?.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: `data:image/svg+xml,${encodeURIComponent(
                  renderToString(
                    <FaMapMarkerAlt color={marker.tech_color_code} size={30} />
                  )
                )}`,
                scaledSize: new google.maps.Size(30, 30),
              }}
              onClick={onMarkerClick}
              name={marker.name}
              tech_name={marker.tech_name}
              address={marker.address}
              frequency={marker.frequency}
            />
          ))}

          <InfoWindow
            marker={activeMarker}
            visible={activeMarker !== null}
            onClose={onClose}
          >
            <div className="infoWindowContainer">
              <div className="infoWindowHeader">
                <h5 className="infoWindowTitle">
                  {selectedPlace?.name && `${selectedPlace?.name}`}
                </h5>
                <hr className="hrclass" />
              </div>
              <div className="infoWindowContent">
                <p>
                  <FaUser className="infoIcon" /> <span>Tech Name:</span>{" "}
                  {selectedPlace?.tech_name}
                </p>
                <p>
                  <FaUser className="infoIcon" /> <span>Client Name:</span>{" "}
                  {selectedPlace?.name}
                </p>
                <p>
                  <FaMapMarkerAlt className="infoIcon" /> <span>Address:</span>{" "}
                  {selectedPlace?.address}
                </p>
                <p>
                  <FaCalendarAlt className="infoIcon" /> <span>Frequency:</span>{" "}
                  {selectedPlace?.frequency}
                </p>
              </div>
            </div>
          </InfoWindow>
        </Map>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(GoogleMap);
