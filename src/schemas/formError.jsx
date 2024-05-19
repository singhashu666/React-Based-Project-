import { Box } from "@mui/material";
import React from "react";

const FormError = ({ error_msg }) => {
  return (
    <>
      <Box
        className="form-error"
        sx={{
          color: "	#FF0000",
          ml: "16px",
          fontStyle: "italic",
          fontSize: "13px",
        }}
      >
        {error_msg}
      </Box>
    </>
  );
};
export default FormError;
