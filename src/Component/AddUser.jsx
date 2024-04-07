import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { styled } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../App.css";
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import qs from 'query-string';


const StyledTableCell = styled(Typography)(({ theme }) => ({
    margin: theme.spacing(3),
  }));
  
export const AddUser = () => {
    const [formData, setFormData] = useState({
        name:"",
        email: "",
        dob: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const formatDate = (dateString) => {
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(() => ({
        ...formData,
        [name]: value,
        }));
      };

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost/goqii/index.php/User/createUser", qs.stringify(formData));
            alert("User Added Successfull");
            window.location.reload();
            console.log("Post created:", response.data);
          } catch (error) {
            console.error("Error creating post:", error);
          }
    }
  return (
    <div>
        <h1>Add New User</h1>
        <Box id="add-user-box">
            <StyledTableCell>
              <TextField id="outlined-basic" label="Name" variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </StyledTableCell>
            <StyledTableCell>
                <TextField id="outlined-basic" label="Email" variant="outlined"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}></TextField>
            </StyledTableCell>
            <StyledTableCell>
                <input type="date" id="dob" name="dob" onChange={handleChange} value={formatDate(formData.dob)} style={{width: '220px', height: '50px'}}/>
            </StyledTableCell>
            <StyledTableCell>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        onChange={handleChange}
                        name="password"
                        value={formData.password}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
            </StyledTableCell>
            <StyledTableCell>
                <Button onClick={handleSubmit} variant="contained">Save</Button>  
            </StyledTableCell>
        </Box>
    </div>
  )
}
