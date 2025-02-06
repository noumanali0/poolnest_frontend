import React, { Fragment, useState, useEffect } from "react";
import { Nav, Dropdown, Button } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import Modal from "react-bootstrap/Modal";
import EquipmentHeader from "../EditEquipment/EquipmentHeader.jsx";
import EquipmentForm from "../EditEquipment/EquipmentForm.jsx";
import { DeleteEquipmenttData } from "../../redux/postReducer/postEquipment";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchgetAllEquipmemnt,
  STATUSES,
} from "../../redux/Slices/getAllEquipment";
import Pagination from "../Pagination/Pagination.js";
import DeleteModal from "../Modals/DeleteModal.jsx";
import Loader from "../NoDataComponent/Loader";
import NoData from "../NoDataComponent/NoData";
import { toast } from "react-toastify";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { RiDeleteBin3Line } from "react-icons/ri";

export default function Equipmenttable() {
  const dispatch = useDispatch();
  const { data: getAllEquipmemnt, statusdata } = useSelector(
    (state) => state.getAllEquipmemnt
  );
  const [Data, setData] = useState("");
  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const paginate = (page) => setpage(page);
  const [UserData, setUserData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

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

  const handleDelete = async (data) => {
    await dispatch(DeleteEquipmenttData({ data }));
    toast.success("Data Deleted successfully!");
    dispatch(fetchgetAllEquipmemnt({}));
  };

  useEffect(() => {
    dispatch(fetchgetAllEquipmemnt({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    setUserData(getAllEquipmemnt?.items);
    setTotalPages(getAllEquipmemnt?.totalPages);
    setpostsPerPage(getAllEquipmemnt?.pageSize);
    settotalPost(getAllEquipmemnt?.totalCount);
  }, [getAllEquipmemnt]);

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

  const handleSortByName = () => {
    const sortedData = [...UserData].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setUserData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Fragment>
      <div className="routedashboard mainpage customertable equipmentTable">
        <div className="ct-chart" id="chartActivity">
          {UserData?.length == 0 ? (
            <NoData />
          ) : (
            <table>
              <thead>
                <tr>
                  <th onClick={handleSortByName}>
                    Name{" "}
                    {sortOrder === "asc" ? (
                      <FaSortAlphaDown />
                    ) : (
                      <FaSortAlphaUp />
                    )}
                  </th>
                  <th>Descripion</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {UserData?.map((item, i) => (
                  <tr key={i}>
                    <td className="table-head" onClick={() => handleShow(item)}>
                      {item.name}{" "}
                    </td>
                    <td className="table-head" onClick={() => handleShow(item)}>
                      {item.description}
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
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Edit Equipment
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <EquipmentForm data1={{ Data, handleClose }} />
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
