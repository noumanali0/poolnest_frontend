import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import routes from "../../src/routes";
import { GeneralSettingSubHeader } from "../components/GeneralSetting/GeneralSettingSubHeader";
import GeneralSettingHeader from "../components/GeneralSetting/GeneralSettingHeader";
import { Container } from "react-bootstrap";

export default function GeneralSetting()
{
    return(
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid className="generalSetting">
                        {/* <GeneralSettingHeader /> */}
                        <div className="addcustomers genralSteing">
                            <GeneralSettingSubHeader />
                        </div>
                    </Container>
                </div>
            </div>
        </Fragment>
    )
}