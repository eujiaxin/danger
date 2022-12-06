import { useState } from "react";
import encode from "../utils/encode.mjs";

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
        encode.sync_file(newAccounts, props.password);
        props.setAccounts(encode.decrypt_file(props.password));

        setWebsite("");
        setUsername("");
        setPassword("");
    };
    return (
        <form onSubmit={formSubmitHandler}>
            <input
                type="text"
                onChange={websiteChangeHandler}
                value={website}
            />
            <br />
            <input
                type="text"
                onChange={usernameChangeHandler}
                value={username}
            />
            <br />
            <input
                type="text"
                onChange={passwordChangeHandler}
                value={password}
            />
            <br />
            <button type="submit">Add account</button>
        </form>
    );
};

export default AddAccountForm;
