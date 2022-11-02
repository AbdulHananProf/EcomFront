import * as React from "react";
import TopBar from "../sidebarTopBar/TopBar";
import SideBarP from "../sidebarTopBar/SideBarP";
import AddIcon from '@mui/icons-material/Add';
import {useState, useEffect, useLayoutEffect} from "react";
import AddCategory from './AddCategory'
import EditCategory from './EditCategory'
import {Helmet} from "react-helmet";
import {GetAllCategory,url,DeleteCategory} from "../../controllers/WebController";
import { Rings } from  'react-loader-spinner'
import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useSelector, useDispatch } from 'react-redux';
import {selectCategories, setAllCategory, deleteCategoryStore} from '../../redux/categorySlice'


const Category = () => {
    const dispatch = useDispatch();
    const reduxCategoriesList = useSelector(selectCategories)
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
        const res =  await GetAllCategory();
        dispatch(setAllCategory(res.categories))
        setLoader(false)
    }
    const deleteCategory = async (id) =>{
        const res =  await DeleteCategory(id);
        console.log(res)
        if(res.status === "Success"){
            dispatch(deleteCategoryStore(id))
        }

    }
    const list = [...reduxCategoriesList].reverse().map((category,index)  => {
        const date = category.createdAt;
        // //const formattedDate = format(date, "MMMM do, yyyy H:mma");
        const myTime = moment(date).format('MMMM Do YYYY');
        return(
            <tr key={index + 1}>
                <td>{index + 1}</td>
                <td><img src={url + "/uploads/categories/" + category.CategoryImg} style={{width:"50px",height:"50px"}}/></td>
                <td className="textP">{category.CategoryName}</td>
                <td className="textP">{category.CategorySlug}</td>
                <td className="textP">{myTime}</td>
                {category.CategoryStatus === "Active" &&
                <td className="textP" style={{backgroundColor:"#00ba008f",color:"white"}}>
                    <strong>{category.CategoryStatus}</strong>
                </td>
                }
                {category.CategoryStatus === "In-Active" &&
                <td className="textP" style={{backgroundColor:"rgb(241 54 54 / 66%)",color:"white"}}>
                    <strong>{category.CategoryStatus}</strong>
                </td>
                }
                <td>
                    <button type="button" className="btn btn-success"  onClick={()=> showEditModel(category._id)}><EditIcon/></button>
                    &nbsp;
                    <button type="button" className="btn btn-danger"  onClick={()=> deleteCategory(category._id)}><DeleteSweepIcon/></button>
                </td>
            </tr>
        )
    })
    return (
        <>
            <Helmet>
                <title>Category | Portal</title>
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
                                                        <h4>Category</h4>
                                                        <button type="button" className="btn btn-primary"  onClick={()=> showAddModel()}> <AddIcon fontSize={"small"}/>  Category</button>
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
                                                                    <th>Category Image</th>
                                                                    <th>Category Name</th>
                                                                    <th>Category Slug</th>
                                                                    <th>Created Date</th>
                                                                    <th>Category Status</th>
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

                {openAddCategoryModel && <AddCategory closeModel={setOpenAddCategoryModel}  err={setError} />}
                {openEditCategoryModel && <EditCategory closeModel={setOpenEditCategoryModel}  err={setError} id={categoryId}/>}


            </div>
        </>
    );
}

export default Category
