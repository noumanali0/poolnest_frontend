import React, { Fragment, useEffect, useState } from "react";
import Noti from "../../assets/img/more.png";
import { Nav, Dropdown, Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchTechnician, STATUSES } from "../../redux/Slices/GetTechnician";
import { useSelector } from "react-redux";
import Loader from "../NoDataComponent/Loader";
import DeleteModal from "../Modals/DeleteModal";
import {
  DeleteTechnicianData,
  resetData,
} from "../../redux/postReducer/postTechnician";
import Pagination from "../Pagination/Pagination";
import AddTechnicianModal from "./AddTechnicianModal";
import EditTechnicianModal from "./EditTechnicianModal";
import { RiDeleteBin3Line } from "react-icons/ri";

export default function GeneralSettingFormTwo() {
  const { data: Technician, status } = useSelector((state) => state.Technician);
  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [state, setState] = useState(false);

  const paginate = (page) => setpage(page);

  const dispatch = useDispatch();

  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };
  const handleDelete = async (id) => {
    await dispatch(DeleteTechnicianData({ id }));
    const status = "Technician";
    dispatch(fetchTechnician({ status, page }));
    dispatch(resetData());
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleEditShow = (data) => {
    setState(data);

    setShowEdit(true);
  };
  const handleEditClose = () => setShowEdit(false);

  // const handleShowEdit = (data) => {
  //   setShowEdit(true)
  //   setEditData(data)
  // };

  useEffect(() => {
    const status = "Technician";
    dispatch(fetchTechnician({ status }));
  }, []);

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
      {/* <div className="row fomik customer"> */}
      <div className="row fomik customer cslocation generalFilters customerInfo">
        <div className="col-sm-6 generalFiltersResultText">
          <h4 className="sortCustHead">
            Tech Address (For Route Optimization)
          </h4>
        </div>
        <div className="col-sm-6 generalFiltersResultBtn">
          <button className="bluebtn" onClick={handleShow}>
            Add
          </button>
        </div>
        <div className="col-sm-12">
          <div className="routedashboard mainpage customertable gstTable">
            <div className="ct-chart" id="chartActivity">
              <table>
                <thead>
                  <tr>
                    <th>Tech Name</th>
                    <th>Location</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {Technician?.items?.map((item, i) => (
                    <tr key={i}>
                      <td
                        className="table-head"
                        onClick={() => handleEditShow(item)}
                      >
                        {item.first_name + " " + item.last_name}{" "}
                      </td>
                      <td
                        className="table-head"
                        onClick={() => handleEditShow(item)}
                      >
                        {item.Address}
                      </td>
                      <td>
                        <RiDeleteBin3Line
                          className="deleteICon_new"
                          onClick={() => handleModal(item._id)}
                        />
                        {/* <Dropdown as={Nav.Item} className="notidrop">
                          <Dropdown.Toggle
                            data-toggle="dropdown"
                            id="dropdown-67443507"
                            variant="default"
                            className="m-0"
                          >
                            <img src={Noti} alt="boximg" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleEditShow(item)}>
                              Edit
                            </Dropdown.Item>

                            <Dropdown.Item
                              onClick={() => handleModal(item._id)}
                            >
                              {" "}
                              Delete{" "}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPost}
        TotalPages={TotalPages}
        paginate={paginate}
        currentPage={page}
      /> */}
          </div>
        </div>
      </div>
      <DeleteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleDelete={handleDelete}
        id={id}
      />
      {/* </div> */}
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal taxGrpModal"
        centered
      >
        <Modal.Body>
          Add Technician
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <AddTechnicianModal handleClose={handleClose} />
      </Modal>

      <Modal
        show={showEdit}
        onHide={handleEditClose}
        animation={false}
        className="taxratemodal taxGrpModal"
        centered
      >
        <Modal.Body>
          Edit Technician
          <Button variant="secondary" onClick={handleEditClose}>
            X
          </Button>
        </Modal.Body>
        <EditTechnicianModal state={state} handleEditClose={handleEditClose} />
      </Modal>
    </Fragment>
  );
}
