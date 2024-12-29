import { FormControl, OutlinedInput } from '@mui/material';
import React from 'react';

function InputField() {
  return (
    <FormControl
      variant="outlined"
      sx={{
        backgroundColor: 'white',
        borderRadius: '5px',
        width: '50%',
      }}
    >
      <OutlinedInput
        id="component-outlined"
        placeholder="Got something to share? Write it, snap it, or share it!"
        sx={{
          height: '45px',
          backgroundColor: 'white',
        }}
        inputProps={{
          autoComplete: 'off', // Disable autofill suggestions
        }}
      />
    </FormControl>
  );
}

export default InputField;
