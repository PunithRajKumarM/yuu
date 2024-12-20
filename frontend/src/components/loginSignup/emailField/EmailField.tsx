import { FormHelperText, TextField } from '@mui/material';
import './EmailField.css';
import { EmailProps } from '../../../interfaces/interfaces';

// email field component
function EmailField({
  email,
  setEmail,
  inputRef,
  error,
  emailOnBlurHandler,
  helperText,
}: EmailProps) {
  return (
    <div className="email-field-wrapper">
      <TextField
        id="standard-basic"
        inputRef={inputRef}
        type="email"
        label="Email"
        value={email}
        error={error}
        onChange={(e) =>
          setEmail((pre) => ({
            ...pre,
            value: e.target.value.trim(),
          }))
        }
        onBlur={emailOnBlurHandler}
        variant="outlined"
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: error ? 'red' : '#2d3b60', // Normal state border color
            },
            '&:hover fieldset': {
              borderColor: error ? 'red' : '#2d3b60', // Hover state border color
            },
            '&.Mui-focused fieldset': {
              borderColor: error ? 'red' : '#2d3b60', // Focus state border color
            },
          },
          '& .MuiInputLabel-root': {
            color: error ? 'red' : '#2d3b60', // Normal state label color
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: error ? 'red' : '#2d3b60', // Focus state label color
          },
        }}
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

export default EmailField;