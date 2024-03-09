// TODO : 로그인 페이지
import React, { useState } from "react"
import Modal from "../components/Modal"
import "../styles/modal.css";
//모달여는 버튼 생성
function LoginPage() {

    const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false);
    
  }

  return (
    <React.Fragment>
      <button className="modalButton" onClick={openModal}><strong>Log In</strong></button>
      <Modal open={modalOpen} close={closeModal}>
      </Modal>
    </React.Fragment>
  )
}

export default LoginPage;
