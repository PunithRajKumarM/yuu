import { FormHelperText, TextField } from '@mui/material';
import React from 'react';
import './NameField.css';

export interface INameField {
  value: string;
  error: boolean;
  setName: (name: string) => void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  helperText: string;
  label: string;
  placeholder: string;
  nameOnBlurHandler?: () => void;
}

// name field component
function NameField({
  value,
  error,
  setName,
  inputRef,
  helperText,
  label,
  placeholder,
  nameOnBlurHandler,
}: INameField) {
  return (
    <div className="name-field-wrapper">
      <TextField
        id="standard-basic"
        variant="outlined"
        value={value}
        onBlur={nameOnBlurHandler}
        type="text"
        sx={{
          width: '100%',
          color: error ? 'red' : 'var(--main-color)', // Normal state label color
          '&.Mui-focused': {
            color: error ? 'red' : 'var(--main-color)', // Focus state label color
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: error ? 'red' : 'var(--main-color)', // Normal state border color
            },
            '&:hover fieldset': {
              borderColor: error ? 'red' : 'var(--main-color)', // Hover state border color
            },
            '&.Mui-focused fieldset': {
              borderColor: error ? 'red' : 'var(--main-color)', // Focus state border color
            },
          },
          '& .MuiInputLabel-root': {
            color: error ? 'red' : 'var(--main-color)', // Normal state label color
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: error ? 'red' : 'var(--main-color)', // Focus state label color
          },
        }}
        label={label}
        placeholder={placeholder}
        onChange={(e) =>
          setName(label === 'User name' ? e.target.value.toLowerCase() : e.target.value)
        }
        inputRef={inputRef}
      />
      {error && (
        <FormHelperText
          sx={{
            color: '#ff0000',
            margin: '3px 14px 0px',
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
}

export default NameField;
