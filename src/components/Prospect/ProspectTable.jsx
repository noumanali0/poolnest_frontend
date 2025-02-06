import React, { Fragment, useEffect, useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { fetchgetAllprospect } from "../../redux/Slices/getProspect";
import { useDispatch } from "react-redux";
import { RiDeleteBin3Line } from "react-icons/ri";

export default function ProspectTable({ tableData }) {
  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const NavigationToProfileUpdate = async (id) => {
    try {
      navigate(`/prospect/view/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const paginate = (page) => setpage(page);
  useEffect(() => {
    setTotalPages(tableData?.totalPages);
    setpostsPerPage(tableData?.pageSize);
    settotalPost(tableData?.totalCount);
  }, [tableData]);

  useEffect(() => {
    dispatch(fetchgetAllprospect({ page }));
  }, [dispatch, page]);
  return (
    <Fragment>
      <div className="routedashboard mainpage customertable equipmentTable">
        <div className="ct-chart" id="chartActivity">
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Prospect Type</th>
                <th>Is Converted</th>
                <th>Type</th>
                <th>Address</th>
                <th>Mobile No</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tableData?.items?.map((item, i) => (
                <tr key={i} className="prospectlist">
                  <td onClick={() => NavigationToProfileUpdate(item?._id)}>
                    {item?.first_name + " " + item?.last_name}
                  </td>
                  <td onClick={() => NavigationToProfileUpdate(item?._id)}>
                    {item?.ProspectType ? "Work Order" : "Service"}
                  </td>{" "}
                  <td onClick={() => NavigationToProfileUpdate(item?._id)}>
                    {item?.ProspectConverted ? "Yes" : "No"}
                  </td>{" "}
                  <td onClick={() => NavigationToProfileUpdate(item?._id)}>
                    {item?.ProspectWaterBodyType}
                  </td>{" "}
                  <td onClick={() => NavigationToProfileUpdate(item?._id)}>
                    {item?.billing_address}
                  </td>
                  <td onClick={() => NavigationToProfileUpdate(item?._id)}>
                    {item?.mobile_no_primary}
                  </td>
                  <td onClick={() => NavigationToProfileUpdate(item?._id)}>
                    {item?.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={totalPost}
          TotalPages={TotalPages}
          paginate={paginate}
          currentPage={page}
        />
      </div>
    </Fragment>
  );
}
