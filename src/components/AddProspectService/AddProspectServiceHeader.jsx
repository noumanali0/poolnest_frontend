import React, { Fragment }  from "react";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";

export default function AddProspectServiceHeader() {
    const navigate = useNavigate();
    const handleNav = () => {
        navigate("/prospect");
    }
  return (
    <Fragment>
        <div className="row customers cslocation">
            <div className="col-sm-12">        
                <Breadcrumb
                    items={[
                        {
                            title: (
                            <h2
                                style={{ cursor: "pointer" }}
                                onClick={handleNav}
                            >
                                Add Prospect 
                            </h2>
                            ),
                        },
                        {
                            title: (
                            <h2
                                style={{ cursor: "pointer" }}
                            >
                                Service
                            </h2>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    </Fragment>
  );
}
