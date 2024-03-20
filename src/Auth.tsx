import { useEffect, useState } from 'react';
import { Cookies } from "react-cookie";

function useAuth(): boolean { // 반환 타입을 boolean으로 명시
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const cookies = new Cookies();
  const jwtToken = cookies.get('jwt');
  useEffect(() => {
    if (jwtToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return isLoggedIn;
}

export default useAuth;