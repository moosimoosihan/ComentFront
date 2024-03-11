//Import useState
import React, { useState } from "react";
import Button from "../styles/ProfileCate.module.css";
import Profile from "./ProfileInfo";
export default function MyPage() {
    const [showCategory, setShowCategory] = useState(false);

    const handleProfileClick = () => {
      setShowCategory(true);
    };
  

  return (
      <div className={Button.header}>
        <button name="profile" className={Button.button} onClick={handleProfileClick}>
          profile
        </button>
        <button name="post" className={Button.button}>post</button>
        <button name="community" className={Button.button}>community</button>
        <button name="comment" className={Button.button}>comment</button>
        <button name="follow" className={Button.button}>follow</button>
        <button name="setting" className={Button.button}>setting</button>
        {showCategory && <Profile />}
      </div>
  );
}