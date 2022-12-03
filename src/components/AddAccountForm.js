import { useState } from "react";
const AddAccountForm = () => {
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
        const account = {
            website: website,
            username: username,
            password: password,
        };

        console.log(account); // TODO: check if this is correct + use account information to write to text file
    };
    return (
        <form onSubmit={formSubmitHandler}>
            <input type="text" onChange={websiteChangeHandler} />
            <br />
            <input type="text" onChange={usernameChangeHandler} />
            <br />
            <input type="text" onChange={passwordChangeHandler} />
            <br />
            <button type="submit">Add account</button>
        </form>
    );
};

export default AddAccountForm;
