import React, { Fragment, useState } from "react";
import { Nav, Dropdown, Button } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import Modal from "react-bootstrap/Modal";
import TaxGroupHeader from "../TaxGroupEdit/TaxGroupHeaderList";
import TaxGroupEdit from "../TaxGroupEdit/TaxGroupForm";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "../Modals/DeleteModal.jsx";
import TaxGroupHeaderList from "./TaxGroupHeaderList";
import { fetchSalesTax, STATUSES } from "../../redux/Slices/getSaleTax";
import {
  DeleteRateTaxPostData,
  clearData,
} from "../../redux/postReducer/postRateTax";
import Loader from "../NoDataComponent/Loader";
import NoData from "../NoDataComponent/NoData";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination.js";
import { RiDeleteBin3Line } from "react-icons/ri";

export default function TaxGrouptable() {
  const dispatch = useDispatch();
  const { data: SalesTax, status } = useSelector((state) => state.SalesTax);
  const { success, error } = useSelector((state) => state.postRateTaxPost);

  const [Data, setData] = useState("");
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const paginate = (page) => setCurrentPage(page);

  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setData(data);
    setShow(true);
  };
  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

  const handleDelete = async (id) => {
    await dispatch(DeleteRateTaxPostData({ id }));
    dispatch(fetchSalesTax({ currentPage }));
  };

  useEffect(() => {
    setTotalPages(SalesTax.totalPages);
    setpostsPerPage(SalesTax.pageSize);
    settotalPost(SalesTax.totalCount);
  }, [SalesTax]);

  useEffect(() => {
    dispatch(fetchSalesTax({ currentPage }));
  }, [dispatch, currentPage]);
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearData());
    }
    if (error) {
      toast.error(error);
      dispatch(clearData());
    }
  }, [error, success]);

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
      <div className="customertable">
        <div className="row routedashboard mainpage cslocation">
          <div className="col-sm-12">
            <TaxGroupHeaderList />
            <div className="ct-chart" id="chartActivity">
              {SalesTax?.items?.length == 0 ? (
                <NoData />
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Rate</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {SalesTax.items?.map((item, i) => (
                      <tr key={i}>
                        <td
                          className="table-head"
                          onClick={() => handleShow(item)}
                        >
                          {item.name}
                        </td>
                        <td
                          className="table-head"
                          onClick={() => handleShow(item)}
                        >
                          {item.Rate}%
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
              )}
            </div>
            {/* {
              SalesTax?.items?.length > 0 ? 
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={totalPost}
                  TotalPages={TotalPages}
                  paginate={paginate}
                  currentPage={currentPage}
                />
                : <></>
            } */}
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Edit Tax Rate
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <TaxGroupEdit data1={{ Data, handleClose }} />
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
