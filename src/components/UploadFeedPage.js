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
    )
}

export default UploadFeedPage;
