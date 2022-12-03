import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

import { decode_str, sync_file } from "../utils/encode.mjs";

const Home = () => {
    const [enteredPassword, setEnteredPassword] = useState("");

    const navigate = useNavigate();

    const passwordChangeHandler = (e) => {
        setEnteredPassword(e.target.value);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault(); // prevents page from reloading

        // TODO: form validation - empty input

        navigate("/account-details", { state: { password: enteredPassword } });
    };

    return (
        <>
            <form onSubmit={formSubmitHandler}>
                <input
                    type="password"
                    className={`${styles.input} ${styles.centered}`}
                    onChange={passwordChangeHandler}
                />
            </form>

            <span className={styles.centered2}>{enteredPassword}</span>
        </>
    );
};

export default Home;
