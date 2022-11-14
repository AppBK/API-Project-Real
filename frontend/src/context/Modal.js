import React, { useEffect, useState, useRef, useContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import '../components/LoginFormPage/LoginForm.css'

export const ModalContext = React.createContext();

const ModalProvider = ({ children }) => {
  const [value, setValue] = useState();
  const modalRef = useRef();


  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef}/>
    </>
  );
}

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
        {children}
    </div>,
    modalNode
  );
}

export default ModalProvider;
