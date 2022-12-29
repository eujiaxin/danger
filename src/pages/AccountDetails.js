import { Link, useLocation } from "react-router-dom";
import hash from "../utils/hash.mjs";
import AddAccountForm from "../components/AddAccountForm.js";
import { useEffect, useState } from "react";
import DetailCard from "../components/DetailCard.js";
import SearchBar from "../components/SearchBar.js";

const AccountDetails = () => {
    const { state } = useLocation();
    const { password } = state;
    const [accounts, setAccounts] = useState(hash.decrypt_file(password));
    const [searchInput, setSearchInput] = useState("");
    const [filteredAccounts, setFilteredAccounts] = useState(accounts);

    useEffect(() => {
        const res = accounts.filter((e) =>
            e.website.toLowerCase().includes(searchInput.toLowerCase())
        );

        setFilteredAccounts(res);
    }, [accounts, searchInput]);

    const deleteAccount = (account) => {
        const resAccounts = accounts.filter(
            (e) =>
                e.website !== account.website ||
                e.username !== account.username ||
                e.password !== account.password
        );
        writeFile(resAccounts);
    };

    const writeFile = (accounts) => {
        hash.sync_file(accounts, password);
        setAccounts(hash.decrypt_file(password));
    };

    const updateAccount = (account, newAccount) => {
        const target = accounts.find(
            (e) => JSON.stringify(e) === JSON.stringify(account)
        );
        console.log("target", target);
        target.website = newAccount.website;
        target.username = newAccount.username;
        target.password = newAccount.password;
        writeFile(accounts);
    };

    return (
        <div className="h-screen bg-slate-900 text-white font-mono">
            <AddAccountForm
                accounts={accounts}
                password={password}
                setAccounts={setAccounts}
            />
            <SearchBar
                accounts={accounts}
                setSearchInput={setSearchInput}
                setFilteredAccounts={setFilteredAccounts}
            />
            <div>
                {filteredAccounts.map((e, i) => (
                    <DetailCard
                        website={e.website}
                        username={e.username}
                        password={e.password}
                        deleteAccount={deleteAccount}
                        updateAccount={updateAccount}
                    />
                ))}
            </div>
            <footer>
                <Link className="text-blue-500 underline h-10" to="/">
                    Re-enter password
                </Link>
            </footer>
        </div>
    );
};

export default AccountDetails;
