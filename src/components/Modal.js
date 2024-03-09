import React, { useState, useRef } from "react";
import "../styles/modal.css";

const Modal = (props) => {
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
      close();
    }
  };

  return (
    <div className={open ? "openModal modal" : "modal"} onClick={closeModal}>
      {open ? (
        <section ref={modalRef}>
          <header>
            Co-MenT
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          {isSignUp ? (
            <main>
              <h1>Sign Up</h1>
              <div>
                <p>
                  By continuing, you agree to our User Agreement and acknowledge
                  that you understand the Privacy Policy.
                </p>
              </div>
              <div className="modalCenter">
              <div>
                <button>kakao</button>
              </div>
              <div>
                <button>naver</button>
              </div>
              <div>
                <button>google</button>
              </div>
              </div>
              <div>
                <p className="modalCenter">Already have an account? <span className="modalStrong" onClick={showLogIn}>Log In</span></p>
              </div>
            </main>
          ) : (
            <main>
              <h1>Log In</h1>
              <div>
                <p>
                  By continuing, you agree to our User Agreement and acknowledge
                  that you understand the Privacy Policy.
                </p>
              </div>
              <div className="modalCenter">
              <div>
                <button>kakao</button>
              </div>
              <div>
                <button>naver</button>
              </div>
              <div>
                <button>google</button>
              </div>
              </div>
              <div>
                <p className="modalCenter">New to Co-Ment? <span className="modalStrong" onClick={showSignUp}>Sign Up</span></p>
              </div>
            </main>
          )}

          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;