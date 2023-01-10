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

    return (
        <>
            {showEditModal && (
                <Modal
                    title="Edit Account Credential"
                    message="Update the selected account as below?"
                    website={website}
                    username={username}
                    password={password}
                    onConfirm={formSubmitHandler}
                    onDeny={() => {
                        setShowEditModal(false);
                        props.setIsEditing(false);
                    }}
                />
            )}

            <form className="p-3 grid md:grid-cols-12 grid-cols-1 gap-2 place-self-stretch">
                <input
                    type="text"
                    className="md:col-span-3 md:break-words bg-slate-900 border-b border-slate-400 focus:outline-0"
                    onChange={websiteChangeHandler}
                    value={website}
                />
                <input
                    type="text"
                    className="md:col-span-3 md:break-words bg-slate-900 border-b border-slate-400 focus:outline-0"
                    onChange={usernameChangeHandler}
                    value={username}
                />
                <input
                    type="text"
                    className="md:col-span-3 md:break-words bg-slate-900 border-b border-slate-400 focus:outline-0"
                    onChange={passwordChangeHandler}
                    value={password}
                />
                <button
                    className="col-end-13 text-slate-400"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowEditModal(true);
                    }}
                >
                    Save
                </button>
            </form>
        </>
    );
};

export default UpdateAccountForm;
