import styled from '../styles/uploadFeedPage.module.css';

function UploadFeedPage() {
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

    const a = JSON.parse(sessionStorage.getItem('userinfo') || '{}');
    return (
        <div className={styled.container}>
            <div className={styled.uploadContainer}>
            <div className={styled.profile} >
                <img className={styled.profImg} src="./profile.png" width='40px' height='40px'></img>
            </div>
                <form method='post' action='http://localhost:8000/feed' onSubmit={submitFeed} >
                    <input type="hidden" name="user_id" value={a._id} />
                    <select name="category" >
                        <option value="Gaming">Gaming</option>
                        <option value="Sports">Sports</option>
                        <option value="Business">Business</option>
                        <option value="Crypto">Crypto</option>
                        <option value="Television">Television</option>
                        <option value="Celebrity">Celebrity</option>
                    </select>
                    <input type="text" name="title" />
                    <input type="textarea" name="content" className={styled.feedContent} />
                    <input type="submit" value="업로드" />
                </form>
            </div>
        </div>
    )
}

export default UploadFeedPage;
