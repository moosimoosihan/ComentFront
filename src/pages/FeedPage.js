import style from '../styles/FeedPage.module.css';
import Header from '../components/Header';
import Like from '../components/Like';
import Comment from '../components/Comment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from 'Auth';

function FeedPage() {
  const { feed_id } = useParams();
  const [feed, setFeed] = useState();
  const isLoggedIn = useAuth();
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
            <div className={style.feed_profile_img}>
              <img className={style.profImg} src="/profile.png" width='40px' height='40px'></img>
            </div>
            <p className={style.feed_author_name}>{feed?.user_id.nickname}</p>
            <p className={style.feed_created_at}>2 hours ago</p>
          </div>
          <div className={style.feed_content}>
            <h2 className={style.feed_content_title}>{feed?.title}</h2>
            <textarea className={style.feed_content_text}>{feed?.content}</textarea>
          </div>
          {/* <Like key={feed._id} feed_id={feed._id} isLoggedIn={isLoggedIn} /> */}
        </div>
        <div className={style.feed_comment_form}>
          {/* <form onSubmit={commentSubmit} key={props.feed._id}>
            <input type="text" value={comment.comment} onChange={commentChange} name='comment' className={style.comment_box}></input>
            <input type="hidden" value={props.feed._id} name='feed_id'></input>
            <input type="hidden" value={props.feed.user_id._id} name='user_id'></input>
            <input type="submit" value="작성" className={style.commentBtn}></input>
          </form> */}
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