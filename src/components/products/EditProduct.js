import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ContentLoader from "react-content-loader";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Buttons from "@mui/material/Button";
import { Rings } from "react-loader-spinner";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, selectProducts } from "../../redux/productSlice";
import { GetAllCategory, GetAllFabric, ProductEdit, url, getAllSizes, uploadImages} from "../../controllers/WebController";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select1 from 'react-select';
import Accordion from 'react-bootstrap/Accordion';

const EditProduct = ({ closeModel, err, id }) => {
    const dispatch = useDispatch();
    const reduxProductList = useSelector(selectProducts);
    const [show, setShow] = useState(true);
    const [loader, setLoader] = useState(false);
    const [floader, setfloader] = useState(true);
    const [formError, setFormError] = useState(false);
    const [PCategory, setPCategory] = useState([])
    const [PFabric,setPFabric] = useState([])
    const [productData, setSingleProductData] = useState({
        ProductName: "",
        ProductCategory: "",
        ProductFabric:"",
        ProductSlug: "",
        ProductMK: "",
        ProductMD: "",
        ProductPrice: "",
        ProductDiscountPrice: "",
        ProductStichedPrice:"",
        ProductDiscountStichedPrice:"",
        ProductDescription: "",
        ProductStatus: "In-Active",
        ProductShowOnHome: "No"
    });


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSingleProductData(pre => ({ ...pre, [name]: value }));
    };

    const handleClose = () => {
        closeModel(false)
        setShow(false)
        setLoader(false)
    };
    useEffect(() => {
        getProductCategory()
        getProductData()
        getProductFabric()
        getSizes()
    }, []);

    const getProductCategory = async () => {
        const res = await GetAllCategory()
        setPCategory(res.categories)
    }

    const getProductFabric = async () => {
        const res =  await GetAllFabric()
        setPFabric(res.fabric)
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
        console.log(data, "890809")
        setSelectedOptions3(data);
    }

    const getProductData = async () => {
        // const res =  await EditCategoryByID(id);
        // console.log(res)
        let singleProduct = reduxProductList.filter(el => {
            return el._id === id;
        });

        if (singleProduct[0]) {
            setfloader(false)
            setSingleProductData(singleProduct[0])
            setSelectedOptions2(singleProduct[0].sizes)
            setSelectedOptions3(singleProduct[0].colors)
        }
    }

    const createSlug = () => {
        let ProductName = productData.ProductName;
        const stringWithoutSpaces = ProductName.replace(/\s+/g, '');
        const lowercaseString = stringWithoutSpaces.toLowerCase();
        console.log(productData.ProductName)
        setSingleProductData(pre => ({ ...pre, "ProductSlug": lowercaseString }));
    }

    const [img1, setImage1] = useState();
    const [img2, setImage2] = useState();
    const [img3, setImage3] = useState();
    const [img4, setImage4] = useState();
    const [img5, setImage5] = useState();

    const saveData = async (e) => {
        e.preventDefault()
        const { ProductName, ProductCategory, ProductFabric, ProductSlug, ProductMK, ProductMD, ProductPrice, ProductDiscountPrice, ProductDescription,ProductStichedPrice,ProductDiscountStichedPrice, ProductStatus, ProductShowOnHome, ProductUpdatedCategory,ProductUpdatedFabric } = productData
        if (ProductName && ProductCategory && ProductFabric && ProductSlug && ProductMK && ProductMD && ProductPrice && ProductDescription && ProductStatus) {
            let sizes = JSON.stringify(selectedOptions2)
            let colors = JSON.stringify(selectedOptions3)
            setLoader(true)
            const formData = new FormData();
            formData.append('id', productData._id);
            formData.append('ProductName', ProductName);
            if (ProductUpdatedCategory === undefined) {
                formData.append('ProductCategory', ProductCategory._id);
            } else {
                formData.append('ProductCategory', ProductUpdatedCategory);
            }
            if(ProductUpdatedFabric  === undefined){
                formData.append('ProductFabric', ProductFabric._id);
            } else {
                formData.append('ProductFabric', ProductUpdatedFabric);
            }
            formData.append('ProductSlug', ProductSlug);
            formData.append('ProductMK', ProductMK);
            formData.append('ProductMD', ProductMD);
            formData.append('ProductPrice', ProductPrice);
            formData.append('ProductDiscountPrice', ProductDiscountPrice);
            formData.append('ProductDescription', ProductDescription);
            formData.append('ProductStatus', ProductStatus);
            formData.append('ProductShowOnHome', ProductShowOnHome);
            formData.append('ProductStichedPrice', ProductStichedPrice);
            formData.append('ProductDiscountStichedPrice', ProductDiscountStichedPrice);
            formData.append('sizes', sizes);
            formData.append('colors', colors);
            const res = await ProductEdit(formData)
            if (res.status === "Success") {
                dispatch(editProduct(res.product))
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
    const productDes = (data) => {
        setSingleProductData(pre => ({ ...pre, ProductDescription: data }));
    }

    const uploadImage = async (colorName) => {
        const formData = new FormData();
        formData.append('id', productData._id);
        formData.append('colorName', colorName);
        formData.append('img1', img1);
        formData.append('img2', img2);
        formData.append('img3', img3);
        formData.append('img4', img4);
        formData.append('img5', img5);
        console.log(formData)
        const res = await uploadImages(formData)
        if (res.status === "Success") {
            dispatch(editProduct(res.product))
            err(prevState => ({ ...prevState, message: res.message }))
            err(prevState => ({ ...prevState, status: res.status }))
            handleClose()
        } else {
            handleClose()
            err(prevState => ({ ...prevState, message: res.message }))
            err(prevState => ({ ...prevState, status: res.status }))
        }
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
                                    {formError === true &&
                                        <div className="col-md-12">
                                            <div className="alert alert-danger" role="alert"  >
                                                {productData.ProductName === "" && <span className="formValidation"><strong>Product Name Field is Required</strong></span>}
                                                {productData.ProductCategory === "" && <span className="formValidation"><strong>Product Category Field is Required</strong></span>}
                                                {productData.ProductSlug === "" && <span className="formValidation"><strong>Product Slug Field is Required</strong></span>}
                                                {productData.ProductMK === "" && <span className="formValidation"><strong>Product Meta Keyword Field is Required</strong></span>}
                                                {productData.ProductMD === "" && <span className="formValidation"><strong>Product Meta Desc Field is Required</strong></span>}
                                                {productData.ProductPrice === "" && <span className="formValidation"><strong>Product Price Field is Required</strong></span>}
                                                {productData.ProductDescription === "" && <span className="formValidation"><strong>Product Description Field is Required</strong></span>}
                                                {productData.ProductStatus === "" && <span className="formValidation"><strong>Product Status Field is Required</strong></span>}
                                                {productData.ProductShowOnHome === "" && <span className="formValidation"><strong>Product Show on Home Field is Required</strong></span>}
                                            </div>
                                        </div>
                                    }
                                    <div className="col-md-4">
                                        <TextField type="text" onChange={handleChange} label="Product Name" name="ProductName" onBlur={createSlug} variant="outlined" value={productData.ProductName} />
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
                                                    PCategory.map((category, index) => {
                                                        return (
                                                            <MenuItem key={index} value={category._id} >{category.CategoryName}</MenuItem>
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
                                                defaultValue={productData.ProductFabric._id}
                                                label="Product Fabric"
                                                name="ProductUpdatedFabric"
                                                onChange={handleChange}
                                                required
                                            >
                                                {
                                                    PFabric.map((fabric, index) => {
                                                        return (
                                                            <MenuItem key={index} value={fabric._id} >{fabric.FabricName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>


                                    <div className="col-md-4">
                                        <TextField type="text" onChange={handleChange} label="Product Slug" placeholder="product-name-12-abc" disabled required name="ProductSlug" variant="outlined" value={productData.ProductSlug} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="text" onChange={handleChange} label="Product Meta Keyword" required name="ProductMK" variant="outlined" value={productData.ProductMK} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="text" onChange={handleChange} label="Product Meta Desc" required name="ProductMD" variant="outlined" value={productData.ProductMD} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="number" onChange={handleChange} label="Product Price" required name="ProductPrice" variant="outlined" value={productData.ProductPrice} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="number" onChange={handleChange} label="Product Discount Price" required name="ProductDiscountPrice" variant="outlined" value={productData.ProductDiscountPrice} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="number"  onChange={handleChange} label="Product Stiched Price" required name="ProductStichedPrice"  variant="outlined" value={productData.ProductStichedPrice} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="number"  onChange={handleChange} label="Product Stiched Dicount Price" required name="ProductDiscountStichedPrice"  variant="outlined"  value={productData.ProductDiscountStichedPrice}/>
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
                                        <Accordion>
                                            {selectedOptions3?.map((data, index) => {
                                                return (
                                                    <Accordion.Item eventKey={index}>
                                                        <Accordion.Header>Upload Images Of {data.label}</Accordion.Header>
                                                        <Accordion.Body>
                                                            <div className="row">
                                                                <div className="col-md-12 mb-2">
                                                                    <label><strong>Image 1 :</strong></label> &nbsp;
                                                                    <input type="file" id="myFile" name="img1" onChange={(e) => { setImage1(e.target.files[0]) }} />
                                                                </div>

                                                                <div className="col-md-12 mb-2">
                                                                    <label><strong>Image 2 :</strong></label> &nbsp;
                                                                    <input type="file" id="myFile" name="img2" onChange={(e) => { setImage2(e.target.files[0]) }} />
                                                                </div>

                                                                <div className="col-md-12 mb-2">
                                                                    <label><strong>Image 3 :</strong></label> &nbsp;
                                                                    <input type="file" id="myFile" name="img3" onChange={(e) => { setImage3(e.target.files[0]) }} />
                                                                </div>

                                                                <div className="col-md-12 mb-2">
                                                                    <label><strong>Image 4 :</strong></label> &nbsp;
                                                                    <input type="file" id="myFile" name="img4" onChange={(e) => { setImage4(e.target.files[0]) }} />
                                                                </div>

                                                                <div className="col-md-12 mb-2">
                                                                    <label><strong>Image 5 :</strong></label> &nbsp;
                                                                    <input type="file" id="myFile" name="img5" onChange={(e) => { setImage5(e.target.files[0]) }} />
                                                                </div>

                                                                <div className="col-md-3">
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

                                                                        <Button type="button" variant="primary" onClick={()=>{uploadImage(data.label)}}>
                                                                            Upload Images
                                                                        </Button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                )
                                            })}
                                        </Accordion>
                                    </div>



                                    <div className="col-md-12" style={{ margin: "10px 0px" }}>
                                        <h6 style={{ margin: "10px 0px" }}>Product Description</h6>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={productData.ProductDescription}
                                            onReady={editor => {
                                                // You can store the "editor" and use when it is needed.
                                                console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                productDes(data)
                                            }}
                                        />
                                    </div>

                                    {productData.images.map((data,index)=>{
                                        return(
                                            <>
                                                <h5>Images Of {data.colorName}</h5>
                                                <div className={"col-md-4"}><img src={url + "/uploads/products/" + data?.imgCollection?.img1} style={{width:"100%",marginBottom:"10px"}}/></div>
                                                <div className={"col-md-4"}><img src={url + "/uploads/products/" + data?.imgCollection?.img2} style={{width:"100%",marginBottom:"10px"}}/></div>
                                                <div className={"col-md-4"}><img src={url + "/uploads/products/" + data?.imgCollection?.img3} style={{width:"100%",marginBottom:"10px"}}/></div>
                                                <div className={"col-md-4"}><img src={url + "/uploads/products/" + data?.imgCollection?.img4} style={{width:"100%",marginBottom:"10px"}}/></div>
                                                <div className={"col-md-4"}><img src={url + "/uploads/products/" + data?.imgCollection?.img5} style={{width:"100%",marginBottom:"10px"}}/></div>
                                            </>
                                        )
                                    })}
                                    

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
                    }

                </Modal.Body>


            </Modal>
        </>
    )
}
export default EditProduct