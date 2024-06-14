import * as React from 'react';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import data from './ShipmentData'
import ButtonAppBar from './ButtonAppBar';
import { Button } from '@mui/base';
import EditableCell from './EditableCell';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

export default function Inventory() {
    const [rows, setRows] = React.useState(data)
    const [text, setText] = React.useState('');

    const handleAdd = (i) => {
        const arr = [...rows]
        arr.push(i, 1)
        setRows(arr)
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
            item.status.includes(text));
          setRows(results);
        }
        else {
            setRows(data)
          }
      }, [text]);
    return (
        <>
            <ButtonAppBar title={"Shipment Details"} />

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
                            <TableCell align="right">origin</TableCell>
                            <TableCell align="right">Destination</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Estd. Delivery</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell align="right">{row.id}</TableCell>
                                <TableCell align="right">{row.origin}</TableCell>
                                <TableCell align="right">{row.destination}</TableCell>
                                <EditableCell
                                    value={row.status}
                                    rowIndex={rowIndex}
                                    columnId="status"
                                    onSave={handleSave}

                                />
                                <TableCell align="right">{row.estimatedDelivery}</TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={handleAdd}> + Add Entry</Button>
        </>
    );
}
