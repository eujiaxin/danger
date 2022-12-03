import { Link, useLocation } from "react-router-dom";
const AccountDetails = () => {
    const { state } = useLocation();
    const { password } = state;

    // TODO: use password to render account details

    return (
        <>
            <Link to="/">Re-enter password</Link>
            <div>
                This is account details page. Your password is: {password}
            </div>
        </>
    );
};

export default AccountDetails;
