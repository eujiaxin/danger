import { Link, useLocation } from "react-router-dom";
import encode from "../utils/encode.mjs";
import AddAccountForm from "../components/AddAccountForm.js";
const AccountDetails = () => {
    // FIXME: better way to store password? password is null upon any reload
    const { state } = useLocation();
    const { password } = state;

    const detailsList = encode.decrypt_file(password);

    return (
        <>
            <Link to="/">Re-enter password</Link>
            <div>
                {password}
                <br />
                {Array.isArray(detailsList) && detailsList.length > 0
                    ? detailsList.map((e) => (
                          <div>
                              {e.website}|{e.username}|{e.password}
                          </div>
                      ))
                    : detailsList}
            </div>
            <br />
            <AddAccountForm />
        </>
    );
};

export default AccountDetails;
