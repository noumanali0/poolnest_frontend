import React, { Fragment, useState } from "react";
import { Nav, Dropdown, Modal } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import Analyze from "../../assets/img/Analyze.png";
import Pagination from "../Pagination/Pagination";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Button } from "antd";
import CustomerDetail from "./CustomerDetail";

export default function NewChemicalDosageCustomerDetailTable({ data }) {
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [Data, setData] = useState();
  const [Item, setItem] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (page) => setCurrentPage(page);
  const [StartDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [EndDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleShow = (data, item) => {
    setData(data);
    setItem(item);
    setShow(true);
    console.log(data, item);
  };

  const handleClose = () => {
    setShow(false);
  };

  // useEffect(() => {
  //     setTotalPages(labourReport.totalPages);
  //     setpostsPerPage(labourReport.pageSize);
  //     settotalPost(labourReport.totalCount);
  // },[labourReport]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  }

  return (
    <Fragment>
      <div className="routedashboard mainpage customertable mainHeadChemical height-rechanges">
        {data?.items?.map((item, i) => {
          return (
            <div className="ct-chart" id="chartActivity" key={i}>
              <h3>
                {item?.first_name + " " + item?.last_name}{" "}
                <span>(Customers)</span>
              </h3>
              <p>{item?.address}</p>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Tech</th>
                    <th>Pool</th>
                    {/* <th>Chemical</th>
                    <th>Dosages</th> */}
                    <th>Cost</th>
                    <th>Price</th>
                    <th>Profit</th>
                  </tr>
                </thead>

                <tbody>
                  {item?.CustomerServiceLocation &&
                    item?.CustomerServiceLocation[0]?.CompletedServiceRoutesServiceLocation?.map(
                      (data, index) => {
                        return (
                          <tr>
                            <td>{formatDate(data?.ServiceDate)}</td>
                            <td>
                              {
                                data?.CompletedServiceRoutes_Technician_id
                                  ?.first_name
                              }
                            </td>
                            <td>
                              {data?.CompletedServiceRoutesWaterBody?.name}
                            </td>
                            {/* <td>Tabs</td>
                            <td>1</td> */}
                            <td>${data?.TotalCost}</td>
                            <td>${data?.TotalPrice}</td>
                            <td>${data?.TotalProfit}</td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => handleShow(data, item)}
                            >
                              <img src={Analyze} alt="" />
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            </div>
          );
        })}

        {data?.items?.length > 0 ? (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPost}
            TotalPages={TotalPages}
            paginate={paginate}
            currentPage={currentPage}
          />
        ) : (
          <></>
        )}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Customer Name
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <CustomerDetail data={Data} Item={Item} />
      </Modal>
    </Fragment>
  );
}
