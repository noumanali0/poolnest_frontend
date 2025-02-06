import React, { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar"
import AddDosageForm from '../components/AddDosages/AddDosagesForm';
import AddDosagesheader from '../components/AddDosages/AddDosagesHeader';
import ReadingHeader from '../components/AddReadings/ReadingHeader';
import ReadingForm from '../components/AddReadings/ReadingForm';

export default function AddReadings() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel" >
                <AdminNav />
                <div className="content">


                    <div className='addcustomers'>
                        <ReadingHeader />
                        
<div className='row cslocation addreadingform addDosagessForm'>
<div className='col-sm-12'>

<ReadingForm />

</div>

</div>


                    </div>
                </div>
            </div>
        </Fragment>
    )
}
