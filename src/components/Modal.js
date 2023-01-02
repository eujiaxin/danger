import styles from "./Modal.module.css";
import React from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onClick}></div>;
};

const ModalOverlay = (props) => {
    return (
        <div className={`${styles.modal} text-white`}>
            <header>{props.title}</header>
            <div className="">{props.message}</div>
            <footer className={styles.actions}>
                <button onClick={props.onDeny}>Cancel</button>
                <button onClick={props.onConfirm}>Confirm</button>
            </footer>
        </div>
    );
};
const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} onClick={props.onDeny} />,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    title={props.title}
                    message={props.message}
                    onConfirm={props.onConfirm}
                    onDeny={props.onDeny}
                />,
                document.getElementById("overlay-root")
            )}
        </React.Fragment>
    );
};

export default Modal;
