import { Box, Grid2 } from '@mui/material';
import { NavLink } from 'react-router';
import Logo from '../../../assets/yuu-logo.png';
import { linkData } from '../../../helper/linkData';

// side bar
function SideBar() {
  return (
    <Grid2
      sx={{
        backgroundColor: '#2d3b60',
        width: '20%',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          flexWrap: 'wrap',
          height: '100%',
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{
            maxWidth: '200px',
            width: '100px',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            flexWrap: 'wrap',
            flexGrow: 1,
          }}
        >
          {linkData.map((d, i, a) => (
            <NavLink
              key={i}
              style={{
                color: 'white',
                textDecoration: 'none',
                marginTop: i === a.length - 1 ? 'auto' : '10px',
                paddingBottom: i === a.length - 1 ? '20px' : 0,
              }}
              to={d.link}
              end
            >
              <span>{d.label}</span>
            </NavLink>
          ))}
        </Box>
      </Box>
    </Grid2>
  );
}

export default SideBar;
