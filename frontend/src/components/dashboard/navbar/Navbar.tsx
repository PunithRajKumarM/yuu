import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  FormControl,
  Grid2,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// navbar
function Navbar() {
  return (
    <Grid2
      sx={{
        top: 0,
        right: 0,
        position: 'sticky',
        padding: '20px',
        background: '#2d3b60',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FormControl
        variant="outlined"
        sx={{
          backgroundColor: 'white',
          borderRadius: '5px',
          width: '40%',
        }}
      >
        <OutlinedInput
          id="component-outlined"
          sx={{
            height: '45px',
            backgroundColor: 'white',
            '& .MuiOutlinedInput-input': {
              padding: '0 0 0 12px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent', // Default border color
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent', // Remove focus border color
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent', // Remove hover border color
            },
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <SearchIcon sx={{ cursor: 'pointer' }} />
              </IconButton>
            </InputAdornment>
          }
          inputProps={{
            autoComplete: 'off', // Disable autofill suggestions
          }}
        />
      </FormControl>
      <NotificationsIcon sx={{ color: 'white', fontSize: '32px', cursor: 'pointer' }} />
      <AddIcon sx={{ color: 'white', fontSize: '32px', cursor: 'pointer' }} />
      <Avatar sx={{ fontSize: '32px', cursor: 'pointer' }} />
    </Grid2>
  );
}

export default Navbar;
