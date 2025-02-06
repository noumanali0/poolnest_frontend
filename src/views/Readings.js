import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import ReadingHeader from "../components/Readings/ReadingHeader";
import Readingfilter from "../components/Readings/Readingfilter";
import Readingtable from "../components/Readings/Readingtable";

export default function Readings() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid>
                        <ReadingHeader />
                        <Readingfilter />
                        <Readingtable />
                    </Container>
                </div>
            </div>
        </Fragment>
    );
}
