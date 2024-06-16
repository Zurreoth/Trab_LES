import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Paper } from '@mui/material';

export default function TextFieldBasico(props) {
  return (
    <>
    <TextField id={props.id} label={props.label} variant="outlined"
        value={props.value}
        onChange={props.onChange} 
        style={{padding: 10}}
        type={(props.type !== undefined) ? props.type : "text"}/>
    <br/>
    </>
  );
}