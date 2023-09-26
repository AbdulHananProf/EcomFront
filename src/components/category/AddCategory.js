import * as React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Buttons from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { CategoryAdd, url } from "../../controllers/WebController";
import { Rings } from 'react-loader-spinner'
import { useSelector, useDispatch } from 'react-redux';
import { addCategory } from '../../redux/categorySlice'
import Table from 'react-bootstrap/Table';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Form from 'react-bootstrap/Form';


const AddCategory = ({ closeModel, err }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    const [loader, setLoader] = useState(false);
    const [formError, setFormError] = useState(false);

    const handleClose = () => {
        closeModel(false)
        setShow(false)
        setLoader(false)
    };


    const [formDatas, setFormData] = useState({
        CategoryName: "",
        CategorySlug: "",
        CategoryMK: "",
        CategoryMD: "",
        CategoryStatus: "Active",
        type:""

    });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(pre => ({ ...pre, [name]: value }));
    };
    const createSlug = () => {
        let CategoryName = formDatas.CategoryName;
        const stringWithoutSpaces = CategoryName.replace(/\s+/g, '');
        const lowercaseString = stringWithoutSpaces.toLowerCase();
        console.log(formDatas.CategoryName)
        setFormData(pre => ({ ...pre, "CategorySlug": lowercaseString }));
    }
    const [categoryImg, setCategoryImg] = useState("")

    const saveData = async (e) => {
        e.preventDefault()
        // const data = {categoryImg,formDatas}
        const { CategoryName, CategorySlug, CategoryMK, CategoryMD, CategoryStatus } = formDatas
        if (CategoryName && CategorySlug && CategoryMK && CategoryMK && CategoryMD && CategoryStatus) {
            setLoader(true)
            const formData = new FormData();
            formData.append('CategoryImg', categoryImg);
            formData.append('CategoryName', formDatas.CategoryName);
            formData.append('CategorySlug', formDatas.CategorySlug);
            formData.append('CategoryMK', formDatas.CategoryMK);
            formData.append('CategoryMD', formDatas.CategoryMD);
            formData.append('CategoryStatus', formDatas.CategoryStatus);
            formData.append('type', formDatas.type);
            formData.append('tokken', localStorage.getItem("token"));
            const res = await CategoryAdd(formData)
            if (res.status === "Success") {
                dispatch(addCategory(res.category))
                err(prevState => ({ ...prevState, message: res.message }))
                err(prevState => ({ ...prevState, status: res.status }))
                handleClose()
            } else {
                handleClose()
                err(prevState => ({ ...prevState, message: res.message }))
                err(prevState => ({ ...prevState, status: res.status }))
            }
        } else {
            setFormError(true)
        }

    }
   

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={saveData}>
                        <div className="container-fluid">
                            <div className="row">
                                {formError === true &&
                                    <div className="col-md-12">
                                        <div className="alert alert-danger" role="alert"  >
                                            {formDatas.CategoryName === "" && <span className="formValidation"><strong>Category Name Field is Required</strong></span>}
                                            {formDatas.CategorySlug === "" && <span className="formValidation"><strong>Category Slug Field is Required</strong></span>}
                                            {formDatas.CategoryMK === "" && <span className="formValidation"><strong>Category Meta Keyword Field is Required</strong></span>}
                                            {formDatas.CategoryMD === "" && <span className="formValidation"><strong>Category Meta Desc Field is Required</strong></span>}
                                            {formDatas.CategoryStatus === "" && <span className="formValidation"><strong>Category Status Field is Required</strong></span>}
                                            {categoryImg === "" && <span className="formValidation"><strong>Category Image Field is Required</strong></span>}
                                        </div>
                                    </div>
                                }
                                <div className="col-md-4">
                                    <TextField type="text" id="outlined-basic" onChange={handleChange} onBlur={createSlug} label="Category Name" name="CategoryName" variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="text" id="outlined-basic" onChange={handleChange} label="Category Slug" value={formDatas?.CategorySlug} required name="CategorySlug" variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="text" id="outlined-basic" onChange={handleChange} label="Category Meta Keyword" required name="CategoryMK" variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="text" id="outlined-basic" onChange={handleChange} label="Category Meta Desc" required name="CategoryMD" variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Stiched/Unstiched</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            value={formDatas.type}
                                            label="Stiched/Unstiched"
                                            name="type"
                                            onChange={handleChange}
                                            required
                                        >
                                            <MenuItem value="">Select</MenuItem>
                                            <MenuItem value="Stiched">Stiched</MenuItem>
                                            <MenuItem value="Unstiched">Unstiched</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="col-md-4">
                                    <Buttons variant="contained" component="label" >
                                        Upload Image
                                        <input hidden accept="image/*" required onChange={(e) => setCategoryImg(e.target.files[0])} name="CategoryImg" type="file" />
                                    </Buttons>
                                </div>
                                <div className="col-md-12" id="three-circles-wrapper" style={{ textAlign: "center", marginTop: "30px" }}>
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
                            </div>
                        </div>
                    </form>
                </Modal.Body>


            </Modal>
        </>
    );
}

export default AddCategory
