import React,{useState,useEffect} from "react";
import {Helmet} from "react-helmet";
import SideBarP from "../sidebarTopBar/SideBarP";
import TopBar from "../sidebarTopBar/TopBar";
import AddIcon from "@mui/icons-material/Add";
import {Rings} from "react-loader-spinner";
import {orderHistory} from "../../controllers/WebController";

const Orders = () => {
    const [orders,SetOrders] = useState();
    useEffect(() => {
        getOrders()
    }, []);

    const getOrders = async () => {
        const res = await orderHistory()
        console.log(res.orders)
    }
    return(
        <>
            <Helmet>
                <title>Orders | Portal</title>
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
                                    <div className="col-md-12">

                                    </div>
                                    <div className="col-md-12 p_0">
                                        <div className="bodylayout">
                                            <div className="container-fluid">
                                                <div className="row ">
                                                    <div className="col-md-12 topbodybar">
                                                        <h4> Products</h4>
                                                        <button type="button" className="btn btn-primary" > <AddIcon fontSize={"small"}/>  Orders</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-fluid listContent">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="table-responsive">
                                                            <table className="table table-bordered table-hover">
                                                                <thead className="tableHead">
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Product Image</th>
                                                                    <th>Product Name</th>
                                                                    <th>Product Category</th>
                                                                    <th>Product Slug</th>
                                                                    <th>Product Date</th>
                                                                    <th>Product Status</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Orders;
