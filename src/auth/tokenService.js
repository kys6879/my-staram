// 토큰 검증
import jwtDecode from 'jwt-decode';


export function getCurrentUser(){
    const jwt = localStorage.getItem('token');
    // jwt가 없으면
    if (!jwt) {
        return undefined;
    }
    try {
        const decodedToken = jwtDecode(jwt);
        return decodedToken;
    } catch(error) {
        return undefined;
    }
}
// 로컬 스토리지에 저장된 토큰이 유효한지 판별
export function isValidJwt() {

    const decodedToken = getCurrentUser();
    if (decodedToken === undefined) {
        return false;
    }
    // 유효기간 체크
    if (decodedToken.exp < Date.now() / 1000) {
        return false;
    }
    return true;
}

