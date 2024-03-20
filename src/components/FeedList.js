import React, { useState, useEffect } from 'react';
import Feed from './Feed';
import axios from 'axios';
import PropTypes from 'prop-types';

function FeedList(props) {

    FeedList.propTypes ={
        category: PropTypes.string,
    }
    const [feeds, setFeeds] = useState([]);
    useEffect(() => {
        if(props.category){
            const fetchData = async () => {
                const response = await axios.get(`http://localhost:8000/feed/category/${props.category}`);
                setFeeds(response.data);
            };
            fetchData();
        } else {
            const fetchData = async () => {
                const response = await axios.get('http://localhost:8000/feed');
                setFeeds(response.data);
            };
            fetchData();
        }
    }, [props.category]);
    return (
        <>
            {feeds.map((feed) => (
                <Feed key={feed._id} feed_id={feed._id} nickname={feed.user_id.nickname} content={feed.content} title={feed.title} user_id={feed.user_id._id} />
            ))}
        </>
    );
}

export default FeedList;
