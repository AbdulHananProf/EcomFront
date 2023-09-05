import React, { useState } from "react";
import {Link} from "react-router-dom"
import CategoryIcon from '@mui/icons-material/Category';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import ListIcon from '@mui/icons-material/List';
const SideBarP = () => {
    return (
        <>
            <div className="col-md-2 p_0">
                <Sidebar>
                    <h3 style={{color:"white"}}>DashBoard</h3>
                    <Menu>
                        <MenuItem> <Link to="/Dashboard">Dashboard</Link> </MenuItem>
                        <SubMenu icon={<ListIcon/>}  label="Manage Categories">
                            <MenuItem><Link to="/category"><CategoryIcon/>   Categories </Link></MenuItem>
                        </SubMenu>
                        <SubMenu icon={<ListIcon/>}  label="Manage Products">
                            <MenuItem><Link to="/products"><CategoryIcon/>   Products </Link></MenuItem>
                        </SubMenu>
                        <SubMenu icon={<ListIcon/>}  label="Manage Orders">
                            <MenuItem><Link to="/orders"><CategoryIcon/>   Orders </Link></MenuItem>
                        </SubMenu>
                        {/*<MenuItem> Documentation </MenuItem>*/}
                        {/*<MenuItem> Calendar </MenuItem>*/}
                        {/*<MenuItem> Logout </MenuItem>*/}
                    </Menu>
                </Sidebar>
            </div>
        </>
    );
};

export default SideBarP;
