import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { Button } from "antd";
import DeleteModal from "../Modals/DeleteModal";
import { RiDeleteBin3Line } from "react-icons/ri";
import AddReasonForm from "./AddReasonForm";
import { useDispatch } from "react-redux";
import { fetchReason, STATUSES } from "../../redux/Slices/getReason";
import Pagination from "../Pagination/Pagination";
import { useSelector } from "react-redux";
import { DeleteReason } from "../../redux/postReducer/postReason";
import Loader from "../NoDataComponent/Loader";
import EditReasonForm from "./EditReasonForm";

export default function SkippedStopListing() {
  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const dispatch = useDispatch();
  const [Edit, setEdit] = useState("");

  const paginate = (page) => setpage(page);

  const { data: getReason, statusdata } = useSelector(
    (state) => state.getReason
  );

  const handleDelete = async (id) => {
    await dispatch(DeleteReason({ id }));
    toast.success("Data Deleted successfully!");
    dispatch(fetchReason({}));
  };
  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

  const handleEdit = () => {
    setEditModal(true);
  };

  const handleEditClose = () => {
    setEditModal(false);
  };

  useEffect(() => {
    dispatch(fetchReason({ page }));
  }, []);

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

  const handleCloseEdit = () => setEditModal(false);
  const handleShowEdit = async (data) => {
    setEditModal(true);
    setEdit(data);
  };
  return (
    <Fragment>
      <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
          <table>
            <thead>
              <tr>
                <th>Reasons</th>
                <th> </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {getReason.map((item, i) => (
                <tr className="table-head" key={i}>
                  <td onClick={() => handleShowEdit(item)}>{item.reason}</td>
                  <td onClick={() => handleShowEdit(item)}></td>
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
          <DeleteModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleDelete={handleDelete}
            id={id}
          />
          <Modal
            show={editModal}
            onHide={handleEditClose}
            animation={false}
            className="taxratemodal taxGrpModal"
          >
            <Modal.Body>
              Edit Skipped Stop Reason
              <Button variant="secondary" onClick={handleEditClose}>
                {" "}
                X{" "}
              </Button>
            </Modal.Body>
            <EditReasonForm data1={{ handleCloseEdit, Edit }} />
          </Modal>
        </div>
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPost}
        TotalPages={TotalPages}
        paginate={paginate}
        currentPage={page}
      />
    </Fragment>
  );
}
