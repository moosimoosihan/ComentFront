import { useParams } from 'react-router-dom';

import Header from '../components/Header';
import FeedList from '../components/FeedList';

function MainPage() {
    const keyword = useParams();
    console.log(keyword);
    return <div>
        <Header />
        <FeedList />
        </div>;
}

export default MainPage;