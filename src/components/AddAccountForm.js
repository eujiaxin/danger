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

    const inputStyle = "bg-slate-900 border-b border-slate-400 focus:outline-0";

    return (
        <div className="container mx-auto p-5 flex justify-center">
            <form
                onSubmit={formSubmitHandler}
                className="lg:w-3/4 w-full flex flex-wrap justify-end gap-2 gap-x-6"
            >
                <input
                    type="text"
                    className={`${inputStyle} w-36 lg:w-auto`}
                    onChange={websiteChangeHandler}
                    value={website}
                />
                <input
                    type="text"
                    className={`${inputStyle} w-36 lg:w-auto`}
                    onChange={usernameChangeHandler}
                    value={username}
                />
                <input
                    type="text"
                    className={`${inputStyle} w-36 lg:w-auto`}
                    onChange={passwordChangeHandler}
                    value={password}
                />
                <div className="pt-3">
                    <button
                        type="submit"
                        className="border border-slate-300 rounded-full h-9 w-9 hover:bg-slate-800"
                    >
                        +
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAccountForm;
