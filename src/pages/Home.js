import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [enteredPassword, setEnteredPassword] = useState("");
    const [selectedFile, setSelectedFile] = useState(""); // TODO: update intitial selected file path?
    const navigate = useNavigate();

    const passwordChangeHandler = (e) => {
        setEnteredPassword(e.target.value);
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    const formSubmitHandler = (e) => {
        e.preventDefault(); // prevents page from reloading

        if (enteredPassword.trim().length > 0) {
            navigate("/account-details", {
                state: { password: enteredPassword, file: selectedFile },
            });
        }
    };

    return (
        <div className="h-screen grid place-content-center text-slate-400">
            <form onSubmit={formSubmitHandler} className="flex flex-col gap-6">
                <input
                    type="password"
                    className="bg-slate-900 border p-3 border-slate-500 focus:outline-0"
                    onChange={passwordChangeHandler}
                />
                <input
                    className="text-sm text-grey-500
            file:mr-5 file:py-2 file:px-6
            file:border-0
            file:text-sm file:font-medium
            file:bg-slate-400 file:text-neutral-900	
            hover:file:cursor-pointer hover:file:bg-slate-300
            hover:file:text-black focus:outline-0"
                    type="file"
                    onChange={fileChangeHandler}
                />
            </form>
        </div>
    );
};

export default Home;
