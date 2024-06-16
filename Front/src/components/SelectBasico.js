import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {

  return (
    <Box sx={{ minWidth: 120, padding:1 }}>
      <FormControl sx={{ width: 230 }}>
        <InputLabel id={props.id}>{props.label}</InputLabel>
        <Select
          labelId={props.id}
          id={props.id + "select"}
          value={props.value}
          label={props.label}
          onChange={props.onChange}
        >
          {props.itens.map(item => {
            return <MenuItem value={item}>{item.label}</MenuItem>
          })}
          
        </Select>
      </FormControl>
    </Box>
  );
}