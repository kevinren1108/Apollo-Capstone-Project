import * as React from 'react';
import { createElement } from 'react';
import { Menu, useResourceDefinitions } from 'react-admin';
import LabelIcon from '@mui/icons-material/Label';
import { createTheme } from "@mui/material";

function MyMenu(){ 
    return (
        <Menu 
            sx={{
                margin: 0,
                height: 1
            }}
        >
            <Menu.Item sx={{color: 'black'}} to="/" primaryText="Map" leftIcon={<LabelIcon />} />
            <Menu.Item sx={{color: 'black'}} to="/Overview" primaryText="Overview" leftIcon={<LabelIcon />} />
            <Menu.Item sx={{color: 'black'}} to="/Setting" primaryText="Setting" leftIcon={<LabelIcon />} />
        </Menu>
    )
}
export default MyMenu;