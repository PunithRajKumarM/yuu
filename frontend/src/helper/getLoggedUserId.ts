import { jwtDecode } from 'jwt-decode';
import { getDecodedAccessTokenToLocal } from './storage';
import { IJWTDecodedToken } from '../interfaces/interfaces';

// get logged user ID
export const getLoggedUserId = () => {
  const accessToken = getDecodedAccessTokenToLocal();
  const decodedToken: IJWTDecodedToken = jwtDecode(accessToken);

  const userId = decodedToken.id;

  return userId;
};
