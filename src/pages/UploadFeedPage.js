import useAuth from "../Auth";

function UploadFeedPage() {
    const isLoggedIn = useAuth();
    const gotoHome = () => {
        window.location.href = '/';
    }
    const a = JSON.parse(sessionStorage.getItem('userinfo') || '{}');
    if(isLoggedIn){
        return (
            <div>
                <form method='post' action='http://localhost:8000/feed' >
                    <input type="hidden" name="user_id" value={a._id} />
                    <input type="text" name="title" />
                    <select name="category">
                        <option value="Gamming">Gamming</option>
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
