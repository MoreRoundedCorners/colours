import { Box, Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import React from "react";
import AddressForm from "./AddressForm";

const Shipping = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  return (
    <Box m="30px auto">
      {/* billing form */}
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ mb: "15px" }}
          fontSize="18px"
        >
          Billing Details
        </Typography>
        <AddressForm
          values={values.billingAddress}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          type="billingAddress"
        ></AddressForm>
      </Box>
      <Box mb="20px">
        <FormControlLabel
          label="Same for Shipping Address"
          control={
            <Checkbox
              defaultChecked
              values={values.shippingAddress.isSameAddress}
              onChange={() =>
                setFieldValue(
                  "shippingAddress.isSameAddress",
                  !values.shippingAddress.isSameAddress
                )
              }
            />
          }
        />
      </Box>

      {/* shipping form */}
      {!values.shippingAddress.isSameAddress && (
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mb: "15px" }}
            fontSize="18px"
          >
            Shipping Details
          </Typography>
          <AddressForm
            values={values.shippingAddress}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            type="shippingAddress"
          ></AddressForm>
        </Box>
      )}
    </Box>
  );
};

export default Shipping;
