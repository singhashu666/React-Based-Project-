import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { signinSchema } from "../schemas/Validation";
import { CircularProgress, Stack } from "@mui/material";
import FormError from "../schemas/formError";
import { NavLink, useNavigate } from "react-router-dom";
import { dispatch } from "../redux/store/store";
import {
  signInApi,
  loginResetReducer,
  startLoading,
} from "../redux/slice/SignInSlice";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


export default function SignIn() {
  const signinSlice = useSelector((state) => state.signin);
  const isLoading = signinSlice.loading;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };  

  const initialValues = {
    username: "",
    password: "",
  };
  const {
    handleBlur,
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signinSchema,
    onSubmit:async(values) => {
      try {
       await dispatch(signInApi(values));
      } catch (error) {
        dispatch(loginResetReducer());
      }
      resetForm();
    },
  });

  useEffect(() => {
    if (signinSlice.isSuccess && signinSlice.data.token) {
      const decode = jwtDecode(signinSlice.data.token);
      localStorage.setItem("token", signinSlice.data.token);
      localStorage.setItem("id",decode._id);
      localStorage.setItem("role", decode.role);
      dispatch(loginResetReducer());
    } else if (signinSlice.isError) {
      toast.error("User does not exist!", { autoClose: 1500 });
      dispatch(loginResetReducer());
    }
  }, [signinSlice.isSuccess, signinSlice.isError]);

  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  useEffect(() => {
    if (token) {
      if (role.toLocaleLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else {
      navigate("/");
    }
  }, [token, role, navigate]);
  return (
    <>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          overflowY: "hidden",
        }}
      >
        <CssBaseline />
        <Stack
          p={{ lg: 3, xs: 0 }}
          sx={{
            background: "linear-gradient( #2E3192, #23A7D1)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            objectFit: "cover",
            minHeight: "100vh",
            minWidth: "100vw",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            width={{ lg: "40%", sm: "50%", md: "70%", xs: "90%" }}
            height={{ sm: "auto", md: "auto" }}
            square
            borderRadius={{ lg: 5, xs: 0 }}
          >
            <Stack
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                width={"100%"}
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  value={values.username.trim()}
                  id="username"
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.username && touched.username && (
                  <FormError error_msg={errors.username} />
                )}
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={values.password.trim()}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                    onClick={() => handleSubmit()}
                  >
                    Sign In
                  </Button>
                )}
              </Box>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Box display={"flex"} gap={1}>
                    Don't have an account
                    <NavLink style={{ textDecoration: "none" }} to="/signup">
                      Sign up
                    </NavLink>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <ToastContainer />
    </>
  );
}
