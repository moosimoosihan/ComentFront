import React, { useState } from 'react';
import Switch from 'react-switch'; //npm install react-switch 설치해주세요//
import styles from '../../styles/Mypage.module.css';

function MyPage() {
    const [toggleStates, setToggleStates] = useState([false, false, false, false]);
    const [editContent] = useState([
        'Allow people to follow you',
        'Allow people to send you message',
        'Allow people to read your post',
        'Online/Offline'
    ]);

    const a = JSON.parse(sessionStorage.getItem('userinfo') || '{}');
    const [aboutValue, setAboutValue] = useState('');

    const handleToggle = (index) => {
        const newToggleStates = [...toggleStates];
        newToggleStates[index] = !newToggleStates[index];
        setToggleStates(newToggleStates);
    };

    const handleSave = async (e) => {
        e.preventDefault(); // 폼의 기본 제출 동작 방지
        try {
            const userInfo = JSON.parse(sessionStorage.getItem('userinfo') || '{}');
            const updatedUserInfo = {
                ...userInfo,
                about: aboutValue
            };
            sessionStorage.setItem('userinfo', JSON.stringify(updatedUserInfo));
            console.log('사용자 정보 업데이트 완료:', updatedUserInfo);
        } catch (error) {
            console.error('사용자 정보 업데이트 실패:', error);
        }
    };

    return (
        <div>
            <form action='http://localhost:8000/mypage/:_id' onSubmit={handleSave}>
                <div className={styles.mypoto}>
                    <div className={styles.innerbox}>이미지</div>
                    <div className={styles.span}>
                        <h2>customize profile(optional)</h2>
                        <input className={styles.setname} type="text" value={a.email} placeholder="profile information" />
                    </div>
                </div>
                <div className={styles.myclass}>
                    <h2>user nickname(optional)</h2>
                    <p className={styles.graytext}>set your nickname</p>
                    <input className={styles.nickname} type="text" value={a.nickname} placeholder="userNickname(optional)" />
                    <div className={styles.singleline}></div>
                    <h2>user socialType(optional)</h2>
                    <p className={styles.graytext}>login socialType</p>
                    <input className={styles.nickname} type="text" value={a.socialType} placeholder="userNickname(optional)" />
                    <div className={styles.singleline}></div>
                    <h2>about(optional)</h2>
                    <p className={styles.graytext}>set your information</p>
                    <input className={styles.about} type="text" value={aboutValue} onChange={(e) => setAboutValue(e.target.value)} placeholder="about(optional)" />
                    <input type="submit" value="Save"/>
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
            </form>
        </div>
    );
}

export default MyPage;
