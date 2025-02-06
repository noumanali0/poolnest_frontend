import React, { Fragment, useState } from "react";
import { Card } from "react-bootstrap";
import Avatar from "../../assets/img/avatar.png";
import Avatar1 from "../../assets/img/more1.png";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { useSelector } from "react-redux";

export default function EmailList({ broadCastEmail }) {
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const paginate = (page) => setCurrentPage(page);
  const [currentPage, setCurrentPage] = useState(1);

  const [removedData, setRemovedData] = useState([]); // State to hold removed data

  const ExcludeData = (item) => {
    const filteredData = broadCastEmail?.MapData?.data.filter(
      (dataItem) => dataItem?.CustomerId !== item?.CustomerId
    );
    const removedItem = broadCastEmail?.MapData?.data.find(
      (dataItem) => dataItem?.CustomerId === item?.CustomerId
    ); // Find the removed item
    setRemovedData((prevRemovedData) => [...prevRemovedData, removedItem]); // Add removed item to removedData state
    broadCastEmail.setValue({ ...broadCastEmail.MapData, data: filteredData });
  };

  const IncludeData = (item) => {
    const includedData = removedData.filter(
      (dataItem) => dataItem?.CustomerId !== item?.CustomerId
    ); // Filter out the included item
    setRemovedData(includedData); // Update removedData state
    broadCastEmail.setValue({
      ...broadCastEmail.MapData,
      data: [...broadCastEmail.MapData.data, item],
    }); // Add the item back to MapData.data
  };


  return (
    <Fragment>
      <Card className="workorder customer">
        <Card.Header>
          <Card.Title as="h4">
            {broadCastEmail?.MapData?.data?.length} Recipients
          </Card.Title>
        </Card.Header>

        <div className="emailLSit">
          {broadCastEmail?.MapData?.data?.map((item, index) => {
            return (
              <Card.Body>
                <div
                  className="row workdetail emailList cslocation"
                  key={index}
                >
                  <div className="col-sm-8">
                    <h3>{item?.CustomerName}</h3>
                    <p>{item?.CustomerEmail}</p>
                  </div>
                  <div className="col-sm-2 widthZero"></div>
                  <div className="col-sm-2">
                    <button
                      className="Exclude_css"
                      onClick={() => ExcludeData(item)}
                    >
                      Exclude
                    </button>
                  </div>
                </div>
              </Card.Body>
            );
          })}
          {removedData?.map((item, key) => {
            return (
              <Card.Body>
                <div className="row workdetail emailList cslocation" key={key}>
                  <div className="col-sm-8">
                    <h3>{item?.CustomerName}</h3>
                    <p>{item?.CustomerEmail}</p>
                  </div>
                  <div className="col-sm-2 widthZero"></div>
                  <div className="col-sm-2">
                    <button
                      className="Include_css"
                      onClick={() => IncludeData(item)}
                    >
                      Include
                    </button>
                  </div>
                </div>
              </Card.Body>
            );
          })}
        </div>
        {/* <Pagination
          postsPerPage={postsPerPage}
          totalPosts={totalPost}
          TotalPages={TotalPages}
          currentPage={currentPage}
          paginate={paginate}
        /> */}
      </Card>
    </Fragment>
  );
}
