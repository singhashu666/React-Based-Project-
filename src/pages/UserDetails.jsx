import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Table from "../components/UserDetailsTable";
import { userApi } from "../redux/slice/UserDetailsSlice";

function UserDetails() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    userApi()
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);
  return (
    <Box sx={{background:
      "linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",height:"100vh" ,width:'100'}}>
      {loading ? (
        <Box
          display={"flex"}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            background:
              "linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",
            height: "100%",
         
          }}
        >
          <CircularProgress sx={{ color: "#ffffff" }} />
        </Box>
      ) : (
        <Stack
          sx={{
            background:
              "linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",
            width: "100%",
               overflowX:{lg:0,md:0,sm:"auto"}
          }}
        >
          <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to={"/admin"}
          >
            <Button
              variant="contained"
              sx={{ ml: 2,mb:1, fontWeight: "bold", background: "#108FB3" }}
            >
              Go Back
            </Button>
          </NavLink>
          <Table />
        </Stack>
      )}
    </Box>
  );
}

export default UserDetails;
