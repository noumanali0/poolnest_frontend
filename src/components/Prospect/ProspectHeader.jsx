import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav, Dropdown } from "react-bootstrap";

export default function ProspectHeader({ getAllprospect }) {
  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 equipmentssss">
          <h2>
            Prospect Listing ({getAllprospect?.totalCount} )
            {/* <span className="counts"> </span> */}
          </h2>
        </div>
        <div className="col-sm-7 right equipmentssss">
          <Dropdown as={Nav.Item} className="notidrop prospecttt">
            <Dropdown.Toggle
              data-toggle="dropdown"
              id="dropdown-67443507"
              variant="default"
              className="m-0"
            >
              Add New
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="/prospect/add-service">Service Prospect</Link>
              </Dropdown.Item>

              <Dropdown.Item>
                <Link to="/prospect/add-work-order"> Work Order Prospect </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </Fragment>
  );
}

{
  /* */
}
