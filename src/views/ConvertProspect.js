import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import ConvertProspectHeader from '../components/ConvertProspectt/ConvertProspectHeader';
import ConvertProspectForm from '../components/ConvertProspectt/ConvertProspectForm';
import { useDispatch } from 'react-redux';
import { fetchgetsingleProspectCustomer } from '../redux/Slices/getProspect';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ConvertProspect() {
    const [isFieldsDisabled, setIsFieldsDisabled] = useState(true);

    const {id} = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchgetsingleProspectCustomer({id}))
    },[dispatch])
    const toggleFields = () => {
        setIsFieldsDisabled((prev) => !prev);
    };
    return (
        <Fragment>
            <Sidebar routes={routes}/>
            <div className="main-panel" >
                <AdminNav />
                <div className="content">
                    <div className='addcustomers'>
                        <ConvertProspectHeader toggleFields={toggleFields}/>
                        <ConvertProspectForm isFieldsDisabled={isFieldsDisabled}/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
