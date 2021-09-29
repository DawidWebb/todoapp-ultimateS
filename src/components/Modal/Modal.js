import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import styles from "./modal.module.scss";

function Modal({ children, isModalOpen, handleOnCloseModal }) {
  const spinner = useSelector((store) => store.spinner);
  const task = useSelector((store) => store.task[0].isModalOpen);

  console.log(spinner, task);

  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }

    const { current: modal } = modalRef;
    if (isModalOpen) {
      previousActiveElement.current = document.activeElement;
      modal.style.display = "block";
    } else if (previousActiveElement.current) {
      modal.style.display = "none";
      previousActiveElement.current.focus();
    }
  }, [isModalOpen]);

  useEffect(() => {
    const { current: modal } = modalRef;
    const handleCancel = (event) => {
      event.preventDefault();
      handleOnCloseModal();
    };
    modal.addEventListener("cancel", handleCancel);
    return () => {
      modal.removeEventListener("cancel", handleCancel);
    };
  }, [handleOnCloseModal]);

  const handleOutsideClick = ({ target }) => {
    const { current } = modalRef;
    if (target === current) {
      handleOnCloseModal();
    }
  };

  return createPortal(
    <div
      className={styles.modal}
      ref={modalRef}
      onClick={spinner || task ? null : handleOutsideClick}
    >
      <div className={styles.wrapper}>{children}</div>
    </div>,
    document.querySelector("#modal")
  );
}

export default Modal;
