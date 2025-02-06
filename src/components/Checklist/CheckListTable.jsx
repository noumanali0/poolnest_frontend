import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Noti from "../../assets/img/more.png";
import {
  fetchgetCheckListAll,
  fetchgetserviceCheckListAll,
  STATUSES,
} from "../../redux/Slices/getserviceCheckList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Dropdown, Modal, Nav, Button } from "react-bootstrap";
import Pagination from "../Pagination/Pagination";
import { DeleteserviceCheckListData } from "../../redux/postReducer/postServiceCheckList";
import EditServiceListModal from "./EditCheckList";
import Loader from "../NoDataComponent/Loader";
import NoData from "../NoDataComponent/NoData";
import { resetData } from "../../redux/postReducer/postServiceCheckList";
import { toast } from "react-toastify";
import { RiDeleteBin3Line } from "react-icons/ri";
import DeleteModal from "../Modals/DeleteModal";

export default function CheckListTable() {
  const { data: getserviceCheckList, statusdata } = useSelector(
    (state) => state.getserviceCheckList
  );
  const navigate = useNavigate();
  const { success, error } = useSelector((state) => state.postserviceCheckList);

  const [Edit, setEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = async (data) => {
    setShowEdit(true);
    setEdit(data);
  };
  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState();
  const paginate = (pages) => setpage(pages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchgetCheckListAll({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    setTotalPages(getserviceCheckList.totalPages);
    setpostsPerPage(getserviceCheckList.pageSize);
    settotalPost(getserviceCheckList.totalCount);
  });

  const handleDelete = async (data) => {
    await dispatch(DeleteserviceCheckListData({ data }));
    dispatch(fetchgetCheckListAll({ page }));
  };

  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      navigate("/checklist");
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

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
          {getserviceCheckList?.items?.length == 0 ? (
            <NoData />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Description when completed</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {getserviceCheckList?.items?.map((item, i) => (
                  <tr>
                    <td onClick={() => handleShowEdit(item)} className="table-head">{item.Description}</td>
                    <td onClick={() => handleShowEdit(item)} className="table-head">{item.DescriptionOnComplete}</td>
                    <td><RiDeleteBin3Line className="deleteICon_new" onClick={() => handleModal(item._id)}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPost}
            TotalPages={TotalPages}
            paginate={paginate}
            currentPage={page}
          />
        </div>
      </div>

      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Edit Service Checklist
          <Button variant="secondary" onClick={handleCloseEdit}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <EditServiceListModal data1={{ handleCloseEdit, Edit }} />
      </Modal>

      <DeleteModal 
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleDelete={handleDelete}
        id={id}
      />
    </Fragment>
  );
}
