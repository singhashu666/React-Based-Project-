// LogoutModal.js
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "1px solid #454545",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px"
};

const LogoutModal = ({ open, handleClose }) => {
    const navigate=useNavigate();
    const handleCloseModal=()=>{
 navigate("/");
//  localStorage.clear();
  localStorage.removeItem("token"); 
  localStorage.removeItem("role");
        handleClose();
    } 
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ textAlign: "center" }} id="modal-modal-title" variant="h6" component="h2">
            Do you want to logout?
          </Typography>
          <Box sx={{ mr: 2, mt: 2, display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={handleCloseModal} sx={{ ml: 2, background: "#148E9B", fontWeight: "bold" }}>Confirm</Button>
            <Button variant="contained" onClick={handleClose} sx={{ ml: 2, background: "#148E9B", fontWeight: "bold" }}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default LogoutModal;
