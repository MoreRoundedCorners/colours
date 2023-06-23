import { Box, TextField, useMediaQuery } from "@material-ui/core";

import { getIn } from "formik";
import React from "react";

const AddressForm = ({
  values,
  type,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const formattedName = (field) => {
    `${type}.${field}`;
  };

  const formattedError = (field) => {
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );
  };

  const formattedHelperText = (field) => {
    getIn(touched, formattedName(field)) &&
      getIn(errors, formattedName(field)) &&
      getIn(errors, formattedName(field));
  };

  return (
    <Box
      display="grid"
      gap="15px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? "undefined" : "span 4" },
      }}
    >
      <TextField
        fullWidth
        type="text"
        label="First Name"
        name={formattedName("firstName")}
        // value={values.firstName}
        error={formattedError("firstName")}
        helperText={formattedHelperText("firstName")}
        // onBlur={handleBlur}
        // onChange={handleChange}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Last Name"
        name={formattedName("lastName")}
        // value={values.lastName}
        error={formattedError("lastName")}
        helperText={formattedHelperText("lastName")}
        onBlur={handleBlur}
        onChange={handleChange}
        sx={{ gridColumn: "span 2" }}
      />
    </Box>
  );
};

export default AddressForm;
