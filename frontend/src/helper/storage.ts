// storage helper

export function encodeToken(token: string) {
  return window.btoa(token);
}

export function decodeToken(token: string) {
  return window.atob(token);
}

export function setEncodedAccessTokenToLocal(accessToken: string) {
  return sessionStorage.setItem('accessToken', encodeToken(accessToken));
}

export function setEncodedRefreshTokenToLocal(refreshToken: string) {
  return sessionStorage.setItem('refreshToken', encodeToken(refreshToken));
}

export function getDecodedAccessTokenToLocal() {
  return decodeToken(sessionStorage.getItem('accessToken') || '');
}

export function getDecodedRefreshTokenToLocal() {
  return decodeToken(sessionStorage.getItem('refreshToken') || '');
}

export function clearToken() {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
}
