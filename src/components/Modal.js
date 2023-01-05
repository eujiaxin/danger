import React from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
    return (
        <div
            className="fixed top-0 left-0 w-full h-screen z-10 bg-black/75"
            onClick={props.onClick}
        ></div>
    );
};

const ModalOverlay = (props) => {
    return (
        <>
            <div className="text-white font-mono mx-auto sm:w-3/4 md:w-2/4 fixed inset-x-0 top-20 z-50 overflow-hidden">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 relative flex flex-col w-full bg-slate-900/75 outline-none focus:outline-none">
                        <header className="relative p-5 flex-auto">
                            {props.title}
                        </header>
                        <div className="relative p-6 flex-auto">
                            {props.message}
                        </div>

                        <footer className="flex items-center justify-end p-6">
                            <button
                                className="px-5 text-white/80"
                                onClick={props.onDeny}
                            >
                                Ignore
                            </button>
                            <button className="mx-5" onClick={props.onConfirm}>
                                Confirm
                            </button>
                        </footer>
                    </div>
                </div>
            </div>
        </>
        // <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-white font-mono">
        //     <header>{props.title}</header>
        //     <div className="">{props.message}</div>
        //     <footer className="">
        //         <button onClick={props.onDeny}>Cancel</button>
        //         <button onClick={props.onConfirm}>Confirm</button>
        //     </footer>
        // </div>
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
