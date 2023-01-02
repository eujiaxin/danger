import { useState } from "react";
import Modal from "./Modal";

const UpdateAccountForm = (props) => {
    const originalAccount = {
        website: props.website,
        username: props.username,
        password: props.password,
    };
    const [website, setWebsite] = useState(props.website);
    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState(props.password);
    const [showEditModal, setShowEditModal] = useState(false);

    const websiteChangeHandler = (e) => {
        setWebsite(e.target.value);
    };

    const usernameChangeHandler = (e) => {
        setUsername(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (
            website.length === 0 ||
            username.length === 0 ||
            password.length === 0
        ) {
            return;
        }

        props.updateAccount(originalAccount, { website, username, password });

        setShowEditModal(false);
        props.setIsEditing(false);
    };

    const darkStyle = "bg-slate-900 text-white font-mono";
    return (
        <>
            {showEditModal && (
                <Modal
                    title="Edit"
                    message="Edit this?"
                    onConfirm={formSubmitHandler}
                    onDeny={() => {
                        setShowEditModal(false);
                    }}
                />
            )}

            <form className={`${darkStyle} inline-grid`}>
                <input
                    type="text"
                    className={darkStyle}
                    onChange={websiteChangeHandler}
                    value={website}
                />
                <input
                    type="text"
                    className={darkStyle}
                    onChange={usernameChangeHandler}
                    value={username}
                />
                <input
                    type="text"
                    className={darkStyle}
                    onChange={passwordChangeHandler}
                    value={password}
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setShowEditModal(true);
                    }}
                >
                    Save Edit
                </button>
            </form>
        </>
    );
};

export default UpdateAccountForm;
