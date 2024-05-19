import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { dispatch } from "../redux/store/store";
import { CircularProgress, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { EditPollApi } from "../redux/slice/TitleEditSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #454545",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ editOpen,handleEditClose,editId,title}) {
  const [isLoading, setIsLoading] = React.useState(false);
//  const  handleModalEdit= async(editId)=>{
//       handleEditClose();
//     //  await dispatch(DeletePollApi(id));
//   }
const formik = useFormik({
  initialValues: {
    title:title,
  },
  onSubmit:async(values)=>{
   try{
      const trimmedTitle = values.title.trim();
      if(values.title.trim()!== ""){
         if (title) {
          const id=editId;
          const updatedData=trimmedTitle;
          setIsLoading(true);
           await dispatch(EditPollApi(id,updatedData));
          setIsLoading(false);
          setTimeout(() => {
            handleEditClose();
          }, 200);
         }
         else{
          dispatch(resetReducer());
          toast.warning("Please enter  title");
         }
      }
   }catch(error){
       console.error("Error:", error);
       setIsLoading(false);
   } 
  }
});
React.useEffect(() => {
  formik.setValues((prevValues) => ({
    ...prevValues,
    title: title || '', 
  }));
}, [title]); 

  return (
    <div>
      <Modal
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want to edit this poll?
          </Typography>
          <Box sx={{ mr: 2, mt: 2 }}>
            {" "}
            <Button variant="contained" onClick={()=>handleModalEdit(editId)} sx={{background:"red",fontWeight:"bold"}}>Edit</Button>{" "}
            <Button variant="contained" onClick={()=>handleEditClose()} sx={{ml:2,background:"#148E9B",fontWeight:"bold"}}>Cancel</Button>
          </Box> */}
           <form onSubmit={formik.handleSubmit}>
          <Stack direction={"column"} spacing={2} className="form_container">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                // fontStyle: "italic",
                // fontFamily:"Roboto",
                fontSize: "36px",
                color: "#255470",
                // textDecoration: "underline",
                textAlign: "center",
              }}
            >
              Update title Here
            </Typography>
            <TextField
              label={"Title"}
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {isLoading ? (
              <Box sx={{display:'flex',justifyContent:'center'}}><CircularProgress color="primary" /></Box>
            ) : (
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",
                  "&:hover": {
                    background: "rgb(3, 195, 195)",
                  },
                }}
              >
                Update
              </Button>
            )}
              <Button
                sx={{
                  background:
                    "linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",
                  "&:hover": {
                    background: "rgb(3, 195, 195)",
                  },
                  width: "100%",
                }}
                onClick={()=>handleEditClose()}
                variant="contained"
              >
                Cancel
              </Button>
          </Stack>
        </form>
        </Box>
      </Modal>
    </div>
  );
}
