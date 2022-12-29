import { useState } from "react";
import hash from "../utils/hash.mjs";

const UpdateAccountForm = (props) => {
    const originalAccount = {
        website: props.website,
        username: props.username,
        password: props.password,
    };
    const [website, setWebsite] = useState(props.website);
    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState(props.password);

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
        // FIXME: update field, not add new

        props.updateAccount(originalAccount, { website, username, password });

        // TODO: change field back to detail card
        props.setIsEditing(false);
    };

    const darkStyle = "bg-slate-900 text-white font-mono";
    return (
        <form
            onSubmit={formSubmitHandler}
            className={`${darkStyle} inline-grid`}
        >
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
            <button type="submit" onClick={formSubmitHandler}>
                Save Edit
            </button>
        </form>
    );
};

export default UpdateAccountForm;
