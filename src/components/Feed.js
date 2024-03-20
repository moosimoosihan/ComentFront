import style from '../styles/Feed.module.css';
import { PropTypes } from 'prop-types';
import useAuth from "../Auth";
import axios from 'axios';
import { BiEdit } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Like from './Like';
import { useEffect, useState } from 'react';

function Feed(props) {
    Feed.propTypes = {
        feed_id: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        user_id: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired
    }

    const [commentView, setCommentView] = useState(false);
    const [comment, setComment] = useState({
        comment: '',
    });
    const [countComment, setCountComment] = useState(0)

    const commentChange = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value,
        });
    }

    const commentSubmit = async (e) => {
        e.preventDefault();

        const commentData = {
            comment: comment.comment,
            user_id: props.user_id,
            feed_id: props.feed_id,
        };

        if (!isLoggedIn) {
            alert("로그인 후 이용가능합니다");
            return false;
        }

        console.log(commentData);

        await axios
            .post("http://localhost:8000/comment", commentData)
            .then((response) => {
                if (response.status === 201) {
                    alert("comment upload success");
                }
            })
            .catch(() => {
                alert("comment upload failed");
            });
    }

    const commentClick = () => {
        const commentBtn = document.querySelector('.comment');
        if (commentView === false) {
            setCommentView(true);
        } else {
            setCommentView(false);
        }
    };

    const commentCount = async () => {
        const response = await axios.get(`http://localhost:8000/comment/count/${props.feed_id}`)
            .catch((err) => {
                console.log(err);
            });
        setCountComment(response.data);
        console.log(response);
    }

    useEffect(() => {
        commentCount();
    }, [])

    let user = null;
    const isLoggedIn = useAuth();
    if (isLoggedIn) {
        user = JSON.parse(sessionStorage.getItem('userinfo') || '{}');
    }


    async function deleteFeed() {
        // 삭제 여부 확인
        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8000/feed/${props.feed_id}/delete`);
            // 삭제 성공시 페이지 리로드
            if (response.data) {
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    }
    const [edit, setEdit] = useState(false);
    const [t,setT] = useState(props.title);
    const [c,setC] = useState(props.content);
    function editFeed(bool) {
        if(bool === false){
            setT(props.title);
            setC(props.content);
        }
        setEdit(bool);
    }
    function submitFeed() {
        if (t === '') {
            alert('제목을 입력해주세요.');
            return;
        }
        if (c === '') {
            alert('내용을 입력해주세요.');
            return;
        }
    }

    return (<>
        <div className={style.feed_container}>
            <div className={style.feed}>
                <div className={style.profile}></div>
                <p className={style.username}>{props.nickname} ㆍ 1days ago</p>
                {edit?(
                    <form method='post' action={`http://localhost:8000/feed/${props.feed_id}`} onSubmit={submitFeed}>
                        <input type="hidden" name="user_id" value={user._id} />
                        <input type="hidden" name="category" value={props.category} />
                        <input className={style.title} type="text" name="title" value={t} onChange={(e)=>{setT(e.target.value)}} />
                        <input className={style.content} type="textarea" name="content" value={c} onChange={(e)=>{setC(e.target.value)}} />
                        <button onClick={()=>{editFeed(false)}}>취소</button>
                        <input type="submit" value="수정하기" />
                    </form>
                ):(
                    <>
                        <h1 className={style.title}>{props.title}</h1>
                        <p className={style.content}>{props.content}</p>
                    </>
                )}
                <div className={style.other_container}>
                    <div className={style.like_box}>
                        <Like key={props.feed_id} feed_id={props.feed_id} isLoggedIn={isLoggedIn} />
                    </div>
                    <a className={style.comment} onClick={commentClick}><FaRegCommentAlt />{countComment}</a>
                    {user && user._id === props.user_id ? (
                    <a className={style.comment} onClick={commentClick}><FaRegCommentAlt />1.4k</a>
                    {!edit && user && user._id === props.user_id ? (
                        <div className={style.deledit}>
                            <button className={style.delete} onClick={deleteFeed}><MdDeleteForever /></button>
                            <button className={style.edit} onClick={()=>{editFeed(true)}}><BiEdit /></button>
                        </div>
                    ) : null}
                </div>
                <div style={{ display: commentView ? 'block' : 'none' }}>
                    <form onSubmit={commentSubmit} key={props.feed_id}>
                        <input type="text" value={comment.comment} onChange={commentChange} name='comment' className={style.comment_box}></input>
                        <input type="hidden" value={props.feed_id} name='feed_id'></input>
                        <input type="hidden" value={props.user_id} name='user_id'></input>
                        <input type="submit" value="작성" className={style.commentBtn}></input>
                    </form>
                </div>
            </div>
        </div>
    </>);
}

export default Feed;
