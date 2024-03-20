import useAuth from "../Auth";
import PropTypes from 'prop-types';
import { Cookies } from "react-cookie";

function UploadFeedPage(props) {
    UploadFeedPage.propTypes = {
        edit: PropTypes.bool,
        feed: PropTypes.object,
    }
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

    const a = JSON.parse(sessionStorage.getItem('userinfo') || '{}');
    if(isLoggedIn){
        return (props.edit) ? ((props.feed !== undefined && a._id === props.feed.user_id._id) ? (
            <div>
                <form method='post' action={`http://localhost:8000/feed/${props.feed._id}`} onSubmit={submitFeed} >
                    <input type="hidden" name="user_id" value={a._id} />
                    <input type="text" name="title" value={props.feed.title} />
                    <select name="category" value={props.feed.category}>
                        <option value={props.feed.category}>{props.feed.category}</option>
                    </select>
                    <input type="textarea" name="content" value={props.feed.content} />
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
