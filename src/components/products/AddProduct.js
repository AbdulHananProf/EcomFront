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
import {GetAllFabric,GetAllCategory, ProductAdd, getAllSizes} from "../../controllers/WebController";
import Select1 from 'react-select';


const AddProduct = ({closeModel,err}) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    const [loader, setLoader] = useState(false);
    const [formError, setFormError] = useState(false);
    const [PCategory,setPCategory] = useState([])
    const [PFabric,setPFabric] = useState([])
    const handleClose = () => {
        closeModel(false)
        setShow(false)
        setLoader(false)
    };

    useEffect(() => {
        getProductCategory()
        getProductFabric()
        getSizes()
    }, []);

    const getProductCategory = async () => {
        const res =  await GetAllCategory()
        setPCategory(res.categories)
    }

    const getProductFabric = async () => {
        const res =  await GetAllFabric()
        setPFabric(res.fabric)
    }

    const [formDatas, setFormData] = useState({
        ProductName:"",
        ProductCategory:"",
        ProductFabric:"",
        ProductSlug:"",
        ProductMK:"",
        ProductMD:"",
        ProductPrice:"",
        ProductDiscountPrice:"",
        ProductStichedPrice:"",
        ProductDiscountStichedPrice:"",
        ProductDescription:"",
        ProductStatus:"In-Active",
        ProductShowOnHome:"No"
    });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData( pre =>({...pre, [name]:value}));
    };
    
    const createSlug = () => {
        let ProductName = formDatas.ProductName;
        const stringWithoutSpaces = ProductName.replace(/\s+/g, '');
        const lowercaseString = stringWithoutSpaces.toLowerCase();
        console.log(formDatas.ProductName)
        setFormData(pre => ({ ...pre, "ProductSlug": lowercaseString }));
    }

    const productDes = (data) => {
        setFormData( pre =>({...pre, ProductDescription:data}));
   }

   const [sizeOptionList, setSizeOptionList] = useState();
   const [selectedOptions2, setSelectedOptions2] = useState();
   const getSizes = async () => {
       const res = await getAllSizes();
       setSizeOptionList(res.size)
   }
   function handleSelect2(data) {
       setSelectedOptions2(data);
   }
   
   const [colorOptionList, setColorOptionList] = useState([
    { "value": "AliceBlue", "label": "AliceBlue" },
    { "value": "AntiqueWhite", "label": "AntiqueWhite" },
    { "value": "Aqua", "label": "Aqua" },
    { "value": "Aquamarine", "label": "Aquamarine" },
    { "value": "Azure", "label": "Azure" },
    { "value": "Beige", "label": "Beige" },
    { "value": "Bisque", "label": "Bisque" },
    { "value": "Black", "label": "Black" },
    { "value": "BlanchedAlmond", "label": "BlanchedAlmond" },
    { "value": "Blue", "label": "Blue" },
    { "value": "BlueViolet", "label": "BlueViolet" },
    { "value": "Brown", "label": "Brown" },
    { "value": "BurlyWood", "label": "BurlyWood" },
    { "value": "CadetBlue", "label": "CadetBlue" },
    { "value": "Chartreuse", "label": "Chartreuse" },
    { "value": "Chocolate", "label": "Chocolate" },
    { "value": "Coral", "label": "Coral" },
    { "value": "CornflowerBlue", "label": "CornflowerBlue" },
    { "value": "Cornsilk", "label": "Cornsilk" },
    { "value": "Crimson", "label": "Crimson" },
    { "value": "Cyan", "label": "Cyan" },
    { "value": "DarkBlue", "label": "DarkBlue" },
    { "value": "DarkCyan", "label": "DarkCyan" },
    { "value": "DarkGoldenRod", "label": "DarkGoldenRod" },
    { "value": "DarkGray", "label": "DarkGray" },
    { "value": "DarkGreen", "label": "DarkGreen" },
    { "value": "DarkKhaki", "label": "DarkKhaki" },
    { "value": "DarkMagenta", "label": "DarkMagenta" },
    { "value": "DarkOliveGreen", "label": "DarkOliveGreen" },
    { "value": "DarkOrange", "label": "DarkOrange" },
    { "value": "DarkOrchid", "label": "DarkOrchid" },
    { "value": "DarkRed", "label": "DarkRed" },
    { "value": "DarkSalmon", "label": "DarkSalmon" },
    { "value": "DarkSeaGreen", "label": "DarkSeaGreen" },
    { "value": "DarkSlateBlue", "label": "DarkSlateBlue" },
    { "value": "DarkSlateGray", "label": "DarkSlateGray" },
    { "value": "DarkTurquoise", "label": "DarkTurquoise" },
    { "value": "DarkViolet", "label": "DarkViolet" },
    { "value": "DeepPink", "label": "DeepPink" },
    { "value": "DeepSkyBlue", "label": "DeepSkyBlue" },
    { "value": "DimGray", "label": "DimGray" },
    { "value": "DodgerBlue", "label": "DodgerBlue" },
    { "value": "FireBrick", "label": "FireBrick" },
    { "value": "FloralWhite", "label": "FloralWhite" },
    { "value": "ForestGreen", "label": "ForestGreen" },
    { "value": "Fuchsia", "label": "Fuchsia" },
    { "value": "Gainsboro", "label": "Gainsboro" },
    { "value": "GhostWhite", "label": "GhostWhite" },
    { "value": "Gold", "label": "Gold" },
    { "value": "GoldenRod", "label": "GoldenRod" },
    { "value": "Gray", "label": "Gray" },
    { "value": "Green", "label": "Green" },
    { "value": "GreenYellow", "label": "GreenYellow" },
    { "value": "HoneyDew", "label": "HoneyDew" },
    { "value": "HotPink", "label": "HotPink" },
    { "value": "IndianRed", "label": "IndianRed" },
    { "value": "Indigo", "label": "Indigo" },
    { "value": "Ivory", "label": "Ivory" },
    { "value": "Khaki", "label": "Khaki" },
    { "value": "Lavender", "label": "Lavender" },
    { "value": "LavenderBlush", "label": "LavenderBlush" },
    { "value": "LawnGreen", "label": "LawnGreen" },
    { "value": "LemonChiffon", "label": "LemonChiffon" },
    { "value": "LightBlue", "label": "LightBlue" },
    { "value": "LightCoral", "label": "LightCoral" },
    { "value": "LightCyan", "label": "LightCyan" },
    { "value": "LightGoldenRodYellow", "label": "LightGoldenRodYellow" },
    { "value": "LightGray", "label": "LightGray" },
    { "value": "LightGreen", "label": "LightGreen" },
    { "value": "LightPink", "label": "LightPink" },
    { "value": "LightSalmon", "label": "LightSalmon" },
    { "value": "LightSeaGreen", "label": "LightSeaGreen" },
    { "value": "LightSkyBlue", "label": "LightSkyBlue" },
    { "value": "LightSlateGray", "label": "LightSlateGray" },
    { "value": "LightSteelBlue", "label": "LightSteelBlue" },
    { "value": "LightYellow", "label": "LightYellow" },
    { "value": "Lime", "label": "Lime" },
    { "value": "LimeGreen", "label": "LimeGreen" },
    { "value": "Linen", "label": "Linen" },
    { "value": "Magenta", "label": "Magenta" },
    { "value": "Maroon", "label": "Maroon" },
    { "value": "MediumAquaMarine", "label": "MediumAquaMarine" },
    { "value": "MediumBlue", "label": "MediumBlue" },
    { "value": "MediumOrchid", "label": "MediumOrchid" },
    { "value": "MediumPurple", "label": "MediumPurple" },
    { "value": "MediumSeaGreen", "label": "MediumSeaGreen" },
    { "value": "MediumSlateBlue", "label": "MediumSlateBlue" },
    { "value": "MediumSpringGreen", "label": "MediumSpringGreen" },
    { "value": "MediumTurquoise", "label": "MediumTurquoise" },
    { "value": "MediumVioletRed", "label": "MediumVioletRed" },
    { "value": "MidnightBlue", "label": "MidnightBlue" },
    { "value": "MintCream", "label": "MintCream" },
    { "value": "MistyRose", "label": "MistyRose" },
    { "value": "Moccasin", "label": "Moccasin" },
    { "value": "NavajoWhite", "label": "NavajoWhite" },
    { "value": "Navy", "label": "Navy" },
    { "value": "OldLace", "label": "OldLace" },
    { "value": "Olive", "label": "Olive" },
    { "value": "OliveDrab", "label": "OliveDrab" },
    { "value": "Orange", "label": "Orange" },
    { "value": "OrangeRed", "label": "OrangeRed" },
    { "value": "Orchid", "label": "Orchid" },
    { "value": "PaleGoldenRod", "label": "PaleGoldenRod" },
    { "value": "PaleGreen", "label": "PaleGreen" },
    { "value": "PaleTurquoise", "label": "PaleTurquoise" },
    { "value": "PaleVioletRed", "label": "PaleVioletRed" },
    { "value": "PapayaWhip", "label": "PapayaWhip" },
    { "value": "PeachPuff", "label": "PeachPuff" },
    { "value": "Peru", "label": "Peru" },
    { "value": "Pink", "label": "Pink" },
    { "value": "Plum", "label": "Plum" },
    { "value": "PowderBlue", "label": "PowderBlue" },
    { "value": "Purple", "label": "Purple" },
    { "value": "RebeccaPurple", "label": "RebeccaPurple" },
    { "value": "Red", "label": "Red" },
    { "value": "RosyBrown", "label": "RosyBrown" },
    { "value": "RoyalBlue", "label": "RoyalBlue" },
    { "value": "SaddleBrown", "label": "SaddleBrown" },
    { "value": "Salmon", "label": "Salmon" },
    { "value": "SandyBrown", "label": "SandyBrown" },
    { "value": "SeaGreen", "label": "SeaGreen" },
    { "value": "SeaShell", "label": "SeaShell" },
    { "value": "Sienna", "label": "Sienna" },
    { "value": "Silver", "label": "Silver" },
    { "value": "SkyBlue", "label": "SkyBlue" },
    { "value": "SlateBlue", "label": "SlateBlue" },
    { "value": "SlateGray", "label": "SlateGray" },
    { "value": "Snow", "label": "Snow" },
    { "value": "SpringGreen", "label": "SpringGreen" },
    { "value": "SteelBlue", "label": "SteelBlue" },
    { "value": "Tan", "label": "Tan" },
    { "value": "Teal", "label": "Teal" },
    { "value": "Thistle", "label": "Thistle" },
    { "value": "Tomato", "label": "Tomato" },
    { "value": "Turquoise", "label": "Turquoise" },
    { "value": "Violet", "label": "Violet" },
    { "value": "Wheat", "label": "Wheat" },
    { "value": "White", "label": "White" },
    { "value": "WhiteSmoke", "label": "WhiteSmoke" },
    { "value": "Yellow", "label": "Yellow" },
    { "value": "YellowGreen", "label": "YellowGreen" }
  ]);
   const [selectedOptions3, setSelectedOptions3] = useState();
   function handleSelect3(data) {
       setSelectedOptions3(data);
   }

    const saveData = async (e) => {
        e.preventDefault()
        const{ProductName, ProductCategory, ProductFabric, ProductSlug, ProductMK, ProductMD, ProductPrice, ProductDiscountPrice, ProductDescription, ProductStatus, ProductShowOnHome,ProductStichedPrice,ProductDiscountStichedPrice} = formDatas
        if(ProductName && ProductCategory && ProductSlug && ProductMK && ProductMD && ProductPrice
             && ProductDescription && ProductStatus ){
            let sizes = JSON.stringify(selectedOptions2)
            let colors = JSON.stringify(selectedOptions3)    
            setLoader(true)
            const formData = new FormData();
            formData.append('ProductName', ProductName);
            formData.append('ProductCategory', ProductCategory);
            formData.append('ProductFabric', ProductFabric);
            formData.append('ProductSlug', ProductSlug);
            formData.append('ProductMK', ProductMK);
            formData.append('ProductMD', ProductMD);
            formData.append('ProductPrice', ProductPrice);
            formData.append('ProductDiscountPrice', ProductDiscountPrice);
            formData.append('ProductStichedPrice', ProductStichedPrice);
            formData.append('ProductDiscountStichedPrice', ProductDiscountStichedPrice);
            formData.append('ProductDescription', ProductDescription);
            formData.append('ProductStatus', ProductStatus);
            formData.append('ProductShowOnHome', ProductShowOnHome);
            formData.append('sizes', sizes);
            formData.append('colors', colors);
            const res =  await ProductAdd(formData);
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
                                        {formDatas.ProductFabric === "" && <span className="formValidation"><strong>Product Fabric Field is Required</strong></span>}
                                        {formDatas.ProductSlug === "" && <span className="formValidation"><strong>Product Slug Field is Required</strong></span>}
                                        {formDatas.ProductMK === "" && <span className="formValidation"><strong>Product Meta Keyword Field is Required</strong></span>}
                                        {formDatas.ProductMD === "" && <span className="formValidation"><strong>Product Meta Desc Field is Required</strong></span>}
                                        {formDatas.ProductPrice === "" && <span className="formValidation"><strong>Product Price Field is Required</strong></span>}
                                        {formDatas.ProductDescription === "" && <span className="formValidation"><strong>Product Description Field is Required</strong></span>}
                                        {formDatas.ProductStatus === "" && <span className="formValidation"><strong>Product Status Field is Required</strong></span>}
                                        {formDatas.ProductShowOnHome === "" && <span className="formValidation"><strong>Product Show on Home Field is Required</strong></span>}
                                        {/* {ProductThumbnail === "" && <span className="formValidation"><strong>Product Thumbnail Image is Required</strong></span>}
                                        {ProductImage1 === "" && <span className="formValidation"><strong>Product Image 1 Image is Required</strong></span>}
                                        {ProductImage2 === "" && <span className="formValidation"><strong>Product Image 2 Image is Required</strong></span>}
                                        {ProductImage3 === "" && <span className="formValidation"><strong>Product Image 3 Image is Required</strong></span>}
                                        {ProductImage4 === "" && <span className="formValidation"><strong>Product Image 4 Image is Required</strong></span>} */}
                                    </div>
                                </div>
                                }
                                <div className="col-md-4">
                                    <TextField  type="text" onChange={handleChange}  label="Product Name"  onBlur={createSlug} name="ProductName" variant="outlined" />
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
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Product Fabric</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formDatas.ProductFabric}
                                            label="Product Fabric"
                                            name="ProductFabric"
                                            onChange={handleChange}
                                            required
                                        >
                                            {
                                                PFabric?.map((Fabric,index) =>{
                                                    return(
                                                        <MenuItem value={Fabric._id}>{Fabric.FabricName}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-md-4">
                                    <TextField type="text"  onChange={handleChange} label="Product Slug" value={formDatas.ProductSlug} disabled placeholder="product-name-12-abc" required name="ProductSlug" variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="text" onChange={handleChange} label="Product Meta Keyword" required name="ProductMK" variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="text"  onChange={handleChange} label="Product Meta Desc" required name="ProductMD"  variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="number"  onChange={handleChange} label="Product Orignal Price" required name="ProductPrice"  variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="number"  onChange={handleChange} label="Product Discount Price" required name="ProductDiscountPrice"  variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="number"  onChange={handleChange} label="Product Stiched Price" required name="ProductStichedPrice"  variant="outlined" />
                                </div>
                                <div className="col-md-4">
                                    <TextField type="number"  onChange={handleChange} label="Product Stiched Dicount Price" required name="ProductDiscountStichedPrice"  variant="outlined" />
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

                                <div className="col-md-12">
                                    <FormControl fullWidth>
                                        <Select1
                                                options={sizeOptionList}
                                                placeholder="Select Sizes"
                                                value={selectedOptions2}
                                                onChange={handleSelect2}
                                                isSearchable={true}
                                                isMulti
                                        />
                                    </FormControl>
                                </div>
                                
                                <div className="col-md-12">
                                    <FormControl fullWidth>
                                        <Select1
                                                options={colorOptionList}
                                                placeholder="Select Colors"
                                                value={selectedOptions3}
                                                onChange={handleSelect3}
                                                isSearchable={true}
                                                isMulti
                                        />
                                    </FormControl>
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
