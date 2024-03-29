//Import useState
import React, { useEffect, useState } from "react";
import Button from "../../styles/ProfileCate.module.css";
import Profile from "./ProfileInfo";
import MyFeed from "./MyFeed";
import Header from '../../components/Header';
// import Like from "./Like";

export default function MyPage() {
    const [showCategory, setShowCategory] = useState(false);
    const [showFeed, setShowFeed] = useState(false);
    const [showLike, setShowLike] = useState(false);

    useEffect(() => {
      handleProfileClick();
  }, []);

    const handleProfileClick = () => {
      setShowCategory(!showCategory);
      setShowFeed(false);
      setShowLike(false);
    };
    const handleFeedClick = () => {
      setShowFeed(!showFeed);
      setShowCategory(false);
      setShowLike(false);
    }
    const handleLikeClick = () => {
      setShowLike(!showLike);
      setShowCategory(false);
      setShowFeed(false);
    }  

  return (
    <div className={Button.container}>
      <Header />
      <div className={Button.header}>
        <button name="profile" className={Button.button} onClick={handleProfileClick}>
          profile
        </button>
        <button name="feed" className={Button.button} onClick={handleFeedClick}>feed</button>
        <button name="community" className={Button.button}>community</button>
        <button name="comment" className={Button.button}>comment</button>
        <button name="follow" className={Button.button}>follow</button>
        <button name="like" className={Button.button} /*onClick={handleLikeClick}*/>like</button>
        {showCategory && <Profile />}
        {showFeed && <MyFeed />}
        {/* {showLike && <Like />} */}
      </div>
      </div>
  );
}