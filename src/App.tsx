import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage/MyPage";
import LoginPage from "./pages/LoginPage";
// import { Cookies } from "react-cookie";
// import axios from "axios";
// import { useEffect } from "react";

// interface UserInfo {
//   email: string;
//   nickname: string;
//   socialType: string;
// }


function App() {

    //  쿠키에 저장된 토큰이 있는지 확인
    // const cookies = new Cookies();
    // const jwtToken = cookies.get('jwt');
    // let userInfo: UserInfo | null = null;
    // useEffect(() => {
    //   if(jwtToken) {
    //     axios.post<{email: string; nickname: string; socialType: string}>('http://localhost:8000/login/userInfo', {
    //       token: jwtToken
    //     }).then((res) => {
    //       userInfo = {
    //         email: res.data.email,
    //         nickname: res.data.nickname,
    //         socialType: res.data.socialType,
    //       };
    //       sessionStorage.setItem('userinfo', JSON.stringify(userInfo));
    //         jwt쿠키에서 뽑아낸 userInfo값을 sessionStorage에 json형식으로 저장
    //       console.log(userInfo);
    //     }).catch((error) => {
    //       sessionStorage.removeItem('userInfo')
    //       cookies.remove('jwt'); 토큰 변조시 토큰삭제해서 강제 로그아웃
    //       console.error("사용자 정보를 불러오는데 실패했습니다.", error);
    //     });
    //   } else {
    //     sessionStorage.removeItem('userInfo')
    //     console.log('토큰이 없습니다.');
    //   }
    // }, [jwtToken, cookies]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:keyword" element={<MainPage />} />
        <Route path="/myPage/:user_no" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
