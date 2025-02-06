import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import SkippedStopHEader from "../components/SkippedStopReason/SkippedStopHEader";
import SkippedStopListing from "../components/SkippedStopReason/SkippedStopListing";

export default function SkippedStopReason() {
    return (
        <Fragment>
            <Sidebar routes={routes} /> 
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid>
                        <SkippedStopHEader />
                        <SkippedStopListing />
                    </Container>
                </div>
            </div>
        </Fragment>
    );
}
