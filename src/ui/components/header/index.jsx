import React from 'react';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import LanguageSelector from './languageSelector'

import Label from '../dynamic/label';
import './index.scss'


export default (props) => {

  return (
    <div style={{ display: "flex", width: "90%" }} >
      <div >
        <Typography variant="h6" >
          <Label labelId="appHeaderlb" />
        </Typography>
      </div>
      <div style={{ marginLeft: "auto", height: "50%" }}>
        <div style={{ float: "left", paddingRight: "1%", height: "50%", width: "75%" }}>
          <TextField id="outlined-basic" className="header-input-field"
            label="Search"
            type="search" ></ TextField>
        </div>
        <div style={{ float: "right", height: "20%", width: "24%" }}>
          <LanguageSelector />
        </div>
      </div>
    </div >
  )
};
