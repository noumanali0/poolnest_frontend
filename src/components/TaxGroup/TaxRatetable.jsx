import React, { Fragment, useState } from "react";
import { Nav, Dropdown, Button } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import Modal from "react-bootstrap/Modal";
import TaxRateHeader from "../TaxGroupEdit/TaxRateHeaderList";
import TaxRateForm from "../TaxGroupEdit/TaxRateForm";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "../Modals/DeleteModal.jsx";
import TaxRateHeaderList from "./TaxRateHeaderList";
import { fetchSalesTaxGroup, STATUSES } from "../../redux/Slices/getSaleGroup";
import {
  DeleteSalesTaxGroupPostData,
  resetData,
} from "../../redux/postReducer/postSalesTaxGroup";
import Loader from "../NoDataComponent/Loader";
import NoData from "../NoDataComponent/NoData";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination.js";
import { RiDeleteBin3Line } from "react-icons/ri";

export default function TaxRatetable() {
  const dispatch = useDispatch();

  const { data: SalesTaxGroup, status } = useSelector(
    (state) => state.SalesTaxGroup
  );
  const { success, error } = useSelector((state) => state.postRateTaxPost);

  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (page) => setCurrentPage(page);

  const [Data, setData] = useState("");
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);

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
    await dispatch(DeleteSalesTaxGroupPostData({ id }));
    dispatch(fetchSalesTaxGroup({ currentPage }));
  };

  useEffect(() => {
    dispatch(fetchSalesTaxGroup({ currentPage }));
  }, [dispatch, currentPage]);

  // useEffect(() => {
  //   if (success) {
  //     toast.success(success);
  //     dispatch(resetData());

  //   }
  //   if (error) {
  //     toast.error(error);
  //     dispatch(resetData());
  //   }
  // }, [error, success]);

  useEffect(() => {
    setTotalPages(SalesTaxGroup.totalPages);
    setpostsPerPage(SalesTaxGroup.pageSize);
    settotalPost(SalesTaxGroup.totalCount);
  }, [SalesTaxGroup]);

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
            <TaxRateHeaderList />
            <div className="ct-chart" id="chartActivity">
              {SalesTaxGroup?.items?.length == 0 ? (
                <NoData />
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Total Rate</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {SalesTaxGroup?.items?.map((item, i) => (
                      <tr key={i}>
                        <td
                          className="table-head"
                          onClick={() => handleShow(item)}
                        >
                          {item?.name}
                        </td>
                        <td
                          className="table-head"
                          onClick={() => handleShow(item)}
                        >
                          {!item?.TotalSalesTax
                            ? item?.TotalSalesTax
                            : item?.TotalSalesTax}
                          %
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
              SalesTaxGroup?.items?.length > 0 ? 
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
          Edit Tax Group
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <TaxRateForm data1={{ Data, handleClose }} />
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
