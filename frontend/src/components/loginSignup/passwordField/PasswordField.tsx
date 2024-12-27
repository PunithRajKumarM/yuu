import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { PasswordProps } from '../../../interfaces/interfaces';

// password field component
function PasswordField({
  value,
  passwordHandler,
  showPassword,
  setShowPassword,
  label,
  inputRef,
  error,
  passwordOnBlurHandler,
  helperText,
}: PasswordProps) {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel
        htmlFor="password"
        sx={{
          color: error ? 'red' : '#2d3b60', // Normal state label color
          '&.Mui-focused': {
            color: error ? 'red' : '#2d3b60', // Focus state label color
          },
        }}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        id="password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e) => passwordHandler(e.target.value)}
        onBlur={passwordOnBlurHandler}
        inputRef={inputRef}
        error={error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {!showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? 'red' : '#2d3b60', // Normal state border color
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? 'red' : '#2d3b60', // Hover state border color
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? 'red' : '#2d3b60', // Focus state border color
          },
        }}
      ></OutlinedInput>
      {helperText && (
        <FormHelperText
          sx={{
            color: error ? 'red' : '#2d3b60',
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default PasswordField;
