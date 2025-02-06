import React, { Fragment } from "react";
import { fetchgetAllreading, STATUSES } from "../../redux/Slices/getAllReading";
// import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { DeleteReadingDataData } from "../../redux/postReducer/postReadingData";
import { useNavigate } from "react-router-dom";
import Loader from "../NoDataComponent/Loader";
import NoData from "../NoDataComponent/NoData";
import DeleteModal from "../Modals/DeleteModal";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { resetData } from "../../redux/postReducer/postDosages";
import { RiDeleteBin3Line } from "react-icons/ri";

export default function Readingtable() {
  const navigate = useNavigate();

  const { data: getAllreading, statusdata } = useSelector(
    (state) => state.getAllreading
  );
  const { success, error } = useSelector((state) => state.postReading);
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState();

  const [page, setpage] = useState(1);
  const [size, setsize] = useState(5000);

  const [UserData, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // State variable for sorting order

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await dispatch(DeleteReadingDataData({ id }));
    dispatch(fetchgetAllreading({ page, size }));
  };

  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

  const handleEdit = async (id) => {
    navigate("/edit-readings", {
      state: {
        id: id,
      },
    });
  };

  useEffect(() => {
    dispatch(fetchgetAllreading({ page, size }));
  }, [page]);

  useEffect(() => {
    setData(getAllreading.items);
  }, [getAllreading]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
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
      <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
          {UserData?.length == 0 ? (
            <NoData />
          ) : (
            <table>
              <thead>
                <tr>
                  <th onClick={handleSortByName}>
                    Reading{" "}
                    {sortOrder === "asc" ? (
                      <FaSortAlphaDown />
                    ) : (
                      <FaSortAlphaUp />
                    )}
                  </th>
                  <th>UOM</th>
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
