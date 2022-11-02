import * as React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Buttons from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {EditCategoryByID, CategoryEdit, url} from "../../controllers/WebController";
import { Rings } from  'react-loader-spinner'
import ContentLoader from 'react-content-loader'
import {selectCategories,editCategory} from '../../redux/categorySlice'
import {useDispatch, useSelector} from "react-redux";


const EditCategory = ({closeModel,err,id}) => {
    const reduxCategoriesList = useSelector(selectCategories);
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    const [loader, setLoader] = useState(false);
    const [floader, setfloader] = useState(true);
    const [formError, setFormError] = useState(false);
    const [categoryData, setCategoryData] = useState({
        CategoryName:"",
        CategorySlug:"",
        CategoryMK:"",
        CategoryMD:"",
        CategoryStatus:"Active",
    })

    useEffect(()=>{
        getCategoryData()
    },[]);


    const handleClose = () => {
        closeModel(false)
        setShow(false)
        setLoader(false)
    };

    const getCategoryData = async () => {
        // const res =  await EditCategoryByID(id);
        // console.log(res)
        let singleCategory = reduxCategoriesList.filter(el => {
            return el._id === id;
        });
        if(singleCategory[0]){
            setfloader(false)
            setCategoryData(singleCategory[0])
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCategoryData( pre =>({...pre, [name]:value}));
    };
    const [categoryImg, setCategoryImg] = useState()

    const saveData = async (e) => {
        e.preventDefault()
        // const data = {categoryImg,formDatas}
        const{CategoryName,CategorySlug,CategoryMK,CategoryMD,CategoryStatus} = categoryData
        if(CategoryName && CategorySlug && CategoryMK && CategoryMK && CategoryMD && CategoryStatus){
            setLoader(true)
            const formData = new FormData();
            formData.append('id', categoryData._id);
            formData.append('CategoryImg', categoryImg);
            formData.append('CategoryName', categoryData.CategoryName);
            formData.append('CategorySlug', categoryData.CategorySlug);
            formData.append('CategoryMK', categoryData.CategoryMK);
            formData.append('CategoryMD', categoryData.CategoryMD );
            formData.append('CategoryStatus', categoryData.CategoryStatus  );
            formData.append('tokken', localStorage.getItem("token")  );
            const res =  await CategoryEdit(formData)


            if(res.status === "Success"){
                console.log(res.latestEditCategory)
                dispatch(editCategory(res.latestEditCategory));
                handleClose()
                err(prevState => ({...prevState , message:res.message}))
                err(prevState => ({...prevState , status:res.status}))
            }else{
                handleClose()
                err(prevState => ({...prevState , message:res.message}))
                err(prevState => ({...prevState , status:res.status}))
            }

        }else{
            setFormError(true)
        }

    }
    // console.log(categoryData)


    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {floader === true &&
                    <ContentLoader
                        width={700}
                        height={300}
                        viewBox="0 0 700 300"
                        backgroundColor="#f5f5f5"
                        foregroundColor="#dbdbdb"
                    >
                        <rect x="4" y="8" rx="3" ry="3" width="7" height="288" />
                        <rect x="6" y="289" rx="3" ry="3" width="669" height="8" />
                        <rect x="670" y="9" rx="3" ry="3" width="6" height="285" />
                        <rect x="55" y="42" rx="16" ry="16" width="274" height="216" />
                        <rect x="412" y="113" rx="3" ry="3" width="102" height="7" />
                        <rect x="402" y="91" rx="3" ry="3" width="178" height="6" />
                        <rect x="405" y="139" rx="3" ry="3" width="178" height="6" />
                        <rect x="416" y="162" rx="3" ry="3" width="102" height="7" />
                        <rect x="405" y="189" rx="3" ry="3" width="178" height="6" />
                        <rect x="5" y="8" rx="3" ry="3" width="669" height="7" />
                        <rect x="406" y="223" rx="14" ry="14" width="72" height="32" />
                        <rect x="505" y="224" rx="14" ry="14" width="72" height="32" />
                        <rect x="376" y="41" rx="3" ry="3" width="231" height="29" />
                    </ContentLoader>
                    }
                    {floader === false &&
                    <form onSubmit={saveData}>
                        <div className="container-fluid">
                            <div className="row">
                                { formError === true  &&
                                <div className="col-md-12">
                                    <div className="alert alert-danger" role="alert"  >
                                        {categoryData.CategoryName === "" && <span className="formValidation"><strong>Category Name Field is Required</strong></span>}
                                        {categoryData.CategorySlug === "" && <span className="formValidation"><strong>Category Slug Field is Required</strong></span>}
                                        {categoryData.CategoryMK === "" && <span className="formValidation"><strong>Category Meta Keyword Field is Required</strong></span>}
                                        {categoryData.CategoryMD === "" && <span className="formValidation"><strong>Category Meta Desc Field is Required</strong></span>}
                                        {categoryData.CategoryStatus === "" && <span className="formValidation"><strong>Category Status Field is Required</strong></span>}
                                        {categoryImg === "" && <span className="formValidation"><strong>Category Image Field is Required</strong></span>}
                                    </div>
                                </div>
                                }
                                <div className="col-md-4">
                                    <TextField id="outlined-basic" onChange={handleChange} required label="Category Name" name="CategoryName" variant="outlined" value={categoryData.CategoryName} />
                                </div>
                                <div className="col-md-4">
                                    <TextField id="outlined-basic" onChange={handleChange} required label="Category Slug" name="CategorySlug" variant="outlined" value={categoryData.CategorySlug} />
                                </div>
                                <div className="col-md-4">
                                    <TextField id="outlined-basic" onChange={handleChange} required label="Category Meta Keyword" name="CategoryMK" variant="outlined" value={categoryData.CategoryMK} />
                                </div>
                                <div className="col-md-4">
                                    <TextField id="outlined-basic" onChange={handleChange} required label="Category Meta Desc"  name="CategoryMD"  variant="outlined" value={categoryData.CategoryMD} />
                                </div>

                                <div className="col-md-4">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={categoryData.CategoryStatus}
                                            label="Status"
                                            name="CategoryStatus"
                                            onChange={handleChange}
                                            required
                                        >
                                            <MenuItem value={"Active"}>Active</MenuItem>
                                            <MenuItem value={"In-Active"}>In-Active</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>



                                <div className="col-md-4">
                                    <Buttons variant="contained" component="label" >
                                        Upload Image
                                        <input hidden accept="image/*" onChange={(e) => setCategoryImg(e.target.files[0])} name="CategoryImg"  type="file" />
                                    </Buttons>
                                </div>
                                <div className="col-md-12" id="three-circles-wrapper" style={{textAlign:"center",marginTop:"30px"}}>
                                    {loader === true  &&
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
                                    {loader === false  &&

                                    <Button variant="primary" onClick={saveData}>
                                        Save Changes
                                    </Button>
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                    }

                </Modal.Body>


            </Modal>
        </>
    );
}

export default EditCategory
