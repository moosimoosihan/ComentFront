import React from "react";
import { NotificationDropdown, LikeButton, CommentField, CommentList } from "react-activity-feed";
import "react-activity-feed/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoVideo, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faBloggerB } from "@fortawesome/free-brands-svg-icons";
import "../../styles/MyFeed.module.css";

class App extends React.Component {
  state = {
    posts: [], // 데이터를 저장할 상태
    error: null,
  };

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    fetch('http://localhost:3000/posts') // 네스트JS 백엔드의 주소와 포트번호 사용
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        return response.json();
      })
      .then(data => this.setState({ posts: data }))
      .catch(error => {
        console.error('포스트를 불러오는 중 에러가 발생했습니다:', error);
        this.setState({ error })});
  }

  renderPost = (post) => {
    return (
      <div key={post.id} style={{ margin: "10px", padding: "20px", border: "1px solid #ccc" }}>
        <h3>{post.title}</h3>
        <p>{post.content} {/* body 대신 content 사용 */}</p>
        {/* LikeButton, CommentField, CommentList와 같은 컴포넌트들을 여기에 포함시킬 수 있습니다. */}
      </div>
    );
  }

  render() {
    const { posts, error } = this.state;

    return (
      <div>
        <NotificationDropdown notify />
        {error && <p>포스트를 불러오는데 실패했습니다: {error.message}</p>}
        {posts.length > 0 ? posts.map(this.renderPost) : <p>포스트가 없습니다.</p>}
      </div>
    );
  }
}

export default App;
