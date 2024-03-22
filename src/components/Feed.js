import style from '../styles/Feed.module.css';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { BiEdit } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Like from './Like';
import { useEffect, useState } from 'react';

function Feed(props) {
    Feed.propTypes = {
        feed: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        isLoggedIn: PropTypes.bool.isRequired
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
            user_id: props.feed.user_id,
            feed_id: props.feed._id,
        };

        if (!props.isLoggedIn) {
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
        const response = await axios.get(`http://localhost:8000/comment/count/${props.feed._id}`)
            .catch((err) => {
                console.log(err);
            });
        setCountComment(response.data);
    }

    useEffect(() => {
        commentCount();
    }, []);

    async function deleteFeed() {
        // 삭제 여부 확인
        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8000/feed/${props.feed._id}/delete`);
            // 삭제 성공시 페이지 리로드
            if (response.data) {
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    }
    const [edit, setEdit] = useState(false);
    const [t,setT] = useState(props.feed.title);
    const [c,setC] = useState(props.feed.content);
    function editFeed(bool) {
        if(bool === false){
            setT(props.feed.title);
            setC(props.feed.content);
        }
        setEdit(bool);
    }
    async function submitFeed(e) {
        e.preventDefault();

        if (t === '') {
            alert('제목을 입력해주세요.');
            return;
        }
        if (c === '') {
            alert('내용을 입력해주세요.');
            return;
        }

        await axios.post(`http://localhost:8000/feed/${props.feed._id}`, {
            user_id: props.user._id,
            title: t,
            category: props.feed.category,
            content: c
        }).then((response) => {
            if (response.status === 200) {
                props.feed.title = t;
                props.feed.content = c;
                editFeed(false);
            }
        }).catch(() => {
            alert('수정 실패');
        });
    }

    // 경과 시간
    const now = new Date();
    const created = new Date(props.feed.createdAt);
    const diff = now - created;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diff % (1000 * 60)) / 1000);
    let timetText = '';
    if(diffDays > 0){
        timetText = `${diffDays} days ago`;
    } else if(diffHours > 0){
        timetText = `${diffHours} hours ago`;
    } else if(diffMinutes > 0){
        timetText = `${diffMinutes} minutes ago`;
    } else {
        timetText = `${diffSeconds} seconds ago`;
    }

    return (<>
        <div className={style.feed_container}>
            <div className={style.feed}>
                <div className={style.profile}></div>
                <p className={style.username}>{props.feed.user_id.nickname} ㆍ {timetText}</p>
                {edit?(
                    <form method='post' onSubmit={submitFeed}>
                        <input type="hidden" name="user_id" value={props.feed.user_id} />
                        <input type="hidden" name="category" value={props.feed.category} />
                        <input className={style.editTitle} type="text" name="title" value={t} onChange={(e)=>{setT(e.target.value)}} /><br/>
                        <textarea className={style.content} name="content" value={c} onChange={(e)=>{setC(e.target.value)}} />
                        <input className={style.editSubmitBtn} type="submit" value="Edit" />
                        <button className={style.editCancelBtn} onClick={()=>{editFeed(false)}}>Cancel</button>
                    </form>
                ):(
                    <>
                        <h1 className={style.title}>{props.feed.title}</h1>
                        <p className={style.content}>{props.feed.content}</p>
                    </>
                )}
                <div className={style.other_container}>
                    <div className={style.like_box}>
                        <Like key={props.feed._id} feed_id={props.feed._id} isLoggedIn={props.isLoggedIn} />
                    </div>
                    <a className={style.comment} onClick={commentClick}><FaRegCommentAlt />{countComment}</a>
                    {!edit && props.user && props.user._id === props.feed.user_id._id ? (
                        <div className={style.deledit}>
                            <button className={style.delete} onClick={deleteFeed}><MdDeleteForever /></button>
                            <button className={style.edit} onClick={()=>{editFeed(true)}}><BiEdit /></button>
                        </div>
                    ) : null}
                </div>
                <div style={{ display: commentView ? 'block' : 'none' }}>
                    <form onSubmit={commentSubmit} key={props.feed._id}>
                        <input type="text" value={comment.comment} onChange={commentChange} name='comment' className={style.comment_box}></input>
                        <input type="hidden" value={props.feed._id} name='feed_id'></input>
                        <input type="hidden" value={props.feed.user_id._id} name='user_id'></input>
                        <input type="submit" value="작성" className={style.commentBtn}></input>
                    </form>
                </div>
            </div>
        </div>
    </>);
}

export default Feed;
