import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MainPage from './pages/MainPage';
import UploadFeedPage from './pages/UploadFeedPage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';
import { Cookies } from "react-cookie";
import axios from "axios";
import { useEffect } from "react";

function App() {
  // 쿠키에 저장된 토큰이 있는지 확인
  const cookies = new Cookies();
  const jwtToken = cookies.get('jwt');
  let user = null;
  useEffect(() => {
    if(jwtToken) {
      user = axios.post('http://localhost:8000/login/userInfo',{
        token: jwtToken
      }).then((res) => {
        return res.data;
      });
      console.log(user);
    } else {
        console.log('토큰이 없습니다.');
    }
  }, []);
  
  return <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/:keyword" element={<MainPage />} />
      <Route path="/uploadFeed" element={<UploadFeedPage />} />
      <Route path="/myPage/:user_no" element={<MyPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </Router>;
}

export default App;
