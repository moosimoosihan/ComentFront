import Header from '../components/Header';
import FeedList from '../components/FeedList';
import { useParams } from 'react-router-dom';

function MainPage() {
    // 주소에 있는 keyword 값을 가져오기
    const { category } = useParams();
    const { keyword } = useParams();
    return <div>
        <Header />
        <FeedList category={category} keyword={keyword} />
        </div>;
}

export default MainPage;