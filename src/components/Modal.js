import React, { useState, useRef } from "react";
import "../styles/modal.css";
import { PropTypes } from 'prop-types';



const Modal = (props) => {

  Modal.propTypes = {
    open: PropTypes.boolean,
    close: PropTypes.boolean,
  }

  const { open, close } = props;
  
  //signUp 변경부분 기본값 false
  const [isSignUp, setIsSignUp] = useState(false);

  const showSignUp = () => {
    setIsSignUp(true);
  };

  const showLogIn = () => {
    setIsSignUp(false);
  };

  const modalRef = useRef(); // 모달 영역지정

  const closeModal = (e) => {
    if(modalRef.current && !modalRef.current.contains(e.target)) { // 모달 외부 클릭 시
    setIsSignUp(false); 
    close();
    }
  };

  // const handleKakaoLogin = () => {
  //   // 카카오톡 로그인 페이지 URL
  //   const kakaoLoginUrl = 'http://localhost:3000/kakaoOauth';
  //   // 새 창에서 카카오톡 로그인 페이지 열기
  //   window.open(kakaoLoginUrl, '_blank');
  // };

  const Rest_api_key='676fceb5e807f864a04f35f7f7cd403c' //REST API KEY
  const redirect_uri = 'http://localhost:3000/kakaoOauth' //Redirect URI
  // oauth 요청 URL

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleKakaoLogin = ()=>{
        window.location.href = 'http://localhost:8000/login/kakao-login-page';
    }


  return (
    <div className={open ? "openModal modal" : "modal"} onClick={closeModal}>
        {open ? (
          <section ref={modalRef}>
            <header>
              <img className="mainLogo" src="/coment.png" alt="main logo" />
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            {isSignUp ? (
              <main>
                <h1>회원가입</h1>
                <div className="login-info">
                  <p>
                    시작하기 전에, 당신은 우리의 <span className="modalStrong">이용약관</span>에 동의하셔야 하며<br />
                    또한 <span className="modalStrong">개인정보보호정책</span>을 숙지하셔야 합니다.
                  </p>
                </div>
                <div className="socialBox">
                  <div className="social" onClick={handleKakaoLogin}>
                    <img className="socialLogo" src="/kakao.png" alt="Kakao logo" />
                    <span className="kakaoText">카카오톡으로 시작하기</span>
                  </div>
                  <div>
                    <div className="social" onClick={handleKakaoLogin}>
                      <img className="socialLogo" src="/naver.png" alt="Naver logo" />
                      <span className="naverText">네이버로 시작하기</span>
                    </div>
                  </div>
                  <div className="social">
                    <img className="socialLogo" src="/google.png" alt="google logo" />
                    <span className="googleText">구글로 시작하기</span>
                  </div>
                </div>
                <div>
                  <p className="signup-coment">이미 코멘터이신가요? <span className="Login" onClick={showLogIn}><strong>로그인</strong></span></p>
                </div>
              </main>
            ) : (
              <main>
                <h1>로그인</h1>
                <div className="login-info">
                  <p>
                    시작하기 전에, 당신은 우리의 <span className="modalStrong">이용약관</span>에 동의하셔야 하며<br />
                    또한 <span className="modalStrong">개인정보보호정책</span>을 숙지하셔야 합니다.
                  </p>
                </div>
                <div className="socialBox">
                  <div className="social" onClick={handleKakaoLogin}>
                    <img className="socialLogo" src="/kakao.png" alt="Kakao logo" />
                    <span className="kakaoText">카카오톡으로 시작하기</span>
                  </div>
                  <div>
                    <div className="social">
                      <img className="socialLogo" src="/naver.png" alt="Naver logo" />
                      <span className="naverText">네이버로 시작하기</span>
                    </div>
                  </div>
                  <div className="social">
                    <img className="socialLogo" src="/google.png" alt="google logo" />
                    <span className="googleText">구글로 시작하기</span>
                  </div>
                </div>
                <div>
                  <p className="signup-coment"><span className="modalStrong">아이디</span>나 <span className="modalStrong">패스워드</span>를 잊어 버리셨나요?<br />COMENT에 처음 방문하셨나요? <span className="Signup" onClick={showSignUp}><strong>회원가입</strong></span></p>
                </div>
              </main>
            )}

            <footer>
              <button className="close" onClick={close}>
                닫기
              </button>
            </footer>
          </section>
        ) : null}
      </div>
  );
};

export default Modal;