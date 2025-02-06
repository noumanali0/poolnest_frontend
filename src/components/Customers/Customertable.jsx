import React, { Fragment, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetCustomers, STATUSES } from "../../redux/Slices/getCustomer";
import { fetchgetSingleCustomers } from "../../redux/Slices/getSingleCustomer";
import DeleteModal from "../Modals/DeleteModal";
import { deleteCustomerData } from "../../redux/postReducer/postCustomer";
import Loader from "../NoDataComponent/Loader";
import NoData from "../NoDataComponent/NoData";
import Avatar from "../../assets/img/avatar.png";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { RiDeleteBin3Line } from "react-icons/ri";

export default function Customertable({ first_name }) {
  console.log(first_name);
  const { data: getCustomer, statusdata } = useSelector(
    (state) => state.getCustomer
  );

  const [UserData, setData] = useState([]);
  const [totalPost, settotalPost] = useState(getCustomer.totalCount);
  const [size, setsize] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const NavigationToProfileUpdate = async (id) => {
    try {
      dispatch(fetchgetSingleCustomers({ id }));
      navigate(`/customerview/${id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    dispatch(fetchgetCustomers({ size, currentPage }));
  }, [dispatch, currentPage, size]);

  const handleSortByName = () => {
    const sortedData = [...UserData].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.first_name.localeCompare(b.first_name);
      } else {
        return b.first_name.localeCompare(a.first_name);
      }
    });
    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  useEffect(() => {
    if (getCustomer.items) {
      setData(getCustomer.items);
      settotalPost(getCustomer.totalCount);
    }
  }, [getCustomer, first_name]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (totalPost > size) {
        setsize((prevSize) => prevSize + 40);
      }
    }
  }, [size, totalPost]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (statusdata === STATUSES.LOADING) {
    return <Loader />;
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
                <th onClick={handleSortByName}>
                  Customer Name
                  {sortOrder === "asc" ? (
                    <FaSortAlphaDown />
                  ) : (
                    <FaSortAlphaUp />
                  )}
                </th>
                <th>Type</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Prospect Customer</th>
                <th>Routes Assigned</th>
              </tr>
            </thead>

            <tbody>
              {UserData && UserData?.length > 0 ? (
                UserData?.map((data) => (
                  <tr key={data.customer_id} className="table-head">
                    <td onClick={() => NavigationToProfileUpdate(data._id)}>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <img
                            src={data.image ? data.image : Avatar}
                            alt="image"
                          />
                        </div>
                        <div>
                          <b>{data.first_name + " " + data.last_name}</b>
                        </div>
                      </div>
                    </td>
                    <td onClick={() => NavigationToProfileUpdate(data._id)}>
                      {data?.customertypename}
                    </td>
                    <td onClick={() => NavigationToProfileUpdate(data._id)}>
                      {data.mobile_no_primary}
                    </td>
                    <td onClick={() => NavigationToProfileUpdate(data._id)}>
                      {data.email}
                    </td>
                    <td onClick={() => NavigationToProfileUpdate(data._id)}>
                      {data?.ProspectId ? "Yes" : "No"}
                    </td>
                    <td onClick={() => NavigationToProfileUpdate(data._id)}>
                      {data?.NumberOfRoutesAssigned}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <NoData />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}
