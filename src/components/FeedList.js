import { useState, useEffect } from 'react';
import Feed from './Feed';
import axios from 'axios';
import PropTypes from 'prop-types';
import useAuth from "../Auth";

function FeedList(props) {

    FeedList.propTypes ={
        category: PropTypes.string,
        keyword: PropTypes.string,
    }
    const [feeds, setFeeds] = useState([]);
    let user = null;
    const isLoggedIn = useAuth();
    if (isLoggedIn) {
        user = JSON.parse(sessionStorage.getItem('userinfo') || '{}');
    }
    useEffect(() => {
        if(props.category){
            let fetchDataCategory = null;
            if(props.category==='popular'){
                fetchDataCategory = async () => {
                    const response = await axios.get('http://localhost:8000/feed/category/Popular');
                    setFeeds(response.data);
                };
            } else {
                fetchDataCategory = async () => {
                    const response = await axios.get(`http://localhost:8000/feed/category/${props.category}`);
                    setFeeds(response.data);
                };
            }
            fetchDataCategory();
        } else if(props.keyword){
            const fetchDataKeyword = async () => {
                const response = await axios.get(`http://localhost:8000/feed/search/${props.keyword}`);
                setFeeds(response.data);
            };
            fetchDataKeyword();
        } else {
            const fetchData = async () => {
                const response = await axios.get('http://localhost:8000/feed');
                setFeeds(response.data);
            };
            fetchData();
        }
    }, [props.category, props.keyword]);
    return (
        <>
            {feeds.map((feed) => (
                <Feed key={feed._id} feed={feed} user={user} isLoggedIn={isLoggedIn} />
            ))}
        </>
    );
}

export default FeedList;
