import { useEffect, useState } from "react";

const SensitiveCredential = (props) => {
    const [isCensor, setIsCensor] = useState(false);

    const detailStyle = "text-transparent bg-slate-700 select-none";

    const censorHandler = () => {
        if (props.hideDetails) {
            setIsCensor((prevState) => !prevState);
        }
    };

    useEffect(() => {
        if (props.hideDetails) {
            setIsCensor(true);
        } else {
            setIsCensor(false);
        }
    }, [props.hideDetails]);

    return (
        <div
            className={`md:col-span-3 md:break-words hover:cursor-pointer ${
                isCensor ? detailStyle : "hover:bg-slate-800 "
            }`}
            onClick={props.copyHandler}
            onDoubleClick={censorHandler}
        >
            {props.text}
        </div>
    );
};

export default SensitiveCredential;
