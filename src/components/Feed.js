import style from '../styles/Feed.module.css';
import { PropTypes } from 'prop-types';
import useAuth from "../Auth";
import axios from 'axios';
import { BiEdit } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Like from './Like';

function Feed(props) {
    Feed.propTypes = {
        feed_id: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        user_id: PropTypes.string.isRequired
    }
    
    let user = null;
    const isLoggedIn = useAuth();
    if(isLoggedIn){
        user = JSON.parse(sessionStorage.getItem('userinfo') || '{}');
    }

    async function deleteFeed(){
        // 삭제 여부 확인
        if(!window.confirm('정말 삭제하시겠습니까?')){
            return;
        }
         try{
            const response = await axios.post(`http://localhost:8000/feed/${props.feed_id}/delete`);
            // 삭제 성공시 페이지 리로드
            if(response.data){
                window.location.reload();
            }
         }catch(e){
            console.log(e);
        }
    }
    function editFeed(){
        window.location.href = `/editFeed/${props.feed_id}`;
    }
    

    return (<>
        <div className={style.feed_container}>
            <div className={style.feed}>
                <div className={style.profile}></div>
                <p className={style.username}>{props.nickname} ㆍ 1days ago</p>
                <h1 className={style.title}>{props.title}</h1>
                <p className={style.content}>{props.content}</p>
                <div className={style.other_container}>
                    <div className={style.like_box}>
                        <Like feed_id={props.feed_id} />
                    </div>
                    <button className={style.comment}><FaRegCommentAlt />1.4k</button>
                    {user && user._id === props.user_id ? (
                        <div className={style.deledit}>
                            <button className={style.delete} onClick={deleteFeed}><MdDeleteForever /></button>
                            <button className={style.edit} onClick={editFeed}><BiEdit /></button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    </>);
}

export default Feed;
