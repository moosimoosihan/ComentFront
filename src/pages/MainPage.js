import React from 'react';
import { useParams } from 'react-router-dom';

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Feed from '../components/Feed';

function MainPage() {
    const keyword = useParams();
    console.log(keyword);
    return <div>
        <Header />
        <SideBar />
        <Feed />
    </div>;
}

export default MainPage;