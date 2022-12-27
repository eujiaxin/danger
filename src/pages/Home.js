import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

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
        <div className="h-screen bg-slate-900">
            <form onSubmit={formSubmitHandler}>
                <input
                    type="password"
                    className={`${styles.input} ${styles.centered} bg-slate-900 text-white`}
                    onChange={passwordChangeHandler}
                />
            </form>

            <span className={`${styles.centered2} text-white font-mono`}>
                {enteredPassword}
            </span>
        </div>
    );
};

export default Home;
