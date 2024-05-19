import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { dispatch } from "../redux/store/store";
import { CircularProgress, Stack, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { AddOptionApi, addOptionResetReducer } from "../redux/slice/AddOptionSlice";
import { useSelector } from "react-redux";
import { AddOptionSchema } from "../schemas/Validation";
import FormError from "../schemas/formError";

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

export default function AddOptionModal({
  addOptionOpen,
  handleAddOptionClose,
  addOptionId
}) {
 const isLoading=useSelector((state)=>state.addOption.loading);
  const initialValues = {
    option: "",
  };
  const { values, handleChange, handleSubmit,errors,handleBlur,touched,resetForm} = useFormik({
    initialValues: initialValues,
    validationSchema:AddOptionSchema,
    onSubmit: (values) => {
      const id = addOptionId;
      const option = values.option.trim();
      if (option) {
        const data = { id, option };
        dispatch(AddOptionApi(data));
        setTimeout(() => {
         handleAddOptionClose();
        }, 200);
      } else {
        toast.error("Please enter option value", { autoClose: 1000 });
        resetForm();
        console.log("Reset value");
        dispatch(addOptionResetReducer());
      }
      dispatch(addOptionResetReducer());
      // resetForm();
    },
  });

  return (
    <div>
      <Modal
        open={addOptionOpen}
        onClose={handleAddOptionClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <Stack direction={"column"} spacing={2} className="form_container">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontSize: "36px",
                color: "#255470",
                textAlign: "center",
              }}
            >
              Add Option Here
            </Typography>
            <TextField
              label={"Option"}
              name="option"
              value={values.option}
              onBlur={handleBlur}
              onChange={handleChange}
            />
             {errors.option && touched.option && (
                  <FormError error_msg={errors.option} />
                )}

            {isLoading ? (
              <Box display={"flex"} sx={{justifyContent:"center"}}><CircularProgress color="primary" /></Box>
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
                variant="contained"
                onClick={()=>handleAddOptionClose()}
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
