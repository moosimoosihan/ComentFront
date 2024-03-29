//Import useState
import React, { useState } from "react";
import Button from "../../styles/ProfileCate.module.css";
import Profile from "./ProfileInfo";
import MyFeed from "./MyFeed";
import Header from '../../components/Header';

export default function MyPage() {
    const [showCategory, setShowCategory] = useState(false);
    const [showFeed, setShowFeed] = useState(false);

    const handleProfileClick = () => {
      setShowCategory(!showCategory);
      setShowFeed(false);
    };
    const handleFeedClick = () => {
      setShowFeed(!showFeed);
      setShowCategory(false);
    }

  return (
    <div className={Button.container}>
      <Header />
      <div className={Button.header}>
        <button name="profile" className={Button.button} onClick={handleProfileClick}>
          Profile
        </button>
        <button name="feed" className={Button.button} onClick={handleFeedClick}>Feed</button>
        <button name="community" className={Button.button}>Community</button>
        <button name="comment" className={Button.button}>Comment</button>
        <button name="follow" className={Button.button}>Follow</button>
        <button name="like" className={Button.button}>Like</button>
        {showCategory && <Profile />}
        {showFeed && <MyFeed />}
      </div>
      </div>
  );
}