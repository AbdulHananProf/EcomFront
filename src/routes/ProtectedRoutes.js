import React, {Component, useEffect} from "react";
import {Route, Redirect, useNavigate} from "react-router-dom"

const ProtectedRoutes = (props) => {
    const {Component} = props;
    const navigate = useNavigate();
    const getpath = window.location.pathname;
    useEffect(()=>{
        let login = localStorage.getItem('token')
        console.log(login)
        if(login === "null"){
            navigate('/login')
        }else{
            if(login !== "null" && getpath === '/' ){
                console.log("abc")
                navigate("/Dashboard")
            }else {
                console.log(getpath)
                navigate(getpath)
            }

        }
    },[])
    return(
        <>
            <Component/>
        </>
    )
}
export default ProtectedRoutes
