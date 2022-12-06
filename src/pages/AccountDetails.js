import { Link, useLocation } from "react-router-dom";
import encode from "../utils/encode.mjs";
import AddAccountForm from "../components/AddAccountForm.js";
import { useState } from "react";

const AccountDetails = () => {
    const { state } = useLocation();
    const { password } = state;
    const [accounts, setAccounts] = useState(encode.decrypt_file(password));

    return (
        <>
            <Link to="/">Re-enter password</Link>
            <div>
                {password}
                <br />
                {Array.isArray(accounts) && accounts.length > 0
                    ? accounts.map((e) => (
                          <div>
                              {e.website}|{e.username}|{e.password}
                          </div>
                      ))
                    : accounts}
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
