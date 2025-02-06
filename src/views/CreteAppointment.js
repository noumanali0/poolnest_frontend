import React, { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import CreateAppointment from '../components/ProspectView/CreateAppointment';

export default function CreteAppointment() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel" >
                <AdminNav />
                <div className="content">
                    <div className='addcustomers'>
                        <CreateAppointment />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
