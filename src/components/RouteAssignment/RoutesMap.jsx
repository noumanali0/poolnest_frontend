import React, { useEffect, useState, useRef } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { useSelector } from "react-redux";
import { renderToString } from "react-dom/server";
import { FaLocationPin } from "react-icons/fa6";
import {
  FaCalendarAlt,
  FaClock,
  FaCompass,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";

function GoogleMap({ google, Techniciandata }) {
  const { data: activeServicedashboard } = useSelector(
    (state) => state.activeServicedashboard
  );
  const userProfile = useSelector((state) => state.profileDetail);

  const { data: ZoomToMap } = useSelector((state) => state.ZoomToMap);

  const [allRoutes, setAllRoutes] = useState([]);
  const [ToggleRoute, setToggleRoute] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [zoom, setZoom] = useState(6);

  const initialLatitude = userProfile?.data?.data?.latitude;
  const initialLongitude = userProfile?.data?.data?.longitude;

  const [originalCoordinates, setOriginalCoordinates] = useState({
    lat: initialLatitude,
    lng: initialLongitude,
  });
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activeButton, setActiveButton] = useState("Selected");

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.map;
    }
  }, []);

  useEffect(() => {
    if (Techniciandata && Techniciandata.RouteAssignmentTechnician) {
      const technicianRoutes = Techniciandata.RouteAssignmentTechnician.map(
        (item) => ({
          lat: parseFloat(item.RouteAssignmentWaterBody.servicelat),
          lng: parseFloat(item.RouteAssignmentWaterBody.servicelong),
          name: item.RouteAssignmentWaterBody.customer_name,
          tech_color_code: Techniciandata.color_code,
          tech_name: Techniciandata.first_name,
          Frequency: item.RouteAssignmentFrequency.label,
          totalPool: item.RouteAssignmentWaterBody.name,
          Address: item.RouteAssignmentWaterBody.service_address,
          position: item?.RouteAssignmentWaterBody?.position,
        })
      );

      // Group by lat/lng and combine positions
      const combinedRoutes = technicianRoutes.reduce((acc, route) => {
        const existing = acc.find(
          (r) => r.lat === route.lat && r.lng === route.lng
        );
        if (existing) {
          existing.position = `${existing.position}/${route.position}`;
        } else {
          acc.push({ ...route });
        }
        return acc;
      }, []);

      setToggleRoute(combinedRoutes);
      setZoom(10);
    }
    onClose();
  }, [Techniciandata]);

  useEffect(() => {
    if (ZoomToMap && ZoomToMap.RouteAssignmentWaterBody) {
      setOriginalCoordinates({
        lat: parseFloat(ZoomToMap.RouteAssignmentWaterBody.servicelat),
        lng: parseFloat(ZoomToMap.RouteAssignmentWaterBody.servicelong),
      });
      setZoom(15);
    }
  }, [ZoomToMap, activeServicedashboard]);
  useEffect(() => {
    if (activeServicedashboard && activeServicedashboard.data) {
      const coordinatesData = activeServicedashboard.data.map((item) => ({
        lat: parseFloat(item.latitude),
        lng: parseFloat(item.longitude),
        name: item.first_name,
        tech_color_code: item.color_code,
        totalPool: item.TotalPools,
        completedPools: item.completedPools,
        skippedcount: item.skippedcount,
        totaldistance: item.totaldistance,
        totaltime: item.totaltime,
      }));

      if (coordinatesData.length > 0) {
        setOriginalCoordinates({
          lat: coordinatesData[0].lat,
          lng: coordinatesData[0].lng,
        });
      }
    }
  }, [activeServicedashboard]);

  useEffect(() => {
    const allPools =
      activeServicedashboard && activeServicedashboard.data
        ? activeServicedashboard.data.map((item) =>
            item.RouteAssignmentTechnician.map((elem) => ({
              lat: parseFloat(elem.RouteAssignmentWaterBody.servicelat),
              lng: parseFloat(elem.RouteAssignmentWaterBody.servicelong),
              name: item.first_name,
              tech_color_code: item.color_code,
              totalPool: item.TotalPools,
              completedPools: item.completedPools,
              skippedcount: item.skippedcount,
              totaldistance: item.totaldistance,
              totaltime: item.totaltime,
              last_name: item.last_name,
            }))
          )
        : [];

    setAllRoutes(allPools.flat());
  }, [activeServicedashboard]);

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

  const SelectedRoute = () => {
    setActiveButton("Selected");
    setZoom(8);
    setToggleRoute(
      Techniciandata?.RouteAssignmentTechnician?.map((item) => ({
        lat: parseFloat(item.RouteAssignmentWaterBody.servicelat),
        lng: parseFloat(item.RouteAssignmentWaterBody.servicelong),
        name: Techniciandata.first_name,
        tech_color_code: Techniciandata.color_code,
        totalPool: item.name,
        completedPools: item.name,
        skippedcount: item.name,
        totaldistance: item.name,
        totaltime: item.name,
        last_name: item.name,
      }))
    );
  };
  const AllRoute = () => {
    setActiveButton("All");
    setToggleRoute(allRoutes);

    if (mapRef.current) {
      const map = mapRef.current.map;

      const bounds = new google.maps.LatLngBounds();

      allRoutes.forEach((route) => {
        bounds.extend(new google.maps.LatLng(route.lat, route.lng));
      });

      map.fitBounds(bounds);
    }
  };

  function secondsToTime(seconds) {
    const days = Math.floor(seconds / 86400); // 86400 seconds in a day
    const hours = Math.floor((seconds % 86400) / 3600); // 3600 seconds in an hour
    const minutes = Math.floor((seconds % 3600) / 60); // 60 seconds in a minute

    let timeString = "";

    if (days > 0) {
      timeString += `${days} day${days > 1 ? "s" : ""}`;
    }

    if (hours > 0) {
      if (timeString) timeString += " ";
      timeString += `${hours} hour${hours > 1 ? "s" : ""}`;
    }

    if (minutes > 0) {
      if (timeString) timeString += " ";
      timeString += `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }

    return timeString || "0 seconds";
  }

  console.log(selectedPlace);

  return (
    <div className="googlemap_frame">
      <div className="row routefilters routeMap">
        <div className="col-sm-6 seleROute">
          <button
            className={`OptimizeRouteBtn ${
              activeButton === "Selected" ? "active" : ""
            }`}
            onClick={SelectedRoute}
          >
            Selected Route
          </button>
        </div>
        <div className="col-sm-6 seleROute">
          <button
            className={`OptimizeRouteBtn ${
              activeButton === "All" ? "active" : ""
            }`}
            onClick={AllRoute}
          >
            All Routes
          </button>
        </div>
      </div>
      <Map
        google={google}
        center={originalCoordinates}
        initialCenter={originalCoordinates}
        zoom={zoom}
        ref={mapRef}
        className="mapRadius"
      >
        {ToggleRoute?.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: `data:image/svg+xml,${encodeURIComponent(
                renderToString(
                  <FaLocationPin color={marker.tech_color_code} size={24} />
                )
              )}`,
              scaledSize: new google.maps.Size(30, 30),
            }}
            label={{
              text: `${marker.position ? marker.position : marker.name}`,
              color: "#fff",
              fontSize: "12px",
              fontWeight: "bold",
            }}
            onClick={onMarkerClick}
            name={marker}
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
                {selectedPlace?.name && `${selectedPlace?.name?.name}`}
              </h5>
              <hr className="hrclass" />
            </div>
            <div className="infoWindowContent">
              <p>
                <FaUser className="infoIcon" /> <span>Tech Name:</span>{" "}
                {selectedPlace?.name?.tech_name}
              </p>
              <p>
                <FaUser className="infoIcon" /> <span>Client Name:</span>{" "}
                {selectedPlace?.name?.name}
              </p>
              <p>
                <FaMapMarkerAlt className="infoIcon" /> <span>Address:</span>{" "}
                {selectedPlace?.name?.Address}
              </p>
              <p>
                <FaCalendarAlt className="infoIcon" /> <span>Frequency:</span>{" "}
                {selectedPlace?.name?.Frequency}
              </p>
              {selectedPlace?.name?.position && (
                <p>
                  <FaCompass className="infoIcon" /> <span>Position:</span>{" "}
                  {selectedPlace?.name?.position}
                </p>
              )}
              <p>
                <FaClock className="infoIcon" /> <span>Total Time:</span>{" "}
                {secondsToTime(selectedPlace?.name?.totaltime)}
              </p>
            </div>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(GoogleMap);
