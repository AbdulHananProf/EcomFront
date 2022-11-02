import * as React from "react";
import {Routes, Route, Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import {LoginReq} from "../../controllers/WebController"
import {Helmet} from "react-helmet";

const Login = () => {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        email:"",
        password:""
    });
    const [error,setError] = useState({
        message:"",
        stauts:""
    });
    const inputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputData(prevState => ({...prevState , [name]:value}))
    }
    const formSubmit = async (e) =>{
        e.preventDefault();
        const res = await LoginReq(inputData)
        if(res.status === "Success"){
            localStorage.setItem('token',res.token)
            navigate('/Dashboard')
        }else{
            setError(prevState => ({...prevState , message:res.message}))
            setError(prevState => ({...prevState , status:res.status}))
        }


    }
    return (
        <>
            <Helmet>
                <title>Login | Portal</title>
                <meta name="description" content="This the Admin Portal to Control the website" />
            </Helmet>
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-2"></div>
                        <div className="col-lg-4 col-md-8 login-box">
                            <div className="col-lg-12 login-key">
                                <i className="fa fa-key" aria-hidden="true"></i>
                            </div>
                            <div className="col-lg-12 login-title">
                                ADMIN PANEL
                            </div>

                            <div className="col-lg-12 login-form">
                                <div className="col-lg-12 login-form">
                                    <form onSubmit={formSubmit}>
                                        <div className="form-group loginFields">
                                            <label className="form-control-label">USERNAME</label>
                                            <input type="text" className="form-control loginInput" name="email" onChange={inputHandler}/>
                                        </div>
                                        <div className="form-group loginFields">
                                            <label className="form-control-label">PASSWORD</label>
                                            <input type="password" className="form-control loginInput" name="password" onChange={inputHandler}/>
                                        </div>

                                        <div className="col-lg-12 loginbttm">
                                            <div className="col-lg-6 login-btm login-text">
                                                &nbsp; {error.message}
                                            </div>
                                            <div className="col-lg-6 login-btm login-button">
                                                <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login
