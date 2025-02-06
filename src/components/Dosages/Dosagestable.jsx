import React, { Fragment } from "react";
import { fetchgetAlldosage, STATUSES } from "../../redux/Slices/getAllDosages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import {
  DeletedosagesDataData,
  resetData,
} from "../../redux/postReducer/postDosages";
import { useNavigate } from "react-router-dom";
import Loader from "../NoDataComponent/Loader";
import NoData from "../NoDataComponent/NoData";
import DeleteModal from "../Modals/DeleteModal";
import { toast } from "react-toastify";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { RiDeleteBin3Line } from "react-icons/ri";

export default function DosgesTable() {
  const { data: getAlldosage, statusdata } = useSelector(
    (state) => state.getAlldosage
  );
  const { success } = useSelector((state) => state.postdosages);
  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState();
  const paginate = (pages) => setpage(pages);
  const [UserData, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchgetAlldosage({ page }));
  }, [page]);

  useEffect(() => {
    setTotalPages(getAlldosage.totalPages);
    setpostsPerPage(getAlldosage.pageSize);
    settotalPost(getAlldosage.totalCount);
    setData(getAlldosage.items);
  }, [getAlldosage]);
  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

  const handleDelete = async (id) => {
    await dispatch(DeletedosagesDataData({ id }));
    dispatch(fetchgetAlldosage({ page }));
  };

  const handleEdit = async (id) => {
    navigate("/edit-dosages", {
      state: {
        id: id,
      },
    });
  };
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
    }
  }, [success]);

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
        return a?.name.localeCompare(b?.name);
      } else {
        return b?.name.localeCompare(a?.name);
      }
    });
    setData(sortedData);
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
                  <th>UOM</th>
                  <th>Cost Per Unit</th>
                  <th>Customer Price per Unit</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {UserData?.map((item, i) => (
                  <tr>
                    <td className="table-head" onClick={() => handleEdit(item)}>
                      {item.name}
                    </td>
                    <td className="table-head" onClick={() => handleEdit(item)}>
                      {item?.unit_of_measurement}
                    </td>
                    <td className="table-head" onClick={() => handleEdit(item)}>
                      ${item?.cost_per_unit}
                    </td>
                    <td className="table-head" onClick={() => handleEdit(item)}>
                      $ {item?.price_per_unit}
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

          <DeleteModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleDelete={handleDelete}
            id={id}
          />
        </div>
        {/* <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPost}
            TotalPages={TotalPages}
            paginate={paginate}
            currentPage={page}
          /> */}
      </div>
    </Fragment>
  );
}
