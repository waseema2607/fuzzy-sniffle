import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import { IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function EditableCell({ value: initialValue, rowIndex, columnId, onSave }) {
    const [value, setValue] = React.useState(initialValue);
    const [isEditing, setIsEditing] = React.useState(false);
  
    const handleChange = (event) => {
        setValue(event.target.value);
    };
  
    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            onSave(rowIndex, columnId, value);
        }
    };
  
    return (
        <TableCell align="right">
            {isEditing ? (
                <TextField
                    value={value}
                    onChange={handleChange}
                    onBlur={toggleEdit}
                    autoFocus
                    fullWidth
                    variant="standard"
                />
            ) : (
                <>
                    {value}
                    <IconButton onClick={toggleEdit} size="small">
                   <EditIcon fontSize = "small"/>
                    </IconButton>
                </>
            )}
        </TableCell>
    );
  }
  
  export default EditableCell;
  