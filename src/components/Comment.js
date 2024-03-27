import style from '../styles/comment.module.css';
import { PropTypes } from 'prop-types';

function Comment(props) {

  Comment.propTypes = {
    comment: PropTypes.string,
    nickname: PropTypes.string,
    user_id: PropTypes.string,
  }

  return (
    <>
      <div className={style.feed_comment_box}>
        <div className={style.feed_comment_info}>
          <div className={style.feed_comment_profile}></div>
          <p className={style.feed_comment_author}>{props.nickname}</p>
          <p className={style.feed_comment_created_at}>2 days ago</p>
        </div>
        <div className={style.feed_comment_content_box}>
          <p className={style.feed_comment_content}>{props.comment}</p>
        </div>
      </div>
    </>
  )
}

export default Comment;
