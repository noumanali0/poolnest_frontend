import React, { Fragment, useEffect } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchgetProductData, STATUSES } from "../../redux/Slices/getProduct";
import { DeleteProductsDataData } from "../../redux/postReducer/postProducts";
import Pagination from "../Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "../Modals/DeleteModal";
import Loader from "../NoDataComponent/Loader";
import NoData from "../NoDataComponent/NoData";
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

export default function Producttable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: getProductData, statusdata } = useSelector(
    (state) => state.getProductData
  );

  const [UserData, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const paginate = (page) => setpage(page);

  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

  const handleDelete = async (id) => {
    await dispatch(DeleteProductsDataData({ id }));
    dispatch(fetchgetProductData({ page }));
  };

  const handleNavigate = async (id) => {
    await navigate("/edit-product", {
      state: {
        id: id,
      },
    });
  };

  useEffect(() => {
    dispatch(fetchgetProductData({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    setData(getProductData.items);
    setTotalPages(getProductData.totalPages);
    setpostsPerPage(getProductData.pageSize);
    settotalPost(getProductData.totalCount);
  }, [getProductData]);

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
                    Product Name{" "}
                    {sortOrder === "asc" ? (
                      <FaSortAlphaDown />
                    ) : (
                      <FaSortAlphaUp />
                    )}
                  </th>
                  <th>Product Category</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Taxed</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {UserData?.map((item, i) => (
                  <tr>
                    <td
                      className="table-head"
                      onClick={() => handleNavigate(item)}
                    >
                      {item.name}
                    </td>
                    <td
                      className="table-head"
                      onClick={() => handleNavigate(item)}
                    >
                      {item.Item_typeData?.name}
                    </td>
                    <td
                      className="table-head"
                      onClick={() => handleNavigate(item)}
                    >
                      {item.description}
                    </td>
                    <td
                      className="table-head"
                      onClick={() => handleNavigate(item)}
                    >
                      ${item?.price}
                    </td>

                    <td
                      className="table-head"
                      onClick={() => handleNavigate(item)}
                    >
                      {item?.isTaxable ? "✔️" : "❌"}
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

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPost}
            TotalPages={TotalPages}
            paginate={paginate}
            currentPage={page}
          />
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
