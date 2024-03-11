// TODO : 헤더 구현
//import React from "react"; 설정 다 끝나고나니까 이 문구가 필요가 없다네요(성주)
import logoImg from './logoImg.png';
import { CiSearch } from "react-icons/ci";
import styles from "../styles/header.module.css";



function Header() {

 


  return (
    <div className={styles.container}>
      <div className="logoBox">
        <a
          href='/'
        ><img className={styles.logoImg} src={logoImg} /></a>
      </div> 
      <div className="searchBar">
        <form className={styles.searchBox}>
          <input className={styles.searchTxt} type="text" placeholder="ComenT에서 검색하기"/>
          <botton className={styles.searchBtn} type='submit' >
          <CiSearch size="22" color="#c0c0c0" /> { // 아이콘 
          }

          </botton>
        </form>
      </div>     
      <div className={styles.logBox}>
        <div className={styles.logIn}>
          <a className={styles.logTxt}>Log In</a>
        </div>
        <div className={styles.signUp}>
          <a className={styles.logTxt}>Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default Header;
