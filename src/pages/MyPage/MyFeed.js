import { useEffect, useState } from "react";
// import Styles from "../../styles/MyFeed.module.css";
import axios from "axios";
import Feed from "../../components/Feed";
import useAuth from "../../Auth";

function MyPage() {
  const isLoggedIn = useAuth();
  const [feed, setFeed] = useState([]);

  const user = isLoggedIn ? JSON.parse(sessionStorage.getItem('userinfo') || '{}') : null;

  const fetchData = async () => {
    if (isLoggedIn && user?._id) {
      const response = await axios.get(`http://localhost:8000/feed/user/${user._id}`);
      setFeed(response.data);
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
          feed_id={item._id}
          nickname={item.user_id.nickname}
          content={item.content}
          title={item.title}
          user_id={item.user_id._id}
        />
      ))}
    </div>
  );
}

export default MyPage;
