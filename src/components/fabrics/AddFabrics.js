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
import { FabricAdd, url } from "../../controllers/WebController";
import { Rings } from 'react-loader-spinner'
import { useSelector, useDispatch } from 'react-redux';
import { addFabric } from '../../redux/fabricSlice'
import Table from 'react-bootstrap/Table';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Form from 'react-bootstrap/Form';


const AddFabrics = ({ closeModel, err }) => {
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
        FabricName: "",
        FabricSlug: "",
        FabricMK: "",
        FabricMD: "",
        FabricStatus: "Active",
        type:""

    });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(pre => ({ ...pre, [name]: value }));
    };
    const createSlug = () => {
        let FabricName = formDatas.FabricName;
        const stringWithoutSpaces = FabricName.replace(/\s+/g, '');
        const lowercaseString = stringWithoutSpaces.toLowerCase();
        console.log(formDatas.FabricName)
        setFormData(pre => ({ ...pre, "FabricSlug": lowercaseString }));
    }
    const [FabricImg, setFabricImg] = useState("")

    const saveData = async (e) => {
        e.preventDefault()
        // const data = {categoryImg,formDatas}
        const { FabricName, FabricSlug, FabricMK, FabricMD, FabricStatus } = formDatas
        if (FabricName && FabricSlug && FabricMK && FabricMK && FabricMD && FabricStatus &&  FabricImg) {
            setLoader(true)
            const formData = new FormData();
            formData.append('FabricImg', FabricImg);
            formData.append('FabricName', formDatas.FabricName);
            formData.append('FabricSlug', formDatas.FabricSlug);
            formData.append('FabricMK', formDatas.FabricMK);
            formData.append('FabricMD', formDatas.FabricMD);
            formData.append('FabricStatus', formDatas.FabricStatus);
            formData.append('tokken', localStorage.getItem("token"));
            const res = await FabricAdd(formData)
            if (res.status === "Success") {
                dispatch(addFabric(res.Fabric))
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
                    <Modal.Title>Add Fabric</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={saveData}>
                        <div className="container-fluid">
                            <div className="row">
                                {formError === true &&
                                    <div className="col-md-12">
                                        <div className="alert alert-danger" role="alert"  >
                                            {formDatas.FabricName === "" && <span className="formValidation"><strong>Fabric Name Field is Required</strong></span>}
                                            {formDatas.FabricSlug === "" && <span className="formValidation"><strong>Fabric Slug Field is Required</strong></span>}
                                            {formDatas.FabricMK === "" && <span className="formValidation"><strong>Fabric Meta Keyword Field is Required</strong></span>}
                                            {formDatas.FabricMD === "" && <span className="formValidation"><strong>Fabric Meta Desc Field is Required</strong></span>}
                                            {formDatas.FabricStatus === "" && <span className="formValidation"><strong>Fabric Status Field is Required</strong></span>}
                                            {FabricImg === "" && <span className="formValidation"><strong>Fabric Image Field is Required</strong></span>}
                                        </div>
                                    </div>
                                }
                                <div className="col-md-4">
                                    <TextField type="text" id="outlined-basic" onChange={handleChange} onBlur={createSlug} label="Fabric Name" name="FabricName" variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="text" id="outlined-basic" onChange={handleChange} label="Fabric Slug" value={formDatas?.FabricSlug} required name="FabricSlug" variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="text" id="outlined-basic" onChange={handleChange} label="Fabric Meta Keyword" required name="FabricMK" variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="text" id="outlined-basic" onChange={handleChange} label="Fabric Meta Desc" required name="FabricMD" variant="outlined" />
                                </div>

                                <div className="col-md-4">
                                    <Buttons variant="contained" component="label" >
                                        Upload Image
                                        <input hidden accept="image/*" required onChange={(e) => setFabricImg(e.target.files[0])} name="FabricImg" type="file" />
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

export default AddFabrics
