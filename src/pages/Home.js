import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="h-screen bg-slate-900 grid place-content-center text-white font-mono">
            <form onSubmit={formSubmitHandler}>
                <input
                    type="password"
                    className="bg-slate-900 "
                    onChange={passwordChangeHandler}
                />
            </form>
            {/* {enteredPassword} */}
        </div>
    );
};

export default Home;
