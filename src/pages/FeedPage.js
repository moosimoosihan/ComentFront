import style from '../styles/FeedPage.module.css';
import Header from '../components/Header';
import Like from '../components/Like';
import Comment from '../components/Comment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FeedPage() {
  const { feed_id } = useParams();
  const [feed, setFeed] = useState();
  useEffect(() => {
    const feedData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/feed/${feed_id}`);
        setFeed(response.data);
      } catch {
        console.log("feed not exist");
      }
    }
    feedData();
  }, []);
  return (
    <>
      <Header />
      <div className={style.feed_container}>
        <div className={style.feed_content_box}>
          <div className={style.feed_author}>
            <div className={style.feed_profile_img}></div>
            <p className={style.feed_author_name}>{feed?.user_id.nickname}</p>
            <p className={style.feed_created_at}>2 hours ago</p>
          </div>
          <div className={style.feed_content}>
            <h2 className={style.feed_content_title}>{feed?.title}</h2>
            <p className={style.feed_content_text}>{feed?.content}</p>
          </div>
          <Like />
        </div>
        <div className={style.feed_comment_form}>
          
        </div>
        <div className={style.feed_comment_box}>
            {feed?.comments.map((comment) => (
              <Comment key={comment._id} comment={comment.comment} nickname={comment.user_id.nickname} user_id={comment.user_id._id} />
            ))}
        </div>
      </div>
    </>
  )
}

export default FeedPage;