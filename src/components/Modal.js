import { useRef } from "react";
import "../styles/modal.css";
import { PropTypes } from 'prop-types';

const Modal = (props) => {

  Modal.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
  }

  const { open, close } = props;

  const modalRef = useRef(); // 모달 영역지정

  const closeModal = (e) => {
    if(modalRef.current && !modalRef.current.contains(e.target)) { // 모달 외부 클릭 시
    close();
    }
  };

  // oauth 요청 URL
    const handleKakaoLogin = ()=>{
        window.location.href = 'http://localhost:8000/login/kakao-login-page';
    }

    const handleNaverLogin = ()=> {
      window.location.href = 'http://localhost:8000/login/naver-login-page'
    }

    const handleGoogleLogin = ()=> {
      window.location.href = 'http://localhost:8000/login/google-login-page'
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
                    <div className="social" onClick={handleNaverLogin}>
                      <img className="socialLogo" src="/naver.png" alt="Naver logo" />
                      <span className="naverText">네이버로 시작하기</span>
                    </div>
                  </div>
                  <div className="social" onClick={handleGoogleLogin}>
                    <img className="socialLogo" src="/google.png" alt="google logo" />
                    <span className="googleText">구글로 시작하기</span>
                  </div>
                </div>
              </main>
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