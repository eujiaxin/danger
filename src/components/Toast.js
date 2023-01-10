import React from "react";
import ReactDOM from "react-dom";

const Toast = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <footer className="fixed bottom-0 text-center flex justify-center w-full ">
                    <span className=" bg-slate-800 text-gray-300 m-4 p-6 rounded">
                        "{props.text}" has been copied to clipboard.
                    </span>
                </footer>,
                document.getElementById("toast-root")
            )}
        </React.Fragment>
    );
};

export default Toast;
