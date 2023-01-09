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
    };

    const darkStyle = "bg-slate-900 text-white font-mono";
    const inputStyle = "border-b focus:outline-0";

    return (
        <div className="container mx-auto p-5 flex justify-center">
            <form
                onSubmit={formSubmitHandler}
                className={`${darkStyle} border-2 border-slate-800 md:w-3/4 w-11/12`}
            >
                <input
                    type="text"
                    className={`${inputStyle} ${darkStyle}`}
                    onChange={websiteChangeHandler}
                    value={website}
                />
                <input
                    type="text"
                    className={`${inputStyle} ${darkStyle}`}
                    onChange={usernameChangeHandler}
                    value={username}
                />
                <input
                    type="text"
                    className={`${inputStyle} ${darkStyle}`}
                    onChange={passwordChangeHandler}
                    value={password}
                />
                <button
                    type="submit"
                    className="border rounded-full h-10 w-10 hover:bg-slate-800 shrink"
                >
                    +
                </button>
            </form>
        </div>
    );
};

export default AddAccountForm;
