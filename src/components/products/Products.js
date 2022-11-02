import * as React from "react";
import TopBar from "../sidebarTopBar/TopBar";
import SideBarP from "../sidebarTopBar/SideBarP";
import AddIcon from '@mui/icons-material/Add';
import {useState, useEffect, useLayoutEffect} from "react";
import AddProduct from '../products/AddProduct'
import EditCategory from '../category/EditCategory'
import {Helmet} from "react-helmet";
import {url,GetAllProducts} from "../../controllers/WebController";
import { Rings } from  'react-loader-spinner'
import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useSelector, useDispatch } from 'react-redux';
import {selectProducts,setAllProducts} from "../../redux/productSlice";


const Products = () => {
    const dispatch = useDispatch();
    const reduxProductsList = useSelector(selectProducts)
    const [loader, setLoader] = useState(false);
    const [openAddModel ,setOpenAddModel] = useState(false)
    const [openEditCategoryModel ,setOpenEditCategoryModel] = useState(false)
    const [categoryId, setCategoryId] =useState('')

    useLayoutEffect(()=>{
        setLoader(true)
    },[])
    useEffect(()=>{
        GetAllProductList()
    },[])

    const showAddModel = () =>{
        setOpenAddModel(true)

    }
    const showEditModel = (id) =>{
        setCategoryId(id)
        setOpenEditCategoryModel(true)
    }
    const [error,setError] = useState({
        message:"",
        stauts:""
    });


    const GetAllProductList = async () =>{
        const res =  await GetAllProducts();
        dispatch(setAllProducts(res.products))
        setLoader(false)
    }
    // const deleteCategory = async (id) =>{
    //     const res =  await DeleteCategory(id);
    //     console.log(res)
    //     if(res.status === "Success"){
    //         dispatch(deleteCategoryStore(id))
    //     }
    //
    // }
    const list = [...reduxProductsList].reverse().map((product,index)  => {
        const date = product.createdAt;
        // //const formattedDate = format(date, "MMMM do, yyyy H:mma");
        const myTime = moment(date).format('MMMM Do YYYY');
        return(
            <tr key={index + 1}>
                <td>{index + 1}</td>
                <td><img src={url + "/uploads/categories/" + product.ProductThumbnail} style={{width:"50px",height:"50px"}}/></td>
                <td className="textP">{product.ProductName}</td>
                <td className="textP">{product.ProductCategory}</td>
                <td className="textP">{product.ProductSlug}</td>
                <td className="textP">{myTime}</td>
                {product.ProductStatus === "Active" &&
                <td className="textP" style={{backgroundColor:"#00ba008f",color:"white"}}>
                    <strong>{product.ProductStatus}</strong>
                </td>
                }
                {product.ProductStatus === "In-Active" &&
                <td className="textP" style={{backgroundColor:"rgb(241 54 54 / 66%)",color:"white"}}>
                    <strong>{product.ProductStatus}</strong>
                </td>
                }
                <td>
                    <button type="button" className="btn btn-success" ><EditIcon/></button>
                    &nbsp;
                    <button type="button" className="btn btn-danger"  ><DeleteSweepIcon/></button>
                </td>
            </tr>
        )
    })
    return (
        <>
            <Helmet>
                <title>Products | Portal</title>
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
                                                        <h4> Products</h4>
                                                        <button type="button" className="btn btn-primary"  onClick={()=> showAddModel()}> <AddIcon fontSize={"small"}/>  Product</button>
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

                                                                {loader === true  &&
                                                                    <tr  id="three-circles-wrapper" style={{textAlign:"center",marginTop:"30px",width:"100%"}}>
                                                                        <td colSpan={8}>
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

                {openAddModel && <AddProduct closeModel={setOpenAddModel}  err={setError} />}
                {/*{openEditCategoryModel && <EditCategory closeModel={setOpenEditCategoryModel}  err={setError} id={categoryId}/>}*/}


            </div>
        </>
    );
}

export default Products
