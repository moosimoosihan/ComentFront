import { useEffect, useState } from 'react';
import styled from '../styles/uploadFeedPage.module.css';
import { useNavigate } from 'react-router-dom';

function UploadFeedPage() {
    const navigate = useNavigate();
    function submitFeed(e) {
        if(document.querySelector('input[name="title"]').value === ''){
            alert('제목을 입력해주세요.');
            e.preventDefault();
            return;
        }
        if(document.querySelector('textarea[name="content"]').value === ''){
            alert('내용을 입력해주세요.');
            e.preventDefault();
            return;
        }
    }
    const [userInfo, setUserInfo] = useState({_id: ''});
    useEffect(() => {
        if(sessionStorage.getItem('userinfo')){
            setUserInfo(JSON.parse(sessionStorage.getItem('userinfo')));
        } else {
            navigate('/login');
        }
    },[]);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return (
        <div className={styled.container}>
            <div className={styled.uploadContainer}>
                <div className={styled.profile} >
                    <img className={styled.profImg} src="/profile.png" width='40px' height='40px'></img>
                </div>
                <form method='post' action='http://localhost:8000/feed' onSubmit={submitFeed} >
                    <input type="hidden" name="user_id" value={userInfo._id} />
                    <div className={styled.select}>
                        <select className={styled.category} name="category" >
                            <option value="Gaming">Gaming</option>
                            <option value="Sports">Sports</option>
                            <option value="Business">Business</option>
                            <option value="Crypto">Crypto</option>
                            <option value="Television">Television</option>
                            <option value="Celebrity">Celebrity</option>
                        </select>
                    </div>
                    <div className={styled.titleBox}>
                        <input className={styled.title} type="text" name="title" placeholder="제목을 입력해주세요." value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className={styled.contentBox}>
                        <textarea className={styled.content} name="content" placeholder="내용을 입력해주세요." value={content} onChange={e => setContent(e.target.value)} />
                    </div>
                    <div className={styled.uploadBox}>
                        <input className={styled.upload} type="submit" value="Upload" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UploadFeedPage;
