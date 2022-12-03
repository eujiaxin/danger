import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

import encode from '../utils/encode.mjs'

const Home = () => {
    const [enteredPassword, setEnteredPassword] = useState("");

    const navigate = useNavigate();

    const passwordChangeHandler = (e) => {
        setEnteredPassword(e.target.value);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault(); // prevents page from reloading

        if (enteredPassword.trim().length > 0) {
            navigate("/account-details", {
                state: { password: enteredPassword },
            });
        }
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
