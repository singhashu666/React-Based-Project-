import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { dispatch } from "../redux/store/store";
import { DeletePollApi } from "../redux/slice/DeletePollSlice";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

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
  borderRadius:"10px"
};

export default function DeleteModal({ open,deleteId,handleClose}) {
  const isloading=useSelector((state)=>state.deletePoll.loading);
 const  handleDelete= async(id)=>{
  await dispatch(DeletePollApi(id));
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
          <Typography sx={{textAlign:"center"}} id="modal-modal-title" variant="h6" component="h2">
            Do you want to delete this poll?
          </Typography>
          <Box sx={{ mr: 2, mt: 2, display:"flex",justifyContent:"center"}}>
            {" "}
            {
              isloading?<CircularProgress/>:<Button variant="contained" onClick={()=>handleDelete(deleteId)} sx={{background:"red",fontWeight:"bold"}}>Confirm</Button>
            }
            
            <Button variant="contained" onClick={()=>handleClose()} sx={{ml:2,background:"#148E9B",fontWeight:"bold"}}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
