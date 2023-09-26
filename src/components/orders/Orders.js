import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import SideBarP from "../sidebarTopBar/SideBarP";
import TopBar from "../sidebarTopBar/TopBar";
import AddIcon from "@mui/icons-material/Add";
import { Rings } from "react-loader-spinner";
import { orderHistory,changeOrderStatus } from "../../controllers/WebController";
import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const Orders = () => {
    const [orders, setOrders] = useState();
    const [error, setError] = useState({
        message: "",
        stauts: ""
    });

    useEffect(() => {
        getOrders();
    }, [error]);

    const getOrders = async () => {
        const res = await orderHistory();
        setOrders(res.orders)
        console.log()
    }

    const [EditModel, setEditModel] = useState(false);
    const [singleData, setSingleData] = useState();
    const [loader, setLoader] = useState(false);
    const [status, setStatus] = useState(singleData?.orderStatus);
    const EditOrder = (data) => {
        setEditModel(true);
        setSingleData(data);
        setStatus(data?.orderStatus)
    }
    const CloseEditOrder = (data) => {
        setEditModel(false);
        setSingleData();
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setStatus(value);
    };

    const saveData = async () => {
        let res = await changeOrderStatus(singleData._id,status)
        if (res.status === "Success") {

            setError(prevState => ({ ...prevState, message: res.message }))
            setError(prevState => ({ ...prevState, status: res.status }))
            CloseEditOrder()
        } else {
            CloseEditOrder()
            setError(prevState => ({ ...prevState, message: res.message }))
            setError(prevState => ({ ...prevState, status: res.status }))
        }
    }

    return (
        <>
            <Helmet>
                <title>Orders | Portal</title>
                <meta name="description" content="This the Admin Portal to Control the website" />
            </Helmet>
            <div className="App">
                <div className="container-fluid">
                    <div className="row">
                        <SideBarP />
                        <div className="col-md-10 p_0">
                            <TopBar />

                            <div className="container-fluid portalMainBody">
                                <div className="row">
                                    <div className="col-md-12">
                                        {error.status === "Success" &&
                                            <div className="alert alert-success" role="alert"  >
                                                {error.message}
                                            </div>
                                        }
                                        {error.status === "Failed" &&
                                            <div className="alert alert-danger" role="alert"  >
                                                {error.message}
                                            </div>
                                        }
                                    </div>
                                    <div className="col-md-12 p_0">
                                        <div className="bodylayout">
                                            <div className="container-fluid">
                                                <div className="row ">
                                                    <div className="col-md-12 topbodybar">
                                                        <h4> Orders</h4>
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
                                                                        <th>Order Number</th>
                                                                        <th>Customer Name</th>
                                                                        <th>Customer Phone</th>
                                                                        <th>City</th>
                                                                        <th>Order Price</th>
                                                                        <th>Order Status</th>
                                                                        <th>Date</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {orders?.map((data, index) => {
                                                                        const date = data?.createdAt;
                                                                        const myTime = moment(date).format('MMMM Do YYYY');
                                                                        return (
                                                                            <tr>
                                                                                <td>{data?.orderId}</td>
                                                                                <td>{data?.name}</td>
                                                                                <td>{data?.phone}</td>
                                                                                <td>{data?.city}</td>
                                                                                <td>PKR {data?.total}</td>
                                                                                <td>
                                                                                    {data?.orderStatus === "Pending" ?
                                                                                        <>
                                                                                            <button type="button" class="btn btn-warning">{data.orderStatus}</button>
                                                                                        </>
                                                                                        : data?.orderStatus === "Deliver" ?
                                                                                            <>
                                                                                                <button type="button" class="btn btn-primary">{data.orderStatus}</button>
                                                                                            </>
                                                                                            : data?.orderStatus === "Completed" ?
                                                                                                <>
                                                                                                    <button type="button" class="btn btn-success">{data.orderStatus}</button>
                                                                                                </>
                                                                                                :
                                                                                                <>
                                                                                                    <button type="button" class="btn btn-danger">{data.orderStatus}</button>
                                                                                                </>
                                                                                    }
                                                                                </td>
                                                                                <td>{myTime}</td>
                                                                                <td>
                                                                                    <button type="button" className="btn btn-success" onClick={() => { EditOrder(data) }} ><EditIcon /></button>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })}
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

            <Modal show={EditModel} onHide={CloseEditOrder}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-4">
                            <TextField type="text" label="Order ID" variant="outlined" value={singleData?.orderId} />
                        </div>
                        <div className="col-md-4">
                            <TextField type="text" label="Customer Name" variant="outlined" value={singleData?.name} />
                        </div>
                        <div className="col-md-4">
                            <TextField type="text" label="Customer Phone" variant="outlined" value={singleData?.phone} />
                        </div>
                        <div className="col-md-4">
                            <TextField type="text" label="Customer Email" variant="outlined" value={singleData?.email} />
                        </div>
                        <div className="col-md-4">
                            <TextField type="text" label="Country" variant="outlined" value={singleData?.country} />
                        </div>
                        <div className="col-md-4">
                            <TextField type="text" label="City" variant="outlined" value={singleData?.city} />
                        </div>
                        <div className="col-md-4">
                            <TextField type="text" label="Zipcode" variant="outlined" value={singleData?.zipcode} />
                        </div>
                        

                        <div className="col-md-4">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Product Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Order Status"
                                    name="Order Status"
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Deliver">Deliver</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                    <MenuItem value="Cancled">Cancled</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="col-md-4">
                            {loader === true &&
                                <Rings
                                    height="80"
                                    width="80"
                                    color="#33cc33"
                                    radius="6"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={loader}
                                    ariaLabel="rings-loading"
                                />
                            }
                            {loader === false &&

                                <Button type={"submit"} variant="primary" onClick={saveData}>
                                    Save Changes
                                </Button>
                            }
                        </div>

                        <div className="col-md-12">
                            <TextField type="text" label="Address" variant="outlined" value={singleData?.address} />
                        </div>
                        <div className="col-md-12">
                            <TextField type="text" label="Notes" variant="outlined" value={singleData?.notes} />
                        </div>

                        <div className="col-md-12">
                            <table className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr.No #</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Unit Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {singleData?.orderDetails?.map((d, index) => {
                                        return (
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td><img src={`${d?.Thumbnail}`} width={"60px"} /></td>
                                                <td>{d?.Name}</td>
                                                <td>{d?.Price}</td>
                                                <td>
                                                    <span style={{ padding: "10px 20px" }}>{d?.cartQuantity}</span>
                                                </td>
                                                <td>{d?.cartQuantity * d?.Price}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={5}><strong>Delivery Charges</strong></td>
                                        <td><strong>PKR {singleData?.charges}</strong></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}><strong>Total Price</strong></td>
                                        <td><strong>PKR {singleData?.total}</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseEditOrder}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
export default Orders;
