import React, { Fragment, useEffect, useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetCustomers, STATUSES } from "../../redux/Slices/getCustomer";
import { fetchgetSingleCustomers } from "../../redux/Slices/getSingleCustomer";
import { Spin } from "antd";
import DeleteModal from "../Modals/DeleteModal";
import { deleteCustomerData } from "../../redux/postReducer/postCustomer";

export default function Customertable() {



  // --------------- useState ----------------- //
  const [UserData, setData] = useState([]);
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const paginate = (page) => setCurrentPage(page);
  const [name, setname] = useState("");
  const [status, setstatus] = useState("");
  const [customer_type, setcustomer_type] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);

    // --------------- useState End ----------------- //

  const token = Cookies.get("userToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

    // --------------- Useselector of customer ----------------- //

  const { data: getCustomer, statusdata } = useSelector(
    (state) => state.getCustomer
  );


      // --------------- Delete function of customer ----------------- //

  const handleDelete = async (id) => {
    await  dispatch(deleteCustomerData({id}))
    toast.success("Customer Deleted Successfully");
    dispatch(fetchgetCustomers({ name, customer_type, status, currentPage }));
  };

      // --------------- Modal of delete Alert ----------------- //

  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

        // --------------- Edit Customer navigation function----------------- //

  const NavigationToProfileUpdate = async (id) => {
    try {
      dispatch(fetchgetSingleCustomers({ id }));
      navigate(`/edit-customer/${id}`);
    } catch (err) {
      toast.error(err);
    }
  };

        // --------------- useEffect to get Data ----------------- //


  useEffect(() => {
    dispatch(fetchgetCustomers({ name, customer_type, status, currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    setData(getCustomer.items);
    setTotalPages(getCustomer.totalPages);
    setpostsPerPage(getCustomer.pageSize);
    settotalPost(getCustomer.totalCount);
  });


          // --------------- Loader Data API Status----------------- //

  if (statusdata === STATUSES.LOADING) {
    return (
      <div className="spinnerclass">
        <Spin />
      </div>
    );
  }

  if (statusdata === STATUSES.ERROR) {
    return (
      <h2
        style={{
          margin: "100px",
        }}
      >
        Something went wrong!
      </h2>
    );
  }

  return (
    <Fragment>
      <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Rate</th>
                <th>Rate Type</th>
                <th>Labor Cost</th>
                <th>Labor Cost Type</th>
                <th>Sales Tax Group</th>

                <th> </th>
              </tr>
            </thead>

            <tbody>
              {getCustomer?.items && getCustomer?.items.length > 0 ? (
                getCustomer?.items &&
                getCustomer?.items.map((data) => {
                  return (
                    <tr key={data.customer_id}>
                      <td>
                        <b>{data.first_name + " " + data.last_name}</b>
                      </td>
                      <td>{data.Customer_type?.name}</td>
                      <td>{data.mobile_no_primary}</td>
                      <td>{data.mobile_no_primary}</td>
                      <td>{data.mobile_no_primary}</td>
                      <td>{data.email}</td>
                      <td>
                        <Dropdown as={Nav.Item} className="notidrop">
                          <Dropdown.Toggle
                            data-toggle="dropdown"
                            id="dropdown-67443507"
                            variant="default"
                            className="m-0"
                          >
                            <img src={Noti} alt="boximg" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            
                            <Dropdown.Item
                              onClick={() => handleModal(data.customer_id)}
                            >
                              {" "}
                              Delete{" "}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPost}
            TotalPages={TotalPages}
            paginate={paginate}
            currentPage={currentPage}
          />
          <DeleteModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleDelete={handleDelete}
            id={id}
          />
        </div>
      </div>
    </Fragment>
  );
}
