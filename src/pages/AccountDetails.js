import { Link, useLocation } from "react-router-dom";
import encode from "../utils/encode.mjs";
import DetailCard from "../components/DetailCard.js";
const AccountDetails = () => {
    const { state } = useLocation();
    const { password } = state;

    // TODO: use password to render account details
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
                    : "NO"}
            </div>
        </>
    );
};

export default AccountDetails;
