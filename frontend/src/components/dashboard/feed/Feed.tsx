import { Box, FormControl, Grid2, OutlinedInput } from '@mui/material';
import { getGreeting, nextUpdateTime } from '../../../helper/getGreeting';
import { useEffect, useState } from 'react';

// feed
function Feed() {
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGreeting(getGreeting());
    }, nextUpdateTime());

    return () => clearInterval(intervalId);
  }, [greeting]);

  return (
    <Grid2
      sx={{
        height: '100%',
        backgroundColor: 'whitesmoke',
        padding: '10px',
      }}
    >
      <Box sx={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>
        <span>{`${greeting}, Punith`}</span>
      </Box>
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '10px',
          marginTop: '10px',
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
            placeholder="What's in your mind?"
            sx={{
              height: '45px',
              backgroundColor: 'white',
            }}
            inputProps={{
              autoComplete: 'off', // Disable autofill suggestions
            }}
          />
        </FormControl>
      </Box>
    </Grid2>
  );
}

export default Feed;
