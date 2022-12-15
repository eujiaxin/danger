import { Link, useLocation } from "react-router-dom";
import hash from "../utils/hash.mjs";
import AddAccountForm from "../components/AddAccountForm.js";
import { useState } from "react";

const AccountDetails = () => {
    const { state } = useLocation();
    const { password } = state;
    const [accounts, setAccounts] = useState(hash.decrypt_file(password));

    return (
        <>
            <Link to="/">Re-enter password</Link>
            <div>
                {password}
                <br />
                {accounts.map((e) => (
                    <div>
                        {e.website}|{e.username}|{e.password}
                    </div>
                ))}
            </div>
            <br />
            <AddAccountForm
                accounts={accounts}
                password={password}
                setAccounts={setAccounts}
            />
        </>
    );
};

export default AccountDetails;
