// TODO : 피드 구현
import React from 'react';
import style from '../styles/Feed.module.css';
import { PropTypes } from 'prop-types';
import { BiLike, BiDislike, BiEdit } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function Feed(props) {
    Feed.propTypes = {
        nickname: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }

    return <>
        <div className={style.feed_container}>
            <div className={style.feed}>
                <div className={style.profile}></div>
                <p className={style.username}>{props.nickname} ㆍ 1days ago</p>
                <h1 className={style.title}>{props.title}</h1>
                <p className={style.content}>{props.content}</p>
                <div className={style.other_container}>
                    <div className={style.like_box}>
                        <button className={style.up}><BiLike /></button>
                        <p className={style.like_count}>2.5k</p>
                        <button className={style.down}><BiDislike /></button>
                    </div>
                    <button className={style.comment}><FaRegCommentAlt />1.4k</button>
                    <div className={style.deledit}>
                        <button><MdDeleteForever /></button>
                        <button><BiEdit /></button>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default Feed;
