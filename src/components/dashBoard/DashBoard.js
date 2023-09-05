import * as React from "react";
import TopBar from "../sidebarTopBar/TopBar";
import {Route, Routes, useNavigate} from "react-router-dom";
import SideBarP from "../sidebarTopBar/SideBarP";
import {Helmet} from "react-helmet";

const DashBoard = () => {
    return (
        <>
            <Helmet>
                <title>Dashboard | Portal</title>
                <meta name="description" content="This the Admin Portal to Control the website" />
            </Helmet>

            <div className="App">
                <div className="container-fluid">
                    <div className="row">
                        <SideBarP/>
                        <div className="col-md-10 p_0">
                            <TopBar/>

                            <div className="container-fluid portalMainBody">
                                <div className="row">
                                    <div className="col-md-12 p_0">
                                        <h4>This Is Admin Dashboard</h4>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default DashBoard
