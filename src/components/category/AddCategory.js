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
        SizingAvailability: "No"
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
        if (CategoryName && CategorySlug && CategoryMK && CategoryMK && CategoryMD && CategoryStatus && categoryImg) {
            setLoader(true)
            const formData = new FormData();
            formData.append('CategoryImg', categoryImg);
            formData.append('CategoryName', formDatas.CategoryName);
            formData.append('CategorySlug', formDatas.CategorySlug);
            formData.append('CategoryMK', formDatas.CategoryMK);
            formData.append('CategoryMD', formDatas.CategoryMD);
            formData.append('CategoryStatus', formDatas.CategoryStatus);
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
    const [sizes, setSizes] = useState()
    const [Shirtsizes, setShirtSizes] = useState([
        {
            name: "FRONT LENGTH",
            sizes: {
                XS: "",
                S: "",
                M: "",
                L: "",
                XL: ""
            }
        },
        {
            name: "SHOULDER",
            sizes: {
                XS: "",
                S: "",
                M: "",
                L: "",
                XL: ""
            }
        },
        {
            name: "BUST",
            sizes: {
                XS: "",
                S: "",
                M: "",
                L: "",
                XL: ""
            }
        },
        {
            name: "SIDE VENT",
            sizes: {
                XS: "",
                S: "",
                M: "",
                L: "",
                XL: ""
            }
        },
        {
            name: "BOTTOM",
            sizes: {
                XS: "",
                S: "",
                M: "",
                L: "",
                XL: ""
            }
        },
        {
            name: "SLEEVE LENGTH",
            sizes: {
                XS: "",
                S: "",
                M: "",
                L: "",
                XL: ""
            }
        },
        {
            name: "CUFF OPENING",
            sizes: {
                XS: "",
                S: "",
                M: "",
                L: "",
                XL: ""
            }
        },
        {
            name: "ARM HOLE STRAIGHT",
            sizes: {
                XS: "",
                S: "",
                M: "",
                L: "",
                XL: ""
            }
        },
        {
            name: "NECK BANE",
            sizes: {
                XS: "",
                S: "",
                M: "",
                L: "",
                XL: ""
            }
        },
        {
            name: "FRONT DROP",
            sizes: {
                XS: "",
                S: "",
                M: "",
                L: "",
                XL: ""
            }
        },
        {
            name: "BACK DROP",
            sizes: {
                XS: "",
                S: "",
                M: "",
                L: "",
                XL: ""
            }
        }
    ])

    const inputHandlerShirt = (event, ItemName) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(value, ItemName, name)
        const updatedShirtSizes = [...Shirtsizes];
        const backDropIndex = updatedShirtSizes.findIndex(item => item.name === ItemName);
        if (backDropIndex !== -1) {
            updatedShirtSizes[backDropIndex].sizes[name] = value;
            // Update the state with the new array
            setShirtSizes(updatedShirtSizes);
        }
    }

    const deleteShirtSize = (name) => {
        const updatedShirtSizes = [...Shirtsizes];

        // Filter out the item with name "BACK DROP"
        const filteredShirtSizes = updatedShirtSizes.filter(item => item.name !== name);

        // Update the state with the filtered array
        setShirtSizes(filteredShirtSizes);
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
                                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formDatas.CategoryStatus}
                                            label="Age"
                                            name="CategoryStatus"
                                            onChange={handleChange}
                                            required
                                        >
                                            <MenuItem value="Active">Active</MenuItem>
                                            <MenuItem value="In-Active">In-Active</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="col-md-4">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Sizing Availability</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formDatas.SizingAvailability}
                                            label="Sizing Availability"
                                            name="SizingAvailability"
                                            onChange={handleChange}
                                            required
                                        >
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>


                                {formDatas.SizingAvailability === "Yes" &&
                                    <>
                                        <div className="col-md-3">
                                            <FormControl>
                                                <Form.Check
                                                    inline
                                                    label="Shirt Sizes"
                                                    name="group1"
                                                    type="checkbox"
                                                    id={`inline-checkbox-1`}
                                                />
                                            </FormControl>
                                        </div>

                                        <div className="col-md-3">
                                            <FormControl>
                                                <Form.Check
                                                    inline
                                                    label="Shirt Sizes"
                                                    name="group1"
                                                    type="checkbox"
                                                    id={`inline-checkbox-1`}
                                                />
                                            </FormControl>
                                        </div>

                                        <div className="col-md-12 mb-4">
                                            <Table striped bordered hover variant="dark">
                                                <thead>
                                                    <tr>
                                                        <th>Size(inches)</th>
                                                        <th>XS</th>
                                                        <th>S</th>
                                                        <th>M</th>
                                                        <th>L</th>
                                                        <th>XL</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Shirtsizes.map((data, index) => {
                                                        return (
                                                            <tr>
                                                                <td>{data.name}</td>
                                                                <td><input name="XS" type="number" onChange={(e) => { inputHandlerShirt(e, data.name) }} value={data.sizes.XS} style={{ width: "70px" }} /></td>
                                                                <td><input name="S" type="number" onChange={(e) => { inputHandlerShirt(e, data.name) }} value={data.sizes.S} style={{ width: "70px" }} /></td>
                                                                <td><input name="M" type="number" onChange={(e) => { inputHandlerShirt(e, data.name) }} value={data.sizes.M} style={{ width: "70px" }} /></td>
                                                                <td><input name="L" type="number" onChange={(e) => { inputHandlerShirt(e, data.name) }} value={data.sizes.L} style={{ width: "70px" }} /></td>
                                                                <td><input name="XL" type="number" onChange={(e) => { inputHandlerShirt(e, data.name) }} value={data.sizes.XL} style={{ width: "70px" }} /></td>
                                                                <td>
                                                                    <button type="button" className="btn btn-danger" onClick={() => deleteShirtSize(data.name)}><DeleteSweepIcon /></button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}

                                                </tbody>
                                            </Table>
                                        </div>
                                    </>
                                }



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
