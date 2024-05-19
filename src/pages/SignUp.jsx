import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import { signupSchema } from "../schemas/Validation";
import FormError from "../schemas/formError";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { dispatch } from "../redux/store/store";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  signUpapi,
  signupResetReducer,
  startLoading,
} from "../redux/slice/SignUpSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const navigate = useNavigate();
  const signupSlice = useSelector((state) => state.signup);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleClickConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const isLoading = signupSlice.loading;
  const initialValues = {
    username: "",
    password: "",
    confirm_password: "",
    role: "",
  };
  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchema,
    onSubmit: async(values) => {
      try {
       await dispatch(signUpapi(values));
      } catch (error) {
        dispatch(signupResetReducer());
      }
      // resetForm();
    },
  });

  useEffect(() => {
    if (signupSlice.isError) {
      toast.error("User already exists!", { autoClose: 1000 });
      dispatch(signupResetReducer());
    } else if (signupSlice.isSuccess) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
      toast.success("Sign up successful!", { autoClose: 1000 });
    }
    dispatch(signupResetReducer());
  }, [signupSlice.isSuccess, signupSlice.isError]);

  return (
    <Box
      sx={{
        justifyContent: "center",
        background: "linear-gradient(80deg, #D8B5FF ,  #1EAE98)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "cover",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <>
        <Container
          component="main"
          sx={{
            padding: {
              xs: 0,
              md: 16,
            },
          }}
        >
          <CssBaseline />
          <Stack
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            width={{ lg: "45%", sm: "50%", md: "60%", xs: "100%" }}
            square
            sx={{ margin: "auto", borderRadius: "15px", opacity: ".9" }}
          >
            <Box>
              <Box display={"flex"} sx={{ justifyContent: "center" }}>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
              </Box>

              <Typography component="h1" variant="h5" textAlign={"center"}>
                Sign Up
              </Typography>
              <Stack
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1, p: 2 }}
              >
                <Box>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={values.username.trim()}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.username && touched.username && (
                    <FormError error_msg={errors.username} />
                  )}
                </Box>
                <Box width={"100%"}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={values.password.trim()}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.password && touched.password && (
                    <FormError error_msg={errors.password} />
                  )}
                </Box>
                <Box width={"100%"}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="confirm_password"
                    label=" Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm_password"
                    value={values.confirm_password.trim()}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.confirm_password && touched.confirm_password && (
                    <FormError error_msg={errors.confirm_password} />
                  )}
                </Box>
                <Box width={"100%"}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="role"
                      value={values.role}
                      label="Role"
                      onChange={handleChange}
                    >
                      <MenuItem value={"Admin"}>Admin</MenuItem>
                      <MenuItem value={"User"}>User</MenuItem>
                    </Select>
                    {errors.role && touched.role && (
                      <FormError error_msg={errors.role} />
                    )}
                  </FormControl>
                </Box>
                {isLoading ? (
                  <Box
                    display={"flex"}
                    sx={{ justifyContent: "center", mb: 2 }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                )}

                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Box display={"flex"} gap={1}>
                      Already have an account
                      <NavLink
                        style={{
                          textDecoration: "none",
                        }}
                        to="/"
                      >
                        Sign in
                      </NavLink>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </>
      <ToastContainer />
    </Box>
  );
}
