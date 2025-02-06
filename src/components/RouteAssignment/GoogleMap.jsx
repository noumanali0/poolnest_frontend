import React, { useEffect, useRef, useState } from "react";
import { FaLocationPin } from "react-icons/fa6";
import { renderToString } from "react-dom/server";
import { IoMdHome } from "react-icons/io";
import { Modal, Button } from "antd";
import { useSelector } from "react-redux";
import { GiPathDistance } from "react-icons/gi";
import { BsPersonCircle } from "react-icons/bs";

const RouteMap = ({ MapData }) => {
  console.log(MapData, "MapData ----------");

  const userProfile = useSelector((state) => state.profileDetail);
  const mapRef = useRef(null);
  const directionsRenderer = useRef(null);
  const [routeInfo, setRouteInfo] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCustomerModalVisible, setIsCustomerModalVisible] = useState(false);
  const [totalDistance, setTotalDistance] = useState("");
  const [totalDuration, setTotalDuration] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null); // New state for clicked marker details

  useEffect(() => {
    if (!window.google) {
      return;
    }
    const initialLatitude =
      MapData?.latitude || userProfile?.data?.data?.latitude;
    const initialLongitude =
      MapData?.longitude || userProfile?.data?.data?.longitude;

    if (!initialLatitude || !initialLongitude) {
      console.error("Latitude and Longitude not available.");
      return;
    }

    const initializedMap = new window.google.maps.Map(mapRef.current, {
      center: {
        lat: initialLatitude,
        lng: initialLongitude,
      },
      zoom: 10,
    });

    const directionsService = new window.google.maps.DirectionsService();
    directionsRenderer.current = new window.google.maps.DirectionsRenderer({
      map: initializedMap,
      suppressMarkers: true,
    });

    const origin = { lat: initialLatitude, lng: initialLongitude };

    const destinations = MapData?.RouteAssignmentTechnician?.map((item) => {
      if (item?.RouteAssignmentWaterBody) {
        return {
          lat: item.RouteAssignmentWaterBody.servicelat,
          lng: item.RouteAssignmentWaterBody.servicelong,
          position: item.RouteAssignmentWaterBody.position,
          name: item.RouteAssignmentWaterBody.name,
          service_address: item.RouteAssignmentWaterBody.service_address,
          customer_name: item.RouteAssignmentWaterBody.customer_name,
        };
      }
      return null;
    }).filter((dest) => dest !== null);

    if (!destinations || destinations.length === 0) {
      console.warn("No destinations provided.");
      return;
    }

    const homeMarker = new window.google.maps.Marker({
      position: origin,
      map: initializedMap,
      title: "Technician's Start Location",
      icon: {
        url: `data:image/svg+xml,${encodeURIComponent(
          renderToString(
            <IoMdHome color={MapData?.color_code || "green"} size={24} />
          )
        )}`,
        scaledSize: new google.maps.Size(30, 30),
      },
    });

    homeMarker.addListener("click", () => {
      setIsModalVisible(true);
      setSelectedLocation(null); // Clear selected location for home marker
    });

    destinations.forEach((dest) => {
      const marker = new window.google.maps.Marker({
        position: { lat: dest.lat, lng: dest.lng },
        map: initializedMap,
        title: `Service Location ${dest.position}`,
        label: {
          text: `${dest.position}`,
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
        },
        icon: {
          url: `data:image/svg+xml,${encodeURIComponent(
            renderToString(
              <FaLocationPin color={MapData?.color_code || "blue"} size={24} />
            )
          )}`,
          scaledSize: new google.maps.Size(30, 30),
        },
      });

      marker.addListener("click", () => {
        setIsCustomerModalVisible(true);
        setSelectedLocation({
          name: dest.name,
          service_address: dest.service_address,
          customer_name: dest.customer_name,
        });
      });
    });

    const routeOptions = {
      origin: origin,
      destination: destinations[destinations.length - 1],
      waypoints: destinations.slice(0, -1).map((dest) => ({
        location: { lat: dest.lat, lng: dest.lng },
        stopover: true,
      })),
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(routeOptions, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.current.setDirections(result);

        const routeData = result.routes[0].legs.map((leg, index) => ({
          position: index + 1,
          distance: leg.distance.text,
          duration: leg.duration.text,
          startAddress: leg.start_address,
          endAddress: leg.end_address,
        }));
        setRouteInfo(routeData);

        const totalDistanceValue = result.routes[0].legs.reduce(
          (acc, leg) => acc + leg.distance.value,
          0
        );
        const totalDurationValue = result.routes[0].legs.reduce(
          (acc, leg) => acc + leg.duration.value,
          0
        );

        setTotalDistance((totalDistanceValue / 1000).toFixed(2) + " km");
        setTotalDuration(
          Math.floor(totalDurationValue / 3600) +
            " hr " +
            Math.floor((totalDurationValue % 3600) / 60) +
            " min"
        );
      } else {
        console.error("Error fetching directions:", status);
      }
    });
  }, [MapData, userProfile]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOkCustomer = () => {
    setIsCustomerModalVisible(false);
  };

  const handleCancelCustomer = () => {
    setIsCustomerModalVisible(false);
  };

  return (
    <div>
      <div ref={mapRef} style={{ width: "100%", height: "900px" }} />
      <Modal
        title={
          <span>
            Route Information <GiPathDistance />
          </span>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <hr className="hrclass" />

        {selectedLocation && (
          <>
            <p>
              <strong>Customer Name:</strong> {selectedLocation.customer_name}
            </p>
            <p>
              <strong>Pool Name:</strong> {selectedLocation.name}
            </p>
            <p>
              <strong>Service Address:</strong>{" "}
              {selectedLocation.service_address}
            </p>

            <hr className="hrclass" />
          </>
        )}

        <p>
          <strong>Total Distance:</strong> {totalDistance}
        </p>
        <p>
          <strong>Total Duration:</strong> {totalDuration}
        </p>
        <hr className="hrclass" />

        <ul>
          {routeInfo.map((info, index) => (
            <li key={index}>
              <strong>Position {info.position}:</strong> {info.distance} (
              {info.duration})
              <br />
              From: {info.startAddress} <br />
              To: {info.endAddress}
            </li>
          ))}
        </ul>
      </Modal>

      <Modal
        title={
          <span>
            Customer Information <BsPersonCircle />
          </span>
        }
        visible={isCustomerModalVisible}
        onOk={handleOkCustomer}
        onCancel={handleCancelCustomer}
        footer={[
          <Button key="back" onClick={handleCancelCustomer}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOkCustomer}>
            OK
          </Button>,
        ]}
      >
        <hr className="hrclass" />

        {selectedLocation && (
          <>
            <p>
              <strong>Customer Name:</strong> {selectedLocation.customer_name}
            </p>
            <p>
              <strong>Pool Name:</strong> {selectedLocation.name}
            </p>
            <p>
              <strong>Service Address:</strong>{" "}
              {selectedLocation.service_address}
            </p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default RouteMap;
