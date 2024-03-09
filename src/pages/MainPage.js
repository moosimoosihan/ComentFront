import React from 'react';
import { useParams } from 'react-router-dom';

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import FeedList from '../components/FeedList';

function MainPage() {
    const keyword = useParams();
    console.log(keyword);
    return <div>
        <Header />
        <SideBar />
        <FeedList />
        </div>;
}

export default MainPage;