import * as React from "react";
import TopBar from "../sidebarTopBar/TopBar";
import SideBarP from "../sidebarTopBar/SideBarP";
import AddIcon from '@mui/icons-material/Add';
import {useState, useEffect, useLayoutEffect} from "react";
import AddFabrics from './AddFabrics'
import EditFabrics from './EditFabrics'
import {Helmet} from "react-helmet";
import {GetAllFabric,url,DeleteCategory} from "../../controllers/WebController";
import { Rings } from  'react-loader-spinner'
import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useSelector, useDispatch } from 'react-redux';
import {selectFabrics, setAllFabrics, deleteFabricStore} from '../../redux/fabricSlice'


const Fabric = () => {
    const dispatch = useDispatch();
    const reduxFabricsList = useSelector(selectFabrics)
    const [loader, setLoader] = useState(false);
    const [openAddCategoryModel ,setOpenAddCategoryModel] = useState(false)
    const [openEditCategoryModel ,setOpenEditCategoryModel] = useState(false)
    const [categoryId, setCategoryId] =useState('')

    useLayoutEffect(()=>{
        setLoader(true)
    },[])
    useEffect(()=>{
        GetAllCategoryList()
    },[])


    const showAddModel = () =>{
        setOpenAddCategoryModel(true)

    }
    const showEditModel = (id) =>{
        setCategoryId(id)
        setOpenEditCategoryModel(true)
    }
    const [error,setError] = useState({
        message:"",
        stauts:""
    });


    const GetAllCategoryList = async () =>{
        const res =  await GetAllFabric();
        dispatch(setAllFabrics(res.fabric))
        setLoader(false)
    }
    const deleteCategory = async (id) =>{
        const res =  await DeleteCategory(id);
        console.log(res)
        if(res.status === "Success"){
            dispatch(deleteFabricStore(id))
        }

    }
    const list = [...reduxFabricsList].reverse().map((fabric,index)  => {
        const date = fabric.createdAt;
        // //const formattedDate = format(date, "MMMM do, yyyy H:mma");
        const myTime = moment(date).format('MMMM Do YYYY');
        return(
            <tr key={index + 1}>
                <td>{index + 1}</td>
                <td><img src={url + "uploads/fabric/" + fabric.FabricImg} style={{width:"50px",height:"50px"}}/></td>
                <td className="textP">{fabric.FabricName}</td>
                <td className="textP">{fabric.FabricSlug}</td>
                <td className="textP">{myTime}</td>
                {fabric.FabricStatus === "Active" &&
                <td className="textP" style={{backgroundColor:"#00ba008f",color:"white"}}>
                    <strong>{fabric.FabricStatus}</strong>
                </td>
                }
                {fabric.FabricStatus === "In-Active" &&
                <td className="textP" style={{backgroundColor:"rgb(241 54 54 / 66%)",color:"white"}}>
                    <strong>{fabric.FabricStatus}</strong>
                </td>
                }
                <td>
                    <button type="button" className="btn btn-success"  onClick={()=> showEditModel(fabric._id)}><EditIcon/></button>
                    &nbsp;
                    <button type="button" className="btn btn-danger"  onClick={()=> deleteCategory(fabric._id)}><DeleteSweepIcon/></button>
                </td>
            </tr>
        )
    })
    return (
        <>
            <Helmet>
                <title>Fabric | Portal</title>
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
                                                        <h4>Fabric</h4>
                                                        <button type="button" className="btn btn-primary"  onClick={()=> showAddModel()}> <AddIcon fontSize={"small"}/>  Fabric</button>
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
                                                                    <th>Fabric Image</th>
                                                                    <th>Fabric Name</th>
                                                                    <th>Fabric Slug</th>
                                                                    <th>Fabric Date</th>
                                                                    <th>Fabric Status</th>
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

                {openAddCategoryModel && <AddFabrics closeModel={setOpenAddCategoryModel}  err={setError} />}
                {openEditCategoryModel && <EditFabrics closeModel={setOpenEditCategoryModel}  err={setError} id={categoryId}/>}


            </div>
        </>
    );
}

export default Fabric
