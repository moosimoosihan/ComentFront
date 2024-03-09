import React, { useState, useEffect } from 'react';
import Feed from './Feed';
import axios from 'axios';

function FeedList() {
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8000/feed');
            setFeeds(response.data);
        };

        fetchData();
    }, []);

    return (
        <>
            {feeds.map((feed) => (
                <Feed key={feed._id} username={feed.username} content={feed.content} title={feed.title} />
            ))}
        </>
    );
}

export default FeedList;
