import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Noti from "../../assets/img/more.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Dropdown, Nav } from "react-bootstrap";
import Pagination from "../Pagination/Pagination";
import { fetchTechnician, STATUSES } from "../../redux/Slices/GetTechnician";
import {
  DeleteTechnicianData,
  resetData,
} from "../../redux/postReducer/postTechnician";
import DeleteModal from "../Modals/DeleteModal";
import Loader from "../NoDataComponent/Loader";
import { RiDeleteBin3Line } from "react-icons/ri";

export default function TechnicianTable() {
  const { data: Technician, status } = useSelector((state) => state.Technician);
  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const paginate = (page) => setpage(page);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(resetData())
  // },[])
  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

  useEffect(() => {
    dispatch(fetchTechnician({ page }));
  }, [dispatch, page]);

  const handleDelete = async (id) => {
    await dispatch(DeleteTechnicianData({ id }));
    dispatch(fetchTechnician({ page }));
    dispatch(resetData());
  };

  const handleEdit = async (id) => {
    navigate("/edit-user", {
      state: {
        id: id,
      },
    });
  };
  useEffect(() => {
    setTotalPages(Technician.totalPages);
    setpostsPerPage(Technician.pageSize);
    settotalPost(Technician.totalCount);
  });

  if (status === STATUSES.LOADING) {
    return <Loader />;
  }

  if (status === STATUSES.ERROR) {
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
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>User Type</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {Technician?.items?.map((item, i) => (
                <tr key={i}>
                  <td className="table-head" onClick={() => handleEdit(item)}>
                    {item.first_name + " " + item.last_name}(
                    {item?.is_active ? "Active" : "Inactive"})
                  </td>

                  <td className="table-head" onClick={() => handleEdit(item)}>
                    {item.email}
                  </td>
                  <td className="table-head" onClick={() => handleEdit(item)}>
                    {item?.phone_no}
                  </td>
                  <td className="table-head" onClick={() => handleEdit(item)}>
                    {item.user_type}
                  </td>

                  <td>
                    <RiDeleteBin3Line
                      className="deleteICon_new"
                      onClick={() => handleModal(item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPost}
            TotalPages={TotalPages}
            paginate={paginate}
            currentPage={page}
          /> */}
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
