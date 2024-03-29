// TODO : 로그인 페이지
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from "../components/Modal";
import "../styles/modal.css";
import { Cookies } from "react-cookie";
import useAuth from "../Auth";
//모달여는 버튼 생성
function LoginPage() {

    const [modalOpen, setModalOpen] = useState(false)
    const cookies = new Cookies();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

  const openModal = () => {
    setModalOpen(true)
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // Modal.propTypes = {
  //   open: PropTypes.bool,
  //   close: PropTypes.func,
  // }  modal.js에서 propTypes수정해야함 이거안하면 버튼누를때마다 콘솔에 오류뿜뿜!

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


  const a = JSON.parse(sessionStorage.getItem('userinfo') || '{}');
  const b = (sessionStorage.getItem('userinfo') || '{}');
  // sessionStore에 저장되어있는 Item인 userinfo를 get 하여 key값을 parse해 json형식으로 가져옮
  // 따라서 a.key값을 입력하면 userinfo의 key와 연결된 값을 가져올 수 있음 예) a.email 은 userinfo의 email:xx@xx.com 출력
  // 만일 userinfo값을 불러오지 못하면 빈 배열을 출력함으로써 에러방지

  if (isLoggedIn) {
        // 로그인 상태일 때 로그아웃과 a에 지정한 userinfo의 값들을 반환
        return (
            <React.Fragment>
                <button className="modalButton" onClick={logout}><strong>Log out</strong></button>
                <div>{a.nickname}</div>
                <div>{a.email}</div>
                <div>{a.socialType}</div>
                <div>{b}</div>
            </React.Fragment>
        );
    } else {
        // 로그아웃 상태일 때 로그인을 반환
        return (
            <React.Fragment>
                <button className="modalButton" onClick={openModal}><strong>Log In</strong></button>
                <Modal open={modalOpen} close={closeModal}></Modal>
            </React.Fragment>
        );
    }
}

export default LoginPage;
