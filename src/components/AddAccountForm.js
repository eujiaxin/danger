import { useState } from "react";
import hash from "../utils/hash.mjs";

const AddAccountForm = (props) => {
    const [website, setWebsite] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

        const account = {
            website: website,
            username: username,
            password: password,
        };
        const newAccounts = [account, ...props.accounts];
        hash.sync_file(newAccounts, props.password);
        props.setAccounts(hash.decrypt_file(props.password));

        setWebsite("");
        setUsername("");
        setPassword("");
    };

    const darkStyle = "bg-slate-900 text-white font-mono";
    return (
        <form
            onSubmit={formSubmitHandler}
            className={`${darkStyle} flex space-x-5`}
        >
            <input
                type="text"
                className={darkStyle}
                onChange={websiteChangeHandler}
                value={website}
            />
            <br />
            <input
                type="text"
                className={darkStyle}
                onChange={usernameChangeHandler}
                value={username}
            />
            <br />
            <input
                type="text"
                className={darkStyle}
                onChange={passwordChangeHandler}
                value={password}
            />
            <br />
            <button type="submit">Add account</button>
        </form>
    );
};

export default AddAccountForm;
