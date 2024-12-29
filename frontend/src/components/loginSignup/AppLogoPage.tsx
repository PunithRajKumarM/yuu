import { Grid2 } from '@mui/material';
import Logo from '../../assets/yuu-logo.png';

// app logo component
function AppLogoPage() {
  return (
    <Grid2
      size={{ xs: 12, md: 12, lg: 6 }}
      sx={{
        backgroundColor: 'var(--main-color)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: { xs: '30%', md: '30%', lg: '100%' },
        order: { xs: 1, md: 1, lg: 0 },
      }}
    >
      <img
        src={Logo}
        alt="Logo"
        style={{
          maxWidth: '300px',
          width: '200px',
        }}
      />
    </Grid2>
  );
}

export default AppLogoPage;
