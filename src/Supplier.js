import * as React from 'react';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import data from './SupplierData'
import ButtonAppBar from './ButtonAppBar';
import { Button } from '@mui/base';
import EditableCell from './EditableCell';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';

export default function Supplier() {
  const [rows,setRows] = React.useState(data)
  const [open,setOpen] = React.useState(false)
  const [formData,setFormData] = React.useState({
    id : '' ,name : "", contactPerson:"",phone : '' ,email : ""
  })
  const [text, setText] = React.useState('');
  
  const handleChange = (event) =>{
    const {name,value} = event.target
    setFormData({...formData,[name] : value})
  }
  const handleRemove = (i) =>{
    const arr = [...rows]
    arr.splice(i,1)
    setRows(arr)
  }

  const handleAdd = (i) =>{
   setOpen(true)
  }
 
  const handleEntry = ( ) =>{
    setRows([...data,{...formData ,id : data.length + 1}])
    setFormData({id : "" ,name : '',contactPerson : '',phone : '',email : '' })
  }
  const handleSave = (rowIndex, columnId, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][columnId] = value;
    setRows(updatedRows);
};

const handleChangeText = (e) => {
  setText(e.target.value)
  console.log("event", e.target.value)
}

useEffect(() => {
  if (text.length > 2) {
      const results = data?.filter((item) => 
      item.contactPerson.includes(text));
    setRows(results);
  }
  else {
    setRows(data)
  }
}, [text]);
  
  return (
     <>
     <ButtonAppBar title = {"Supplier Details"}/>
     <br />
            <Box
                sx={{
                    paddingLeft: 5,
                    width: 500,
                    maxWidth: '60%',
                }}
            >
                <TextField fullWidth label="Search Here" id="fullWidth"
                    onChange={(e) => handleChangeText(e)}
                    value={text}
                />
            </Box>
            <br />
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
           
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Contact Person</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">e-mail</TableCell>
            

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,i) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
              <TableCell align="right">{row.id}</TableCell>
              <EditableCell
                                    value={row.name}
                                    rowIndex={i}
                                    columnId="name"
                                    onSave={handleSave}
            
                                />
              <EditableCell
                                    value={row.contactPerson}
                                    rowIndex={i}
                                    columnId="contactPerson"
                                    onSave={handleSave}
            
                                />
              <EditableCell
                                    value={row.phone}
                                    rowIndex={i}
                                    columnId="phone"
                                    onSave={handleSave}
            
                                />
              <EditableCell
                                    value={row.email}
                                    rowIndex={i}
                                    columnId="email"
                                    onSave={handleSave}
            
                                />
            <TableCell align="right"><Button size = "small" onClick = {() => handleRemove(i)}>Remove</Button></TableCell>
            </TableRow>
          ))}
         </TableBody>
         </Table>
    </TableContainer>
    <Button onClick = {handleAdd}> + Add Entry</Button>
    {open  &&
      <Box mt={2}>
        <TextField
          name="id"
          value={formData.id}
          onChange={handleChange}
          label="ID"
          variant="outlined"
          margin="normal"
        />
        <TextField
          name="name"
          value={formData.name}
          onChange={handleChange}
          label="name"
          variant="outlined"
          margin="normal"
        />
        <TextField
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          label="contactPerson"
          variant="outlined"
          margin="normal"
        />
        <TextField
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          label="phone"
          variant="outlined"
          margin="normal"
        />
        <TextField
          name="email"
          value={formData.email}
          onChange={handleChange}
          label="email"
          variant="outlined"
          margin="normal"
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleEntry}>
            Add
          </Button>
        </Box>
      </Box>
}
    </>
  );
}
