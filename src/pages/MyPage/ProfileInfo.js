import React, { useEffect, useState } from 'react';
import Switch from 'react-switch'; //npm install react-switch 설치해주세요//
import styles from '../../styles/Mypage.module.css';
import axios from 'axios';
import useAuth from '../../Auth';
import { Button } from "@material-tailwind/react";

function MyPage() {
    const isLoggedIn = useAuth();
    const user = isLoggedIn ? JSON.parse(sessionStorage.getItem('userinfo') || '{}') : null;
    const [toggleStates, setToggleStates] = useState([false, false, false, false]);
    const [editContent] = useState([
        'Allow people to follow you',
        'Allow people to send you message',
        'Allow people to read your post',
        'Online/Offline'
    ]);
    const isLoggedIn = useAuth();

    const [nameValue, setNameValue] = useState('');
    const [nicknameValue, setNicknameValue] = useState('');
    const [aboutValue, setAboutValue] = useState('');

    const a = JSON.parse(sessionStorage.getItem('userinfo') || '{}');

    const [email, setEmail] = useState(a.email || '');
    const [nickname, setNickname] = useState(a.nickname || '');
    const [socialType, setSocialType] = useState(a.socialType || '');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };
    
    const handleSocialTypeChange = (e) => {
        setSocialType(e.target.value);
    };
    
    const handleToggle = (index) => {
        const newToggleStates = [...toggleStates];
        newToggleStates[index] = !newToggleStates[index];
        setToggleStates(newToggleStates);
    };
    const user = isLoggedIn ? JSON.parse(sessionStorage.getItem('userinfo') || '{}') : null;
    const fetchData = async () => {
        if (isLoggedIn && user?._id) {
          const response = await axios.get(`http://localhost:8000/login/userInfo/${user._id}`);
            console.log(response.data);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, [isLoggedIn]);

    return (
        <div>
            <div className={styles.mypoto}>
                <div className={styles.innerbox}>이미지</div>
                <div className={styles.span}>
                <h2>customize profile(optional)</h2>
                <input className={styles.setname} type="text" value={email} onChange={handleEmailChange} placeholder="profile information" />
                </div>
            </div>
            <div className={styles.myclass}>
                <h2>user nickname(optional)</h2>
                <p className={styles.graytext}>set your nickname</p>
                <input className={styles.nickname} type="text" value={nickname} onChange={handleNicknameChange} placeholder="userNickname(optional)" onKeyDown={(e) => e.key === 'Enter' && saveNickname()} />
                <div className={styles.singleline}></div>
                <h2>login socialType(optional)</h2>
                <p className={styles.graytext}>login socialType</p>
                <input className={styles.nickname} type="text" value={socialType} onChange={handleSocialTypeChange} placeholder="socialType(optional)" />
                <div className={styles.singleline}></div>
                <h2>about(optional)</h2>
                <p className={styles.graytext}>set your information</p>
                <input className={styles.about} type="text" value={aboutValue} onChange={(e) => setAboutValue(e.target.value)} placeholder="about(optional)" onKeyDown={handleKeyDown}/>
                <div className={styles.singleline}></div>
                {toggleStates.map((isToggleOn, index) => (
                    <div key={index} className={styles['toggle-list-item']}>
                        <span>{editContent[index]}</span>
                        <div className="custom-switch-container">
                            <Switch
                                checked={isToggleOn}
                                onChange={() => handleToggle(index)}
                                className="custom-switch"
                                onColor="#2699E6"
                                offColor="#A1A1A1"
                            />
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default MyPage;