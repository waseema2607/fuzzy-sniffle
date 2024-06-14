import * as React from 'react';
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

export default function Inventory() {
    const [rows, setRows] = React.useState(data)

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
    return (
        <>
            <ButtonAppBar title={"Shipment Details"} />
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
