import { Breadcrumb } from 'antd';
import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeaderConvertProspectWaterbody() {
    const navigate = useNavigate()
    const handleNav = () => {
        navigate("/prospect");
    }
    return (
        <Fragment>
            <div className='row customers'>
                <div className='col-sm-12 prospectHeader'>
                <Breadcrumb
                    items={[
                        {
                            title: (
                            <h2
                                style={{ cursor: "pointer" }}
                                onClick={handleNav}
                            >
                                Convert Prospect to Customer
                            </h2>
                            ),
                        },
                        {
                            title: (
                            <h2
                                style={{ cursor: "pointer" }}
                            >
                                Water Body
                            </h2>
                            ),
                        },
                    ]}
                />
                </div>
            
            </div>
        </Fragment>
    )
}
