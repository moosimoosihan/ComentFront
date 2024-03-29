import { Cookies } from "react-cookie";
import useAuth from "../Auth";
import { useNavigate } from 'react-router-dom';
import styles from "../styles/header.module.css";

function Dropdown() {


  const cookies = new Cookies();
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    // 쿠키에서 JWT 토큰 삭제
    cookies.remove('jwt');
    // 세션 스토리지에서 사용자 정보 삭제
    sessionStorage.removeItem('userinfo');
    console.log('로그아웃 되었습니다.');
    alert('로그아웃')

    // = 메인페이지로 리다이렉트.. import { useNavigate } from 'react-router-dom' 필요
    window.location.reload();
  };

  let user = null;
  if (isLoggedIn) {
    user = JSON.parse(sessionStorage.getItem('userinfo') || '{}');
  }
  const goMypage = () => {
    navigate(`/mypage/${user._id}`);
  }


    return (
      <>
        <div className={styles.sideBar}>
          <li onClick={logout}>
            <div className={styles.logoutDiv}>
              <a className={styles.logout} >로그아웃</a>
            </div>
          </li>
          <li onClick={goMypage}>
            <div className={styles.mypageDiv}>
              <a className={styles.mypage} >마이페이지</a>
            </div>
          </li>
        </div>
      </>
    );
  }
  
  export default Dropdown;