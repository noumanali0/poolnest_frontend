import React, { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import AddProspectServiceHeader from '../components/AddProspectService/AddProspectServiceHeader';
import AddProspectServiceForm from '../components/AddProspectService/AddProspectServiceForm';


export default function AddProspectService() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel" >
                <AdminNav />
                <div className="content">
                    <div className='addcustomers'>
                        <AddProspectServiceHeader />
                        <AddProspectServiceForm />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
