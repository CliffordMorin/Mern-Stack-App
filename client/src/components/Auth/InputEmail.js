import React from "react";
import { TextField, Grid } from "@material-ui/core";

const InputEmail = ({
  name,
  label,
  type,
  handleChangeEmail,
  half,
  autoFocus,
  error,
  helperText,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChangeEmail}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        error={error}
        helperText={helperText}
      />
    </Grid>
  );
};

export default InputEmail;
