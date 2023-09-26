import * as React from "react";
import TopBar from "../sidebarTopBar/TopBar";
import SideBarP from "../sidebarTopBar/SideBarP";
import AddIcon from '@mui/icons-material/Add';
import {useState, useEffect, useLayoutEffect} from "react";
import {Helmet} from "react-helmet";
import {GetAllSizes,url,DeleteCategory} from "../../controllers/WebController";
import { Rings } from  'react-loader-spinner'
import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AddSize from "./AddSize";
import EditSize from "./EditSize";

const Sizes = () => {
    const [loader, setLoader] = useState(false);
    const [error,setError] = useState({
        message:"",
        stauts:""
    });
    const [sizeList,setSizeList] = useState([])
    const [singleData,setSingleData] = useState()
    const [openAddModel ,setOpenAddModel] = useState(false)
    const [openEditModel ,setOpenEditModel] = useState(false)
    const showAddModel = () =>{
        setOpenAddModel(true)
    }
    useEffect(()=>{
        GetAllSizeList()
    },[error])
    const GetAllSizeList = async () =>{
        const res =  await GetAllSizes();
        setSizeList(res.size)
        setLoader(false)
    }

    const showEditModel = (data) =>{
        setSingleData(data)
        setOpenEditModel(true)
    }
    const deleteSize = (id) =>{

    }
    const list = sizeList?.map((data,index)=>{
        return(
            <tr>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>
                <button type="button" className="btn btn-success"  onClick={()=> showEditModel(data)}><EditIcon/></button>
                    &nbsp;
                    <button type="button" className="btn btn-danger"  onClick={()=> deleteSize(data._id)}><DeleteSweepIcon/></button>
                </td>
            </tr>
        )
    })
    return(
        <>
            <Helmet>
                <title>Size | Portal</title>
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
                                        { error.status === "Success"  &&
                                                <div className="alert alert-success" role="alert"  >
                                                    {error.message}
                                                </div>
                                        }
                                        { error.status === "Failed"  &&
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
                                                        <h4>Manage Sizes</h4>
                                                        <button type="button" className="btn btn-primary"  onClick={()=> showAddModel()}> <AddIcon fontSize={"small"}/>  Size</button>
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
                                                                    <th>Name</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>

                                                                {loader === true  &&
                                                                <tr  id="three-circles-wrapper" style={{textAlign:"center",marginTop:"30px",width:"100%"}}>
                                                                    <td colSpan={7}>
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
                                                                    </td>
                                                                </tr>
                                                                }
                                                                {list}
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
                {openAddModel && <AddSize closeModel={setOpenAddModel}  err={setError} />}
                {openEditModel && <EditSize closeModel={setOpenEditModel}  err={setError} data={singleData}/>}
            </div>
        </>
    )
}

export default Sizes;