import { useEffect, useState } from 'react';

function useAuth(): boolean { // 반환 타입을 boolean으로 명시
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const userInfo = sessionStorage.getItem('userinfo');
    if (userInfo) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return isLoggedIn;
}

export default useAuth;