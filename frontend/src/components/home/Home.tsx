import { useQuery } from '@apollo/client';
import { Backdrop, CircularProgress } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { getLoggedUserId } from '../../helper/getLoggedUserId';
import { getDecodedAccessTokenToLocal } from '../../helper/storage';
import { GET_USER } from '../../queries/queries';
import { addLoggedUserData } from '../../store/reducers/loggedUserDataSlice';
import { TGetUser } from '../../types/types';
import CreatePost from '../dashboard/createPost/CreatePost';
import LoginSignup from '../loginSignup/LoginSignup';

// home component
function Home() {
  const { isLoggedIn } = useContext(AuthenticationContext);
  const isAuthenticated = getDecodedAccessTokenToLocal();
  const navigate = useNavigate();
  const userId = getLoggedUserId();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/dashboard');
  //   } else {
  //     navigate('/');
  //   }
  // }, [isAuthenticated]);

  const {
    data: loggedUserData,
    loading: loggedUserDataLoading,
    error: loggedUserDataError,
  } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId,
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (loggedUserDataError) {
      const { message } = loggedUserDataError;
      enqueueSnackbar(message, { variant: 'error' });
    }
  }, [loggedUserDataError]);

  useEffect(() => {
    if (loggedUserData as TGetUser) {
      const { get_user } = loggedUserData;
      const { user } = get_user;
      const loggerUser = {
        email: user.email,
        userName: user.userName,
        fullName: user.fullName,
      };
      dispatch(addLoggedUserData(loggerUser));
    }
  }, [loggedUserData]);

  return (
    <>
      {<CreatePost />}
      {loggedUserDataLoading && (
        <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={loggedUserDataLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {!isLoggedIn && !isAuthenticated && <LoginSignup />}
      {isAuthenticated && <Outlet />}
    </>
  );
}

export default Home;
