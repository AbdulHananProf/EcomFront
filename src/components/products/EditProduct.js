import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import ContentLoader from "react-content-loader";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Buttons from "@mui/material/Button";
import {Rings} from "react-loader-spinner";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {editProduct, selectProducts} from "../../redux/productSlice";
import {GetAllCategory, ProductEdit, url} from "../../controllers/WebController";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditProduct = ({closeModel,err,id}) => {
    const dispatch = useDispatch();
    const reduxProductList = useSelector(selectProducts);
    const [show, setShow] = useState(true);
    const [loader, setLoader] = useState(false);
    const [floader, setfloader] = useState(true);
    const [formError, setFormError] = useState(false);
    const [PCategory,setPCategory] = useState([])
    const [productData, setSingleProductData] = useState({
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
    const [ProductThumbnail, setProductThumbnail] = useState("")
    const [ProductImage1, setProductImage1] = useState("")
    const [ProductImage2, setProductImage2] = useState("")
    const [ProductImage3, setProductImage3] = useState("")
    const [ProductImage4, setProductImage4] = useState("")
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSingleProductData( pre =>({...pre, [name]:value}));
    };

    const handleClose = () => {
        closeModel(false)
        setShow(false)
        setLoader(false)
    };
    useEffect(()=>{
        getProductCategory()
        getProductData()
    },[]);
    const getProductCategory = async () => {
        const res =  await GetAllCategory()
        setPCategory(res.categories)
    }
    const getProductData = async () => {
        // const res =  await EditCategoryByID(id);
        // console.log(res)
        let singleProduct = reduxProductList.filter(el => {
            return el._id === id;
        });
        console.log(singleProduct)
        if(singleProduct[0]){
            setfloader(false)
            setSingleProductData(singleProduct[0])
        }
    }
    const saveData = async (e) => {
        e.preventDefault()
        const{ProductName, ProductCategory, ProductSlug, ProductMK, ProductMD, ProductPrice, ProductWeight, ProductQuantity, ProductDescription, ProductStatus, ProductShowOnHome,ProductUpdatedCategory} = productData
        if(ProductName && ProductCategory && ProductSlug && ProductMK && ProductMD && ProductPrice
            && ProductDescription && ProductStatus){
            setLoader(true)
            const formData = new FormData();
            formData.append('id', productData._id);
            formData.append('ProductThumbnail', ProductThumbnail);
            formData.append('ProductImage1', ProductImage1);
            formData.append('ProductImage2', ProductImage2);
            formData.append('ProductImage3', ProductImage3);
            formData.append('ProductImage4', ProductImage4);
            formData.append('ProductName', ProductName);
            if(ProductUpdatedCategory === undefined){
                formData.append('ProductCategory', ProductCategory._id);
            }else{
                formData.append('ProductCategory', ProductUpdatedCategory);
            }
            formData.append('ProductSlug', ProductSlug);
            formData.append('ProductMK', ProductMK);
            formData.append('ProductMD', ProductMD);
            formData.append('ProductPrice', ProductPrice);
            formData.append('ProductWeight', ProductWeight);
            formData.append('ProductQuantity', ProductQuantity);
            formData.append('ProductDescription', ProductDescription);
            formData.append('ProductStatus', ProductStatus);
            formData.append('ProductShowOnHome', ProductShowOnHome);
            const res =  await ProductEdit(formData)
            if(res.status === "Success"){
                dispatch(editProduct(res.product))
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
        setSingleProductData( pre =>({...pre, ProductDescription:data}));
    }
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
                                                {productData.ProductName === "" && <span className="formValidation"><strong>Product Name Field is Required</strong></span>}
                                                {productData.ProductCategory === "" && <span className="formValidation"><strong>Product Category Field is Required</strong></span>}
                                                {productData.ProductSlug === "" && <span className="formValidation"><strong>Product Slug Field is Required</strong></span>}
                                                {productData.ProductMK === "" && <span className="formValidation"><strong>Product Meta Keyword Field is Required</strong></span>}
                                                {productData.ProductMD === "" && <span className="formValidation"><strong>Product Meta Desc Field is Required</strong></span>}
                                                {productData.ProductPrice === "" && <span className="formValidation"><strong>Product Price Field is Required</strong></span>}
                                                {productData.ProductQuantity === "" && <span className="formValidation"><strong>Product Quantity Field is Required</strong></span>}
                                                {productData.ProductDescription === "" && <span className="formValidation"><strong>Product Description Field is Required</strong></span>}
                                                {productData.ProductStatus === "" && <span className="formValidation"><strong>Product Status Field is Required</strong></span>}
                                                {productData.ProductShowOnHome === "" && <span className="formValidation"><strong>Product Show on Home Field is Required</strong></span>}
                                            </div>
                                        </div>
                                    }
                                    <div className="col-md-4">
                                        <TextField  type="text" onChange={handleChange}  label="Product Name" name="ProductName" variant="outlined" value={productData.ProductName} />
                                    </div>
                                    <div className="col-md-4">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={productData.ProductCategory._id}
                                                label="Product category"
                                                name="ProductUpdatedCategory"
                                                onChange={handleChange}
                                                required
                                            >
                                                {
                                                    PCategory.map((category, index) =>{
                                                        return(
                                                            <MenuItem key={index} value={category._id} >{category.CategoryName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="text"  onChange={handleChange} label="Product Slug" placeholder="product-name-12-abc" required name="ProductSlug" variant="outlined" value={productData.ProductSlug}/>
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="text" onChange={handleChange} label="Product Meta Keyword" required name="ProductMK" variant="outlined" value={productData.ProductMK} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="text"  onChange={handleChange} label="Product Meta Desc" required name="ProductMD"  variant="outlined" value={productData.ProductMD} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="text"  onChange={handleChange} label="Product Price" required name="ProductPrice"  variant="outlined" value={productData.ProductPrice} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="text"  onChange={handleChange} label="Product Weight" required name="ProductWeight"  variant="outlined" value={productData.ProductWeight} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="text"  onChange={handleChange} label="Product Quantity" required name="ProductQuantity"  variant="outlined" value={productData.ProductQuantity} />
                                    </div>

                                    <div className="col-md-4">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Product Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={productData.ProductStatus}
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
                                                value={productData.ProductShowOnHome}
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
                                            <input hidden accept="image/*"  onChange={(e) => setProductThumbnail(e.target.files[0])} name="CategoryImg"  type="file" />
                                        </Buttons>
                                    </div>

                                    <div className="col-md-4">
                                        <Buttons variant="contained" component="label" >
                                            Product Image 1
                                            <input hidden accept="image/*"  onChange={(e) => setProductImage1(e.target.files[0])} name="CategoryImg"  type="file" />
                                        </Buttons>
                                    </div>

                                    <div className="col-md-4">
                                        <Buttons variant="contained" component="label" >
                                            Product Image 2
                                            <input hidden accept="image/*"  onChange={(e) => setProductImage2(e.target.files[0])} name="CategoryImg"  type="file" />
                                        </Buttons>
                                    </div>

                                    <div className="col-md-4">
                                        <Buttons variant="contained" component="label" >
                                            Product Image 3
                                            <input hidden accept="image/*"  onChange={(e) => setProductImage3(e.target.files[0])} name="CategoryImg"  type="file" />
                                        </Buttons>
                                    </div>

                                    <div className="col-md-4">
                                        <Buttons variant="contained" component="label" >
                                            Product Image 4
                                            <input hidden accept="image/*"  onChange={(e) => setProductImage4(e.target.files[0])} name="CategoryImg"  type="file" />
                                        </Buttons>
                                    </div>

                                    <div className="col-md-12" style={{margin:"10px 0px"}}>
                                        <h6 style={{margin:"10px 0px"}}>Product Description</h6>
                                        <CKEditor
                                            editor={ ClassicEditor }
                                            data={productData.ProductDescription}
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

                                    <div className={"col-md-4"}><img src={url + "/uploads/products/" + productData.ProductThumbnail} style={{width:"100%",marginBottom:"10px"}}/></div>
                                    <div className={"col-md-4"}><img src={url + "/uploads/products/" + productData.ProductImage1} style={{width:"100%",marginBottom:"10px"}}/></div>
                                    <div className={"col-md-4"}><img src={url + "/uploads/products/" + productData.ProductImage2} style={{width:"100%",marginBottom:"10px"}}/></div>
                                    <div className={"col-md-4"}><img src={url + "/uploads/products/" + productData.ProductImage3} style={{width:"100%",marginBottom:"10px"}}/></div>
                                    <div className={"col-md-4"}><img src={url + "/uploads/products/" + productData.ProductImage4} style={{width:"100%",marginBottom:"10px"}}/></div>

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
                    }

                </Modal.Body>


            </Modal>
        </>
    )
}
export default EditProduct