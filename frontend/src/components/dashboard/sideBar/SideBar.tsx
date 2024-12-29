import { Box, Grid2 } from '@mui/material';
import { NavLink } from 'react-router';
import Logo from '../../../assets/yuu-logo.png';
import { linkData } from '../../../helper/linkData';
import { ISetCommonStyle } from '../../../interfaces/interfaces';
import React, { useContext } from 'react';
import { PostContext } from '../../../context/PostContext';

// side bar
function SideBar() {
  const { setOpen } = useContext(PostContext);
  const setCommonStyle = (i: number, a: ISetCommonStyle[]) => {
    return {
      color: 'white',
      textDecoration: 'none',
      marginTop: i === a.length - 1 ? 'auto' : '10px',
      paddingBottom: i === a.length - 1 ? '20px' : 0,
      fontSize: 'large',
      cursor: 'pointer',
    };
  };
  return (
    <Grid2
      sx={{
        backgroundColor: 'var(--main-color)',
        width: '20%',
        height: '100vh',
        position: 'sticky',
        top: 0,
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
            maxWidth: '220px',
            width: '120px',
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
          {linkData.map((d, i, a) => {
            const { label, link, post } = d;
            return (
              <React.Fragment key={i}>
                {post ? (
                  <span onClick={() => setOpen(true)} style={setCommonStyle(i, a)}>
                    {label}
                  </span>
                ) : (
                  <NavLink key={i} style={setCommonStyle(i, a)} to={link} end>
                    <span>{label}</span>
                  </NavLink>
                )}
              </React.Fragment>
            );
          })}
        </Box>
      </Box>
    </Grid2>
  );
}

export default SideBar;
