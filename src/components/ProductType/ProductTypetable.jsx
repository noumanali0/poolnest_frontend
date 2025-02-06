import React, { Fragment } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Button } from "antd";
import EditProductTypeForm from "../EditProductType/EditProductTypeForm";
import { fetchgetProductType , STATUSES } from "../../redux/Slices/getProductType"; 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import {
  DeleteitemTypeData,
  clearData,
} from "../../redux/postReducer/postProductType";
import Pagination from "../Pagination/Pagination.js";
import DeleteModal from "../Modals/DeleteModal";
import Loader from "../NoDataComponent/Loader";
import NoData from "../NoDataComponent/NoData";
import { toast } from "react-toastify";
import { RiDeleteBin3Line } from "react-icons/ri";

export default function ProductTypetable() {
  const dispatch = useDispatch();

  const { data: getProductType, statusdata } = useSelector(
    (state) => state.getProductType
  );
  const { error, success } = useSelector((state) => state.postsProductType);

  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const paginate = (pages) => setpage(pages);
  const [Edit, setEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = async (id) => {
    await dispatch(DeleteitemTypeData({ id }));
    dispatch(fetchgetProductType({ page }));
  };

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = async (data) => {
    setShowEdit(true);
    setEdit(data);
  };
  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

  useEffect(() => {
    dispatch(fetchgetProductType({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    setTotalPages(getProductType?.totalPages);
    setpostsPerPage(getProductType?.pageSize);
    settotalPost(getProductType?.totalCount);
  }, [getProductType]);
  console.log(error, "error");
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearData());
    }
    if (error) {
      toast.error(error);
      dispatch(clearData());
    }
  }, [success, error]);

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
          {getProductType?.items?.length == 0 ? (
            <NoData />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Product Type Name</th>
                  <th>CreatedAt</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {getProductType?.items?.map((item, i) => (
                  <tr>
                    <td onClick={() => handleShowEdit(item)} className="table-head">{item.name}</td>
                    <td onClick={() => handleShowEdit(item)} className="table-head">{moment(item.createdAt).format("DD/MMM/YYYY")} </td>
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
          Edit Product Type
          <Button variant="secondary" onClick={handleCloseEdit}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <EditProductTypeForm data1={{ handleCloseEdit, Edit }} />
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
