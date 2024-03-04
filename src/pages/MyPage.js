// TODO : 마이페이지
import React from 'react';
import { useParams } from 'react-router-dom';

function MyPage() {
    const { user_no } = useParams();
    return <div>
        <h1>유저넘버가 {user_no}인 마이 페이지</h1>
    </div>;
}

export default MyPage;