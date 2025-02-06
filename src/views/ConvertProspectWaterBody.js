import React, { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import HeaderConvertProspectWaterbody from '../components/ConvertProspectWaterBody/HeaderConvertProspectWaterbody';
import ProspectWaterBodyForm from '../components/ConvertProspectWaterBody/ProspectWaterBodyForm';

export default function ConvertProspectWaterBody() {
    return (
        <Fragment>
            <Sidebar routes={routes}/>
            <div className="main-panel" >
                <AdminNav />
                <div className="content">
                    <div className='addcustomers'>
                        <HeaderConvertProspectWaterbody />
                        <ProspectWaterBodyForm />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
