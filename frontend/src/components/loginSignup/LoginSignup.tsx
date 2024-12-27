import { Grid2 } from '@mui/material';
import AppLogoPage from './AppLogoPage';
import LoginSignupForm from './LoginSignupForm';

// login signup component
function LoginSignup() {
  return (
    <Grid2
      container
      sx={{
        height: '100vh',
      }}
    >
      <LoginSignupForm />
      <AppLogoPage />
    </Grid2>
  );
}

export default LoginSignup;
