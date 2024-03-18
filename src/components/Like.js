import { useEffect, useState} from 'react';
import axios from 'axios';
import useAuth from "../Auth";
import { BiLike } from "react-icons/bi";
import style from '../styles/Feed.module.css';
import PropTypes from 'prop-types';

function Like (props) {
    Like.propTypes = {
        feed_id: PropTypes.string.isRequired,
    }
    let user = null;
    const isLoggedIn = useAuth();
    if(isLoggedIn){
        user = JSON.parse(sessionStorage.getItem('userinfo') || '{}');
    }
const [like, setLike] = useState(false);
    const isLiked = async () => {
        const response = await axios.get(`http://localhost:8000/feed/like/${props.feed_id}/${user._id}`);
        if(response.data){
            setLike(true);
        } else {
            setLike(false);
        }
    }
    useEffect(() => {
        if(isLoggedIn){
            isLiked();
        }
    },[])
    return (like?
        (
        <>
            <button className={style.up}><BiLike /></button>
            <p className={style.like_count}>2.5k</p>
        </>
        ):(
        <>
            <button className={style.up}><BiLike /></button>
            <p className={style.like_count}>2.5k</p>
        </>
        )
    );
}

export default Like;