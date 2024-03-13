import React, { useState } from 'react';
import Switch from 'react-switch'; //npm install react-switch 설치해주세요//
import styles from '../styles/Mypage.module.css';


function MyPage() {
    const [toggleStates, setToggleStates] = useState([false, false, false, false]);
    const [editContent] = useState([
        'Allow people to follow you',
        'Allow people to send you message',
        'Allow people to read your post',
        'Online/Offline'
    ]);

    const [nameValue, setNameValue] = useState('');
    const [nicknameValue, setNicknameValue] = useState('');
    const [aboutValue, setAboutValue] = useState('');

    const handleToggle = (index) => {
        const newToggleStates = [...toggleStates];
        newToggleStates[index] = !newToggleStates[index];
        setToggleStates(newToggleStates);
    };
    return (
        <div>
            <div className={styles.mypoto}>
                <div className={styles.innerbox}>이미지</div>
                <div className={styles.span}>
                <h2>customize profile(optional)</h2>
                <input className={styles.setname} type="text" value={nameValue} onChange={(e) => setNameValue(e.target.value)} placeholder="profile information" />
                </div>
            </div>
            <div className={styles.myclass}>
                <h2>user nickname(optional)</h2>
                <p className={styles.graytext}>set your nickname</p>
                <input className={styles.nickname} type="text" value={nicknameValue} onChange={(e) => setNicknameValue(e.target.value)} placeholder="userNickname(optional)" />
                <div className={styles.singleline}></div>
                <h2>about(optional)</h2>
                <p className={styles.graytext}>set your information</p>
                <input className={styles.about} type="text" value={aboutValue} onChange={(e) => setAboutValue(e.target.value)} placeholder="about(optional)" />
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
