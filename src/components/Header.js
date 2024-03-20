import React, { useState } from "react"
import logoImg from './logoImg.png';
import { CiSearch } from "react-icons/ci";
import styles from "../styles/header.module.css";
import Modal from "../components/Modal"
import "../styles/modal.css";
import { CiMenuBurger } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import SideBar from "./SideBar";
import Dropdown from "./Dropdown";


//로그인정보 관련
import { Cookies } from "react-cookie";
import useAuth from "../Auth";

import { useNavigate } from 'react-router-dom';

function Header() {


  //좌측 햄버거 코드 
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false);
  }

  const [showNavigation, setShowNavigation] = useState(true);

    const toggleNavigation = () => {
        setShowNavigation(!showNavigation);
        console.log(showNavigation);
  
  };

  //로그인 정보 
  const cookies = new Cookies();
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    // 쿠키에서 JWT 토큰 삭제
    cookies.remove('jwt');
    // 세션 스토리지에서 사용자 정보 삭제
    sessionStorage.removeItem('userinfo');
    console.log('로그아웃 되었습니다.');
    alert('로그아웃')

    // = 메인페이지로 리다이렉트.. import { useNavigate } from 'react-router-dom' 필요
    navigate('/');
  };
  
  //회원 정보는 info. 으로 가져올것임 
  const info = JSON.parse(sessionStorage.getItem('userinfo') || '{}');


  const [view, setView] = useState(false);

  //로그인 됐을 때 
  if (isLoggedIn) {

    return (
      <React.Fragment>
      <>
        {showNavigation && <SideBar />}
        <div className={styles.container}>
          <div className={styles.menuShow}>
              <CiMenuBurger size="30" color="black" onClick={toggleNavigation} />
          </div>
          <div className={styles.between}>
            <div className="logoBox">
              <a
                href='/'
              ><img className={styles.logoImg} src={logoImg} /></a>
            </div> 
            <div className="searchBar">
              <form className={styles.searchBox}>
                <input className={styles.searchTxt} type="text" placeholder="ComenT에서 검색하기"/>
                <button className={styles.searchBtn} type='submit' >
                <CiSearch size="22" color="#c0c0c0" /> { // 아이콘 
                }
  
                </button>
              </form>
            </div>     
            <div className={styles.profileBox}>
              <div className={styles.uploadDiv}>
                <a href="http://localhost:3000/uploadFeed" className={styles.upload}>
                <CiSquarePlus size="50" color="#c0c0c0" /></a>
              </div>
              <div className={styles.nickDiv}>
                <a className={styles.nick}>ID: {info.nickname}</a>
              </div>
              <div className={styles.profDiv}>
                <ul className={styles.dropdown} onClick={() => {setView(!view)}}>
                <img className={styles.profImg} src="./profile.png"  width="50px" height="50px"></img>
                {view && <Dropdown />}

                </ul>
                
              </div>
            </div>
          </div>
        </div>
      </>
      </React.Fragment>
    );
  
  }

  // 비로그인 
  else {

    return (
      <React.Fragment>
      <>
        {showNavigation && <SideBar />}
        <div className={styles.container}>
          <div className={styles.menuShow}>
              <CiMenuBurger size="30" color="black" onClick={toggleNavigation} />
          </div>
          <div className={styles.between}>
            <div className="logoBox">
              <a
                href='/'
              ><img className={styles.logoImg} src={logoImg} /></a>
            </div> 
            <div className="searchBar">
              <form className={styles.searchBox}>
                <input className={styles.searchTxt} type="text" placeholder="ComenT에서 검색하기"/>
                <button className={styles.searchBtn} type='submit' >
                <CiSearch size="22" color="#c0c0c0" /> { // 아이콘 
                }
  
                </button>
              </form>
            </div>     
            <div className={styles.logBox}>
              <div className={styles.logIn}>
                <a className={styles.logTxt} onClick={openModal}>Log In</a>
                <Modal open={modalOpen} close={closeModal}>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </>
      </React.Fragment>
    );
  }

  
}

export default Header;
