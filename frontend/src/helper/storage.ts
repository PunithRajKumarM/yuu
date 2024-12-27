// storage helper

export function encodeToken(token: string) {
  return window.btoa(token);
}

export function decodeToken(token: string) {
  return window.atob(token);
}

export function setEncodedAccessTokenToLocal(accessToken: string) {
  return localStorage.setItem('accessToken', encodeToken(accessToken));
}

export function setEncodedRefreshTokenToLocal(refreshToken: string) {
  return localStorage.setItem('refreshToken', encodeToken(refreshToken));
}

export function getDecodedAccessTokenToLocal() {
  return decodeToken(localStorage.getItem('accessToken') || '');
}

export function getDecodedRefreshTokenToLocal() {
  return decodeToken(localStorage.getItem('refreshToken') || '');
}
