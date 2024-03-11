import React, { useState } from "react"
import logoImg from './logoImg.png';
import { CiSearch } from "react-icons/ci";
import styles from "../styles/header.module.css";
import Modal from "../components/Modal"
import "../styles/modal.css";

function Header() {

  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false);
    
  }

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
          <a className={styles.logTxt} onClick={openModal}>Log In</a>
          <Modal open={modalOpen} close={closeModal}>
          </Modal>
        </div>
        <div className={styles.signUp}>
          <a className={styles.logTxt}>Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default Header;
