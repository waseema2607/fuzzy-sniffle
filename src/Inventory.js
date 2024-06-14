import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import data from './InventoryData'
import TablePagination from '@mui/material/TablePagination';
import { Button } from '@mui/base';
import ButtonAppBar from './ButtonAppBar';
import EditableCell from './EditableCell';
import  Box from '@mui/material/Box';
import { TextField } from '@mui/material';

export default function Inventory() {
  const [rows,setRows] = React.useState(data)
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [page, setPage] = React.useState(0);
  const [formData, setFormData] = React.useState({ id: '', name: '', sku: '' ,quantity : '' ,warehouse : "" });
  const [open,setOpen] = React.useState(false)

  const handleChange = (e) => {
    console.log("called",e)
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRemove = (i) =>{
    const arr = [...rows]
    arr.splice(i,1)
    setRows(arr)
  }

  const handleAdd = () =>{
    setOpen(true)
  }

  const handleEntry = () => {
    setRows([...data, { ...formData, id: data.length + 1 }]);
    setFormData({ id: '', name: '', sku: '' ,quantity : '' ,warehouse : ""}); // Reset form
  };

  const handleSave = (rowIndex, columnId, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][columnId] = value;
    setRows(updatedRows);
};

const handleChangePage = (newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 3));
  setPage(0);
};

console.log(formData,"show",data)
  return (
     <>
     <ButtonAppBar title = {'Inventory Details'} />
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">SKU</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">WareHouse</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,i) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              {/* <TableCell align="right">{row.id}</TableCell> */}
              <EditableCell
                                    value={row.name}
                                    rowIndex={i}
                                    columnId="name"
                                    onSave={handleSave}
            
                                />
              <EditableCell
                                    value={row.sku}
                                    rowIndex={i}
                                    columnId="status"
                                    onSave={handleSave}
            
                                />
              <EditableCell
                                    value={row.quantity}
                                    rowIndex={i}
                                    columnId="status"
                                    onSave={handleSave}
            
                                />
                                <EditableCell
                                    value={row.warehouse}
                                    rowIndex={i}
                                    columnId="status"
                                    onSave={handleSave}
            
                                />
              <TableCell align="right"><Button onClick = {() => handleRemove(i)}>Remove</Button></TableCell>
            </TableRow>
          ))}
         </TableBody>
         </Table>
    </TableContainer>
    <Button onClick = {handleAdd}> + Add Entry</Button>
    <TablePagination
        rowsPerPageOptions={[3, 6, 8]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
         />
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
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          label="sku"
          variant="outlined"
          margin="normal"
        />
        <TextField
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          label="quantity"
          variant="outlined"
          margin="normal"
        />
        <TextField
          name="warehouse"
          value={formData.warehouse}
          onChange={handleChange}
          label="warehouse"
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
