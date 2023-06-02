import jwt_decode from 'jwt-decode';

export function decodeJwt() {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
        return null;
    }
    return jwt_decode(jwt);
}

export function isValidJwt() {
    try {
      const decoded = decodeJwt();
      const currentTime = Date.now() / 1000;

      // JWT의 만료 시간 확인
      if (decoded.exp < currentTime) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
}