import React, { useState, forwardRef, useImperativeHandle } from 'react';
import './modal.scss';

const Modal = forwardRef(({ children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    const modal = document.getElementById("myModal");
    if (isOpen) {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'block';
    }
    setIsOpen(!isOpen);
  };

  useImperativeHandle(ref, () => ({
    toggleModal,
  }));

  return (
    <>
      <div className='modal' id='myModal'>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </>
  );
});

export default Modal;
