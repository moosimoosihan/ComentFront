// TODO : 헤더 구현
//import React from "react"; 설정 다 끝나고나니까 이 문구가 필요가 없다네요(성주)
import logoImg from './logoImg.png';

import styles from "../styles/header.module.css";


function Header() {
  return (
    <div>
      <div className="logo">
        <a
          href='/'
        ><img className={styles.logoImg} src={logoImg} /></a>
      </div> 
      <div className="searchBar">
        
      </div>     
      <div className="logIn">

      </div>
      <div className="logOut">

      </div>
    </div>
  );
}

export default Header;
