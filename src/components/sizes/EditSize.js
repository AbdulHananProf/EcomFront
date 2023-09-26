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
import { CategoryAdd, url, SizeUpdate } from "../../controllers/WebController";
import { Rings } from 'react-loader-spinner'
import { useSelector, useDispatch } from 'react-redux';
import { addCategory } from '../../redux/categorySlice'
import Table from 'react-bootstrap/Table';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Form from 'react-bootstrap/Form';


const EditSize = ({ closeModel, err, data }) => {
    const [show, setShow] = useState(true);
    const [loader, setLoader] = useState(false);
    const [formError, setFormError] = useState(false);

    const handleClose = () => {
        closeModel(false)
        setShow(false)
        setLoader(false)
    };


    const [formDatas, setFormData] = useState({
        Name: data?.name,

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


    const [Shirtsizes, setShirtSizes] = useState(data?.Sizes)

    const inputHandlerShirt = (event, srNo) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(value, srNo, name)
        const updatedShirtSizes = [...Shirtsizes];
        const backDropIndex = updatedShirtSizes.findIndex(item => item.srNo === srNo);
        if (backDropIndex !== -1) {
            updatedShirtSizes[backDropIndex].sizes[name] = Number(value);
            // Update the state with the new array
            setShirtSizes(updatedShirtSizes);
        }
    }
    const inputHandlerShirtName = (event, srNo) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(value, srNo, name)
        const updatedShirtSizes = [...Shirtsizes];
        const backDropIndex = updatedShirtSizes.findIndex(item => item.srNo === srNo);
        if (backDropIndex !== -1) {
            updatedShirtSizes[backDropIndex].name = value;
            // Update the state with the new array
            setShirtSizes(updatedShirtSizes);
        }
    }

    const deleteShirtSize = (srNo) => {
        const updatedShirtSizes = [...Shirtsizes];

        // Filter out the item with name "BACK DROP"
        const filteredShirtSizes = updatedShirtSizes.filter(item => item.srNo !== srNo);

        // Update the state with the filtered array
        setShirtSizes(filteredShirtSizes);
    }

    const [currentSrNo, setCurrentSrNo] = useState(Shirtsizes.length + 1);
    const addItem = () => {
        const newItem = {
          srNo: currentSrNo,
          name: "",
          sizes: {
            XS: "",
            S: "",
            M: "",
            L: "",
            XL: ""
          }
        };
    
        // Increment the currentSrNo for the next item
        setCurrentSrNo(currentSrNo + 1);
    
        // Use the spread operator to create a new array with the new item
        setShirtSizes([...Shirtsizes, newItem]);
      };

      const saveData = async (e) => {
        e.preventDefault()
        // const data = {categoryImg,formDatas}
        const { Name } = formDatas
        if (Name && Shirtsizes.length !==0 ) {
            setLoader(true)
            let formData = {
                id:data?._id,
                name: formDatas.Name,
                Sizes: Shirtsizes,
                tokken: localStorage.getItem("token")
            }
            console.log(formData)
            const res = await SizeUpdate(formData)
            if (res.status === "Success") {
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
            <Modal show={show} onHide={handleClose} animation={false} className="model800">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Size</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={saveData}>
                        <div className="container-fluid">
                            <div className="row">
                                {formError === true &&
                                    <div className="col-md-12">
                                        <div className="alert alert-danger" role="alert"  >
                                            {formDatas.Name === "" && <span className="formValidation"><strong> Name Field is Required</strong></span>}
                                            {Shirtsizes.length === 0 && <span className="formValidation"><strong>Add Ateast One Size</strong></span>}
                                        </div>
                                    </div>
                                }
                                <div className="col-md-4">
                                    <TextField type="text" id="outlined-basic" onChange={handleChange} onBlur={createSlug} label="Name" value={formDatas.Name} name="Name" variant="outlined" placeholder="Shirt ,Trouser, Shalwar " />
                                </div>

                                <div className="col-md-4">
                                    <button type="button" className="btn btn-primary" onClick={addItem} >Add Line</button>
                                </div>

                                <div className="col-md-12 mb-4">
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>SR.NO</th>
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
                                                        <td>{index + 1}</td>
                                                        <td><input name="name" type="text" onChange={(e) => { inputHandlerShirtName(e, data.srNo) }} value={data.name} style={{ width: "140px" }} /></td>
                                                        <td><input name="XS" type="number" onChange={(e) => { inputHandlerShirt(e, data.srNo) }} value={data.sizes.XS} style={{ width: "70px" }} /></td>
                                                        <td><input name="S" type="number" onChange={(e) => { inputHandlerShirt(e, data.srNo) }} value={data.sizes.S} style={{ width: "70px" }} /></td>
                                                        <td><input name="M" type="number" onChange={(e) => { inputHandlerShirt(e, data.srNo) }} value={data.sizes.M} style={{ width: "70px" }} /></td>
                                                        <td><input name="L" type="number" onChange={(e) => { inputHandlerShirt(e, data.srNo) }} value={data.sizes.L} style={{ width: "70px" }} /></td>
                                                        <td><input name="XL" type="number" onChange={(e) => { inputHandlerShirt(e, data.srNo) }} value={data.sizes.XL} style={{ width: "70px" }} /></td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger" onClick={() => deleteShirtSize(data.srNo)}><DeleteSweepIcon /></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
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

export default EditSize
