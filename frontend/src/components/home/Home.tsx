import { useQuery } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { getDecodedAccessTokenToLocal } from '../../helper/storage';
import { IJWTDecodedToken } from '../../interfaces/interfaces';
import { GET_USER } from '../../queries/queries';
import { addLoggedUserData } from '../../store/reducers/loggedUserDataSlice';
import { TGetUser } from '../../types/types';
import LoginSignup from '../loginSignup/LoginSignup';

// home component
function Home() {
  const { isLoggedIn } = useContext(AuthenticationContext);
  const isAuthenticated = getDecodedAccessTokenToLocal();
  const navigate = useNavigate();
  const accessToken = getDecodedAccessTokenToLocal();
  const decodedToken: IJWTDecodedToken = jwtDecode(accessToken);
  const userId = decodedToken.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, [isAuthenticated]);

  const { data: loggedUserData } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId,
    fetchPolicy: 'cache-first',
  });

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
      {!isLoggedIn && !isAuthenticated && <LoginSignup />}
      {isAuthenticated && <Outlet />}
    </>
  );
}

export default Home;
