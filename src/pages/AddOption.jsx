import React, { useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddOptionApi } from "../redux/slice/AddOptionSlice";
import { addPollResetReducer } from "../redux/slice/AddPollSlice";
import { addPollSchema } from "../schemas/Validation";

const AddOption = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const addOptiondata = useSelector((state) => state.addOption);
  const isLoading = addOptiondata.loading;
  useEffect(() => {
    if (addOptiondata && addOptiondata.isSuccess) {
      toast.success("Option added successfully", { autoClose: 1000 });
    } else if (addOptiondata && addOptiondata.isError) {
      toast.success("Option not added successfully", { autoClose: 1000 });
    }
  }, [addOptiondata.isSuccess]);

  const initialValues = {
    option: "",
    id: location.state.id,
  };
  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
      const id = values.id;
      const option = values.option.trim();
      if (option) {
        const data = { id, option };
        dispatch(AddOptionApi(data));
        setTimeout(() => {
          navigate("/admin");
        }, 200);
      } else {
        toast.error("Please enter option value", { autoClose: 1000 });
        dispatch(addPollResetReducer());
      }
      dispatch(addPollResetReducer());
      resetForm();
    },
  });
  
  return (
    <Box
      sx={{
        background:
          "linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",
        height: "100vh",
        padding: "20px",
      }}
    >
      <Box
        className="formBodyStyle"
        sx={{
          width: 500,
          marginX: "auto",
          background: "white",
          padding: 4,
          borderRadius: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack direction={"column"} spacing={2} className="form_container">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: "36px",
                color: "#255470",
                textDecoration: "underline",
                textAlign: "center",
              }}
            >
              Add Option Here
            </Typography>
            <TextField
              label={"Option"}
              name="option"
              value={values.title}
              onChange={handleChange}
            />
            {isLoading ? (
              <CircularProgress color="primary" />
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
            <NavLink to={"/admin"} width="100%">
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
              >
                Cancel
              </Button>
            </NavLink>
          </Stack>
        </form>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default AddOption;
