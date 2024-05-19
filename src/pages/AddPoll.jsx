import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { dispatch } from "../redux/store/store";
import { useSelector } from "react-redux";
import { addPollApi, addPollResetReducer } from "../redux/slice/AddPollSlice";
import { ToastContainer, toast } from "react-toastify";
import FormError from "../schemas/formError";
import { addPollSchema } from "../schemas/Validation";

function AddPoll() {
  const navigate = useNavigate();
  const addPollslice = useSelector((state) => state.addPoll);
  const isLoading = addPollslice.loading;
  const initialValues = {
    title: "",
  };
  const [rowData, setRowData] = useState([]);
  const addInputField = () => {
    const data = [...rowData, ""];
    setRowData(data);
  };
    const handleRemoveOption = (index) => {
    const updatedData = [...rowData];
    updatedData.splice(index, 1);
    setRowData(updatedData);
  };
  const { handleSubmit, resetForm, handleChange, values,handleBlur,errors,touched} = useFormik({
    initialValues: initialValues,
    validationSchema: addPollSchema,
    onSubmit: async (values) => {
      try {
        if (values.title.trim() !== "") {
          if (values.option1.trim() !== "" && values.option2.trim() !== "") {
            await dispatch(addPollApi(values));
            setTimeout(() => {
              navigate("/admin");
            }, 200);
          } else {
            toast.warning("Please enter options", { autoClose: 1000 });
          }
        } else {
          dispatch(addPollResetReducer());
          toast.warning("Please enter title and options", { autoClose: 1000 });
          addPollResetReducer();
        }
      } catch (e) {
        console.log(e, "error");
      }
      resetForm();
    },
  });

  const handleCancel = () => {
    navigate("/admin");
  };
  useEffect(() => {
    if (addPollslice.isSuccess) {
      navigate("/admin");
    } else if (addPollslice.isError) {
      toast.error("Error occurred while adding poll.", { autoClose: 1500 });
    }
  }, [addPollslice.isSuccess, addPollslice.error]);
  return (
    <Box sx={{ background: "linear-gradient(80deg, #764BA2 ,#667EEA)" }} p={2}>
      <Stack minHeight={"100vh"} sx={{ overflowY: "auto" }}>
        <Card
          sx={{ minWidth: 290, width: "35%", margin: "auto", borderRadius: 5 }}
        >
          <CardContent>
            <Stack
              direction={"column"}
              spacing={2}
              as="form"
              onSubmit={handleSubmit}
            >
              <Typography sx={{ textAlign: "center" }} variant="h4">
                Add Poll
              </Typography>
              <Box>
                <TextField
                  variant="outlined"
                  label="Title"
                  name="title"
                  id="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
                 {errors.title && touched.title && (
                  <FormError error_msg={errors.title} />
                )}
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  label="Option1"
                  name="option1"
                  value={values.option1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
                 {errors.option1 && touched.option1 && (
                  <FormError error_msg={errors.option1} />
                )}
              </Box>

              <Box>
                <TextField
                  variant="outlined"
                  label="Option2"
                  name="option2"
                  onBlur={handleBlur}
                  value={values.option2}
                  onChange={handleChange}
                  fullWidth
                />
                   {errors.option2 && touched.option2 && (
                  <FormError error_msg={errors.option2} />
                )}
              </Box>

              {rowData.map((data, index) => (
                  <TextField
                    key={index}
                    onChange={handleChange}
                    variant="outlined"
                    value={values.name}
                    onBlur={handleBlur}
                    label={`Option${index + 3}`}
                    name={`option${index + 3}`}
                    fullWidth
                  />
              ))}

              <Box>
                {rowData.length < 2 && (
                  <Button
                    variant="contained"
                    sx={{ background: "#08879C" }}
                    onClick={addInputField}
                  >
                    Add Option
                  </Button>
                )}
              </Box>

              {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Button
                  variant="contained"
                  sx={{ background: "#08879C" }}
                  type="submit"
                >
                  Submit
                </Button>
              )}

              <Button
                variant="contained"
                sx={{ background: "#08879C" }}
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
      <ToastContainer />
    </Box>
  );
}

export default AddPoll;