import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import qs from 'query-string';
import axios from 'axios';
import Button from '@mui/material/Button';
const StyledTableCell = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(3),
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export const ModalComponent = ({ user, open, onClose, updateUser }) => {

    
    const [userData, setUserData] = useState(user || {});
    
    useEffect(() => {
        setUserData(user || {});
    }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(userData, "mhandle change");
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString); 
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
  
    if (month.length === 1) {
      month = '0' + month;
    }
    if (day.length === 1) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(`http://localhost/goqii/index.php/User/editUser/${userData.user_id}`,qs.stringify(userData));
      console.log(response,"Post created");
      updateUser();
    } catch (error) {
      console.error("Error creating post:", error);
    }
    onClose();
  }

  return (
    <div>
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4">Edit User</Typography>
          
          <hr />
          <Box sx={{ mt: '30px'}}>
            <StyledTableCell>
              <TextField id="outlined-basic" label="Name" variant="outlined"
              name="name"
              value={userData.name}
              onChange={handleChange} 
              />
            </StyledTableCell>
            <StyledTableCell>
                <TextField id="outlined-basic" label="Email" variant="outlined"
                name="email"
                value={userData.email}
                onChange={handleChange}></TextField>
            </StyledTableCell>
            <StyledTableCell>
                <input type="date" id="dob" name="dob" onChange={handleChange} value={formatDate(userData.dob)} style={{width: '220px', height: '50px'}}/>
            </StyledTableCell>
            <StyledTableCell>
                <Button onClick={handleSave} variant="contained">Save</Button>  
            </StyledTableCell>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
