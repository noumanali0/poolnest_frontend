import React, { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import ConvertProspectPoolHeader from '../components/ConvertProspectPool/ConvertProspectPoolHeader';
import ProspectPoolForm from '../components/ConvertProspectPool/ProspectPoolForm';

export default function ConvertProspectPool() {
    return (
        <Fragment>
            <Sidebar routes={routes}/>
            <div className="main-panel" >
                <AdminNav />
                <div className="content">
                    <div className='addcustomers'>
                        <ConvertProspectPoolHeader />
                        <ProspectPoolForm />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
