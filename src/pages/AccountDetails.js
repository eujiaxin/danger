import { Link, useLocation } from "react-router-dom";
import hash from "../utils/hash.mjs";
import AddAccountForm from "../components/AddAccountForm.js";
import { useState } from "react";
import DetailCard from "../components/DetailCard.js";

const AccountDetails = () => {
    const { state } = useLocation();
    const { password } = state;
    const [accounts, setAccounts] = useState(hash.decrypt_file(password));

    const deleteAccount = (account) => {
        const resAccounts = accounts.filter(
            (e) =>
                e.website !== account.website ||
                e.username !== account.username ||
                e.password !== account.password
        );
        hash.sync_file(resAccounts, password);
        setAccounts(hash.decrypt_file(password));
    };

    return (
        <div className="h-screen bg-slate-900 text-white font-mono">
            <AddAccountForm
                accounts={accounts}
                password={password}
                setAccounts={setAccounts}
            />
            <div>
                <br />
                {accounts.map((e, i) => (
                    <DetailCard
                        website={e.website}
                        username={e.username}
                        password={e.password}
                        deleteAccount={deleteAccount}
                    />
                ))}
            </div>
            <br />
            <footer>
                <Link className="text-blue-500 underline h-10" to="/">
                    Re-enter password
                </Link>
            </footer>
        </div>
    );
};

export default AccountDetails;
