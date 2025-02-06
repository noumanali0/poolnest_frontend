import React, { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import BroadCastEmailHeader from '../components/BroadCastEmail/BroadCastEmailHeader';
import BroadCastEmailForm from '../components/BroadCastEmail/BroadCastEmailForm';

export default function BroadCastEmail() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel" >
                <AdminNav />
                <div className="content">


                    <div className='addcustomers'>
                        <BroadCastEmailHeader />
                        <BroadCastEmailForm />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
