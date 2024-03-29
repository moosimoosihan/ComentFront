import React, { useEffect, useState } from 'react';
import Switch from 'react-switch'; //npm install react-switch 설치해주세요//
import styles from '../../styles/Mypage.module.css';
import axios from 'axios';
import { Button } from "@material-tailwind/react";
import useAuth from "../../Auth";

function MyPage() {
    const isLoggedIn = useAuth();
    const user = isLoggedIn ? JSON.parse(sessionStorage.getItem('userinfo') || '{}') : null;

    const [toggleStates, setToggleStates] = useState([
        { state: false, content: 'Allow people to follow you' },
        { state: false, content: 'Allow people send your message' },
        { state: false, content: 'Allow people to read your post' },
        { state: false, content: 'Online/Offline' }
      ]);
      
      const handleToggle = (index) => {
        setToggleStates(prevStates => {
          const newToggleStates = [...prevStates];
          newToggleStates[index] = { ...newToggleStates[index], state: !newToggleStates[index].state };
            // 조건에 따라 토글 상태 조작
            if (newToggleStates[index].state) {
                // 토글이 켜진 상태일 때는 true로 설정
                newToggleStates[index] = { ...newToggleStates[index], state: true };
            } else {
                // 토글이 꺼진 상태일 때는 false로 설정
                newToggleStates[index] = { ...newToggleStates[index], state: false };
            }
          saveToggleStates(newToggleStates);
        });
      };
      const saveToggleStates = async () => {
        try {
          await axios.post('http://localhost:8000/saveToggleStates', { toggleStates });
          console.log('토글 상태가 서버에 전송되었습니다.');
        } catch (error) {
          console.error('토글 상태를 서버에 전송하는 도중 에러가 발생했습니다:', error);
        }
      };      
      
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
    
    
    useEffect(() => {
        const fetchData = async () => {
            if (user && user._id) {
                try {
                    const response = await axios.get(`http://localhost:8000/mypage/updatedUser/${user._id}`);
                    if (response.data.about) {
                        setAboutValue(response.data.about);
                    }
                } catch (error) {
                    console.error('데이터를 불러오는 데 실패했습니다.', error);
                }
            }
        };
        fetchData();
    }, [user]);
    
    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            try {
                if (aboutValue && aboutValue.trim()) {
                    if (!user || !user._id) {
                        console.error('유효하지 않은 user._id 입니다.');
                        return;
                    }
                    const response = await axios.post(`http://localhost:8000/mypage/update/${user._id}`, {
                        about: aboutValue
                    });
                    setAboutValue(response.data.about);
                    window.alert('수정완료');
                } else {
                    console.error('about 필드가 비어있습니다.');
                }
            } catch (error) {
                console.error('데이터를 불러오는 데 실패했습니다.', error);
            }
            try {
                if (e.key === 'Enter'){
                    await saveNickname();
                }
            } catch (error) {
                console.error('닉네임을 불러오는 데 실패했습니다.', error);
            }
        }
    };

    const saveNickname = async () => {
        if (!user || !user._id) {
            console.error('유효하지 않은 user._id 입니다.');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8000/mypage/updateNickname/${user._id}`, {
                nickname: nickname,
            });
            console.log('닉네임 저장 성공:', response.data);
            window.alert('닉네임이 성공적으로 업데이트 되었습니다.');
        } catch (error) {
            console.error('닉네임 저장 실패:', error);
        }
    };

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
                <h2>set your nickname(optional)</h2>
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
                {toggleStates.map((toggle, index) => (
                     <div key={index} className={styles['toggle-list-item']}>
                        <span>{toggle.content}</span>
                        <div className="custom-switch-container">
                            <Switch
                            checked={toggle.state}
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