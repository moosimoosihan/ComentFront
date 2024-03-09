// TODO : 피드 구현
import React from 'react';
import style from '../styles/Feed.module.css';
import { PropTypes } from 'prop-types';

function Feed(props) {
    return <>
        <div className={style.feed_container}>
            <div className={style.feed}>
                <p className={style.username}>{props.username} ㆍ 1days ago</p>
                <h1 className={style.title}>{props.title}</h1>
                <p className={style.content}>{props.content}</p>
                <div className={style.like_box}>
                    <button className={style.up}>up</button>
                    <p className={style.like_count}>2.5k</p>
                    <button className={style.down}>down</button>
                    <button className={style.comment}>1.4k</button>
                </div>
            </div>
        </div>
    </>;
}

Feed.propTypes = {
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
}

export default Feed;
