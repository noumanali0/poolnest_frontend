import React, { useState } from "react";
import { Fragment } from "react";
import { fetchgetProductType } from "../../redux/Slices/getProductType";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchgetProductData } from "../../redux/Slices/getProduct";

export default function Productfilter() {
  const dispatch = useDispatch();

  const { data: getProductType } = useSelector((state) => state.getProductType);

  const [name, setName] = useState("");
  const [itemId, setItemId] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(fetchgetProductData({ name, itemId }));
  };

  const [selectedItem, setSelectedItem] = useState("");

  const handleSelectChange = (e) => {
    setSelectedItem(e.target.value);
    setItemId(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchgetProductType({}));
  }, [dispatch]);

  return (
    <Fragment>
      <form className="myfilters productFiltersss" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for Product Name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="form-select form-select-sm select2"
          aria-label=".form-select-sm example"
          name="item_type_id"
          onChange={handleSelectChange}
          value={selectedItem}
          // onChange={(e) => setItemId(e.target.value)}
        >
          <option selected value="">
            All Products
          </option>
          {getProductType?.items?.map((item, i) => (
            <option value={item._id} key={i}>
              {item.name}
            </option>
          ))}
        </select>

        <button type="submit">
          {" "}
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </form>
    </Fragment>
  );
}
