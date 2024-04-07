import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./App.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import axios from "axios";
import { ModalComponent } from "./Component/ModalComponent";
import { AddUser } from "./Component/AddUser";

function App() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [userData, setUserData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [show, setShow] = useState(true);
  const getAllUserData = async () => {
    await axios
      .get("http://localhost/goqii/index.php/User/getAllUsers")
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log("Error getting data:", err);
      });
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(
        `http://localhost/goqii/index.php/User/deleteUser/${id}`
      );
      alert("User Deleted Successfully");
      getAllUserData();
      console.log("Post deleted:", id);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  return (
    <div className="App">
      {show ? (
        <div>
          <h1>Employees Data</h1>
          <Button
            variant="contained"
            id="cu_btn"
            onClick={() => setShow(!show)}
          >
            Create New User
          </Button>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead component={Paper}>
                <TableRow>
                  <StyledTableCell align="center">UserID</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">DOB</StyledTableCell>
                  <StyledTableCell align="center">Edit User</StyledTableCell>
                  <StyledTableCell align="center">Delete User</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData?.map((row) => (
                  <StyledTableRow key={row.user_id}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.user_id}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.dob}</StyledTableCell>
                    <StyledTableCell align="center">
                      <EditIcon
                        className="editIcon"
                        sx={{ color: "green" }}
                        onClick={() => handleEditUser(row)}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <DeleteIcon
                        className="deleteIcon"
                        sx={{ color: "red" }}
                        onClick={() => handleDeleteUser(row.user_id)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ModalComponent
            updateUser={getAllUserData}
            user={selectedUser}
            open={open}
            onClose={handleClose}
          />
        </div>
      ) : (
        <AddUser show={show} />
      )}
    </div>
  );
}

export default App;
