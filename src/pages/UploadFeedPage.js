import { useEffect, useState } from "react";
import useAuth from "../Auth";
import axios from 'axios';

function UploadFeedPage() {
    const isLoggedIn = useAuth();
    const gotoHome = () => {
        window.location.href = '/';
    }
    function submitFeed(e) {
        if(document.querySelector('input[name="title"]').value === ''){
            alert('제목을 입력해주세요.');
            e.preventDefault();
            return;
        }
        if(document.querySelector('input[name="content"]').value === ''){
            alert('내용을 입력해주세요.');
            e.preventDefault();
            return;
        }
    }

    // 파라미터 값으로 feed_id가 있다면 수정하도록 하고, 없다면 새로운 피드를 업로드하도록 한다.
    let [edit, setEdit] = useState(false);
    let [feed, setFeed] = useState(undefined);
    useEffect(()=>{
        // 먼저 파라미터 값 여부 확인
        if(window.location.pathname.split('/').length > 2 && !edit){
            // 수정
            try{
                const feed_id = window.location.pathname.split('/')[2];
                const fetchData = async()=>{
                    const response = await axios.get(`http://localhost:8000/feed/${feed_id}`);
                    setFeed(response.data);
                };
                fetchData();
                setEdit(true);
            }catch(e){
                console.log(e);
            }
        }
    }, [])

    const a = JSON.parse(sessionStorage.getItem('userinfo') || '{}');
    if(isLoggedIn){
        return (edit) ? ((feed !== undefined && a._id === feed.user_id._id) ? (
            <div>
                <form method='post' action={`http://localhost:8000/feed/${feed._id}`} onSubmit={submitFeed} >
                    <input type="hidden" name="user_id" value={a._id} />
                    <input type="text" name="title" value={feed.title} onChange={(e) => setFeed({ ...feed, title: e.target.value })} />
                    <select name="category" value={feed.category}>
                        <option value={feed.category}>{feed.category}</option>
                    </select>
                    <input type="textarea" name="content" value={feed.content} onChange={(e) => setFeed({ ...feed, content: e.target.value })} />
                    <input type="submit" value="수정하기" />
                </form>
            </div>
        ):(
            <div>
            <h1>본인이 작성한 글만 수정할 수 있습니다.</h1>
            <button onClick={gotoHome}>홈으로</button>
            </div>
        )):(
            <div>
            <form method='post' action='http://localhost:8000/feed' onSubmit={submitFeed} >
                <input type="hidden" name="user_id" value={a._id} />
                <input type="text" name="title" />
                <select name="category" >
                <option value="Gaming">Gaming</option>
                <option value="Sports">Sports</option>
                <option value="Business">Business</option>
                <option value="Crypto">Crypto</option>
                <option value="Television">Television</option>
                <option value="Celebrity">Celebrity</option>
                </select>
                <input type="textarea" name="content" />
                <input type="submit" value="업로드" />
            </form>
            </div>
        );
    } else {
        return (
            <div>
                <h1>로그인이 필요합니다.</h1>
                <button onClick={gotoHome}>홈으로</button>
            </div>
        );
    }
}

export default UploadFeedPage;
