import { useEffect, useState } from "react";
import Styles from "../../styles/MyFeed.module.css"; // 필요에 따라 주석 해제
import axios from "axios";
import Feed from "../../components/Feed";
import useAuth from "../../Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoVideo, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faBloggerB } from "@fortawesome/free-brands-svg-icons";

function MyPage() {
  const isLoggedIn = useAuth();
  const [feed, setFeed] = useState([]);

  const user = isLoggedIn ? JSON.parse(sessionStorage.getItem('userinfo') || '{}') : null;

  const fetchData = async () => {
    if (isLoggedIn && user?._id) {
      try {
        const response = await axios.get(`http://localhost:8000/feed/user/${user._id}`);
        setFeed(response.data);
      } catch (error) {
        console.error("피드를 불러오는 데 실패했습니다.", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoggedIn]);

  return (
    <div>
      {feed.map((item) => (
        <Feed
          key={item._id}
          feed={item}
          user={user}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  );
}

export default MyPage;
