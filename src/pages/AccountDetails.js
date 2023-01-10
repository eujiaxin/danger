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
    const [hideDetails, setHideDetails] = useState(true);

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
        target.website = newAccount.website;
        target.username = newAccount.username;
        target.password = newAccount.password;
        writeFile(accounts);
    };

    return (
        <div className="h-screen text-slate-300">
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
            <div className="container mx-auto flex justify-center px-5">
                <div className="border-2 border-slate-800 w-11/12 flex flex-col h-128 content-start scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800 overflow-y-scroll pr-5">
                    {filteredAccounts.length === 0 && (
                        <div className="text-slate-500 w-full text-center mt-5">
                            "┏༼ ◉ ╭╮ ◉༽┓" {`What's that?!`}
                        </div>
                    )}
                    {filteredAccounts.map((e, i) => (
                        <DetailCard
                            website={e.website}
                            username={e.username}
                            password={e.password}
                            deleteAccount={deleteAccount}
                            updateAccount={updateAccount}
                            hideDetails={hideDetails}
                        />
                    ))}
                </div>
            </div>
            <div className="container mx-auto flex justify-center px-5">
                <div className="w-11/12 flex flex-col">
                    <div>
                        <span
                            className="text-blue-500 underline hover:cursor-pointer"
                            onClick={() => setHideDetails(!hideDetails)}
                        >
                            {hideDetails ? "Show" : "Hide"} details
                        </span>
                    </div>
                    <div>
                        <Link className="text-blue-500 underline h-10" to="/">
                            Re-enter password
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;
