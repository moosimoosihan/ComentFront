import React, { useState,useEffect } from "react"
import { CiSearch } from "react-icons/ci";
import styles from "../styles/header.module.css";
import Modal from "../components/Modal"
import "../styles/modal.css";
import { CiMenuBurger } from "react-icons/ci";
import SideBar from "./SideBar";
import Dropdown from "./Dropdown";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

//로그인정보 관련
import useAuth from "../Auth";

function Header() {

  //좌측 햄버거 코드 
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true);
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
  const isLoggedIn = useAuth();
  const cookies = new Cookies();
  const jwtToken = cookies.get('jwt');
  //회원 정보는 info. 으로 가져올것임
  let [info,setInfo] = useState(JSON.parse(sessionStorage.getItem('userinfo') || '{}'));
  useEffect(() => {
    if(isLoggedIn){
      fetchUserInfo();
    }
  },[isLoggedIn]);

  async function fetchUserInfo() {
    const response = await axios.post('http://localhost:8000/login/userInfo',{
      token: jwtToken
    });
    setInfo(response.data);
  }
  
  const [view, setView] = useState(false);

  // 검색
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  function search() {
    if(keyword === ''){
      return;
    }
    navigate(`/search/${keyword}`);
  }


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
            ><img className={styles.logoImg} src='/logoImg.png' /></a>
          </div> 
          <div className="searchBar">
            <div className={styles.searchBox}>
              <input className={styles.searchTxt} type="text" placeholder="ComenT에서 검색하기" onChange={(e) => setKeyword(e.target.value)} />
              <button className={styles.searchBtn} onClick={search} >
              <CiSearch size="22" color="#c0c0c0" />
              </button>
            </div>
          </div>     
          {isLoggedIn?(<div className={styles.profileBox}>
            <div className={styles.nickDiv}>
              <a className={styles.nick}>{info.nickname}님 안녕하세요!</a>
            </div>
            <div className={styles.profDiv}>
              <ul className={styles.dropdown} onClick={() => {setView(!view)}}>
              <img className={styles.profImg} src="/profile.png"  width="50px" height="50px"></img>
              {view && <Dropdown />}
              </ul>
            </div>
          </div>):(
          <div className={styles.logBox}>
            <div className={styles.logIn}>
              <a className={styles.logTxt} onClick={openModal}>Log In</a>
              <Modal open={modalOpen} close={closeModal}>
              </Modal>
            </div>
          </div>
          )}
        </div>
      </div>
    </>
    </React.Fragment>
  );
}

export default Header;
