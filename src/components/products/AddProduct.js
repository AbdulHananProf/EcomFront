import * as React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState, useEffect} from "react";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Buttons from '@mui/material/Button';
import { Rings } from  'react-loader-spinner'
import { useSelector, useDispatch } from 'react-redux';
import {addProduct} from '../../redux/productSlice';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {GetAllCategory, ProductAdd} from "../../controllers/WebController";

const AddProduct = ({closeModel,err}) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    const [loader, setLoader] = useState(false);
    const [formError, setFormError] = useState(false);
    const [PCategory,setPCategory] = useState([])
    const handleClose = () => {
        closeModel(false)
        setShow(false)
        setLoader(false)
    };

    useEffect(() => {
        getProductCategory()
    }, []);

    const getProductCategory = async () => {
        const res =  await GetAllCategory()
        setPCategory(res.categories)
    }

    const [formDatas, setFormData] = useState({
        ProductName:"",
        ProductCategory:"",
        ProductSlug:"",
        ProductMK:"",
        ProductMD:"",
        ProductPrice:"",
        ProductWeight:"",
        ProductQuantity:"",
        ProductDescription:"",
        ProductStatus:"Active",
        ProductShowOnHome:"No"
    });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData( pre =>({...pre, [name]:value}));
    };
    const [ProductThumbnail, setProductThumbnail] = useState("")
    const [ProductImage1, setProductImage1] = useState("")
    const [ProductImage2, setProductImage2] = useState("")
    const [ProductImage3, setProductImage3] = useState("")
    const [ProductImage4, setProductImage4] = useState("")

    const saveData = async (e) => {
        e.preventDefault()
        const{ProductName, ProductCategory, ProductSlug, ProductMK, ProductMD, ProductPrice, ProductWeight, ProductQuantity, ProductDescription, ProductStatus, ProductShowOnHome} = formDatas
        if(ProductName && ProductCategory && ProductSlug && ProductMK && ProductMD && ProductPrice
             && ProductDescription && ProductStatus && ProductThumbnail && ProductImage2 && ProductImage3 && ProductImage4 ){
            setLoader(true)
            const formData = new FormData();
            formData.append('ProductThumbnail', ProductThumbnail);
            formData.append('ProductImage1', ProductImage1);
            formData.append('ProductImage2', ProductImage2);
            formData.append('ProductImage3', ProductImage3);
            formData.append('ProductImage4', ProductImage4);
            formData.append('ProductName', ProductName);
            formData.append('ProductCategory', ProductCategory);
            formData.append('ProductSlug', ProductSlug);
            formData.append('ProductMK', ProductMK);
            formData.append('ProductMD', ProductMD);
            formData.append('ProductPrice', ProductPrice);
            formData.append('ProductWeight', ProductWeight);
            formData.append('ProductQuantity', ProductQuantity);
            formData.append('ProductDescription', ProductDescription);
            formData.append('ProductStatus', ProductStatus);
            formData.append('ProductShowOnHome', ProductShowOnHome);
            const res =  await ProductAdd(formData)
            if(res.status === "Success"){
                dispatch(addProduct(res.product))
                err(prevState => ({...prevState , message:res.message}))
                err(prevState => ({...prevState , status:res.status}))
                handleClose()
            }else{
                handleClose()
                err(prevState => ({...prevState , message:res.message}))
                err(prevState => ({...prevState , status:res.status}))
            }
        }else{
            setFormError(true)
        }

    }
    const productDes = (data) => {
         setFormData( pre =>({...pre, ProductDescription:data}));
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={saveData}>
                        <div className="container-fluid">
                            <div className="row">
                                { formError === true  &&
                                <div className="col-md-12">
                                    <div className="alert alert-danger" role="alert"  >
                                        {formDatas.ProductName === "" && <span className="formValidation"><strong>Product Name Field is Required</strong></span>}
                                        {formDatas.ProductCategory === "" && <span className="formValidation"><strong>Product Category Field is Required</strong></span>}
                                        {formDatas.ProductSlug === "" && <span className="formValidation"><strong>Product Slug Field is Required</strong></span>}
                                        {formDatas.ProductMK === "" && <span className="formValidation"><strong>Product Meta Keyword Field is Required</strong></span>}
                                        {formDatas.ProductMD === "" && <span className="formValidation"><strong>Product Meta Desc Field is Required</strong></span>}
                                        {formDatas.ProductPrice === "" && <span className="formValidation"><strong>Product Price Field is Required</strong></span>}
                                        {formDatas.ProductDescription === "" && <span className="formValidation"><strong>Product Description Field is Required</strong></span>}
                                        {formDatas.ProductStatus === "" && <span className="formValidation"><strong>Product Status Field is Required</strong></span>}
                                        {formDatas.ProductShowOnHome === "" && <span className="formValidation"><strong>Product Show on Home Field is Required</strong></span>}
                                        {ProductThumbnail === "" && <span className="formValidation"><strong>Product Thumbnail Image is Required</strong></span>}
                                        {ProductImage1 === "" && <span className="formValidation"><strong>Product Image 1 Image is Required</strong></span>}
                                        {ProductImage2 === "" && <span className="formValidation"><strong>Product Image 2 Image is Required</strong></span>}
                                        {ProductImage3 === "" && <span className="formValidation"><strong>Product Image 3 Image is Required</strong></span>}
                                        {ProductImage4 === "" && <span className="formValidation"><strong>Product Image 4 Image is Required</strong></span>}
                                    </div>
                                </div>
                                }
                                <div className="col-md-4">
                                    <TextField  type="text" onChange={handleChange}  label="Product Name" name="ProductName" variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formDatas.ProductCategory}
                                            label="Product category"
                                            name="ProductCategory"
                                            onChange={handleChange}
                                            required
                                        >
                                            {
                                                PCategory.map((category,index) =>{
                                                    return(
                                                        <MenuItem value={category._id}>{category.CategoryName}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-md-4">
                                    <TextField type="text"  onChange={handleChange} label="Product Slug" placeholder="product-name-12-abc" required name="ProductSlug" variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="text" onChange={handleChange} label="Product Meta Keyword" required name="ProductMK" variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="text"  onChange={handleChange} label="Product Meta Desc" required name="ProductMD"  variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="text"  onChange={handleChange} label="Product Price" required name="ProductPrice"  variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="text"  onChange={handleChange} label="Product Weight" required name="ProductWeight"  variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="text"  onChange={handleChange} label="Product Quantity" required name="ProductQuantity"  variant="outlined" />
                                </div>

                                <div className="col-md-4">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Product Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formDatas.ProductStatus}
                                            label="ProductStatus"
                                            name="ProductStatus"
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
                                        <InputLabel id="demo-simple-select-label">Product Show On Home</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            value={formDatas.ProductShowOnHome}
                                            label="ProductShowOnHome"
                                            name="ProductShowOnHome"
                                            onChange={handleChange}
                                            required
                                        >
                                            <MenuItem value="">Select</MenuItem>
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>



                                <div className="col-md-4">
                                    <Buttons variant="contained" component="label" >
                                        Product Thumbnail
                                        <input hidden accept="image/*" required onChange={(e) => setProductThumbnail(e.target.files[0])} name="CategoryImg"  type="file" />
                                    </Buttons>
                                </div>

                                <div className="col-md-4">
                                    <Buttons variant="contained" component="label" >
                                        Product Image 1
                                        <input hidden accept="image/*" required onChange={(e) => setProductImage1(e.target.files[0])} name="CategoryImg"  type="file" />
                                    </Buttons>
                                </div>

                                <div className="col-md-4">
                                    <Buttons variant="contained" component="label" >
                                        Product Image 2
                                        <input hidden accept="image/*" required onChange={(e) => setProductImage2(e.target.files[0])} name="CategoryImg"  type="file" />
                                    </Buttons>
                                </div>

                                <div className="col-md-4">
                                    <Buttons variant="contained" component="label" >
                                        Product Image 3
                                        <input hidden accept="image/*" required onChange={(e) => setProductImage3(e.target.files[0])} name="CategoryImg"  type="file" />
                                    </Buttons>
                                </div>

                                <div className="col-md-4">
                                    <Buttons variant="contained" component="label" >
                                        Product Image 4
                                        <input hidden accept="image/*" required onChange={(e) => setProductImage4(e.target.files[0])} name="CategoryImg"  type="file" />
                                    </Buttons>
                                </div>

                                <div className="col-md-12">
                                    <h6 style={{margin:"10px 0px"}}>Product Description</h6>
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data="<p>This is Product Description</p>"
                                        onReady={ editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log( 'Editor is ready to use!', editor );
                                        } }
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            productDes(data)
                                        } }
                                    />
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

export default AddProduct
