const DetailCard = (prop) => {
    const copyUsernameHandler = () => {
        navigator.clipboard.writeText(prop.username);
    };

    const copyPasswordHandler = () => {
        navigator.clipboard.writeText(prop.password);
    };

    const detailStyle =
        "bg-slate-700 text-slate-700 hover:bg-slate-900 hover:text-white hover:cursor-pointer";

    return (
        <>
            <ul className="p-3 inline-grid">
                <li>{prop.website}</li>
                <li className={detailStyle} onClick={copyUsernameHandler}>
                    {prop.username}
                </li>
                <li className={detailStyle} onClick={copyPasswordHandler}>
                    {prop.password}
                </li>
            </ul>
        </>
    );
};

export default DetailCard;
