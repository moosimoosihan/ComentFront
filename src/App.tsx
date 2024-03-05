import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import UploadFeedPage from "./pages/UploadFeedPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/uploadFeed" element={<UploadFeedPage />} />
        <Route path="/myPage/:user_no" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
