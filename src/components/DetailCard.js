import { useState } from "react";
import Modal from "./Modal";
import UpdateAccountForm from "./UpdateAccountForm";

const DetailCard = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const editHandler = (e) => {
        setIsEditing(!isEditing);
    };

    const copyUsernameHandler = () => {
        navigator.clipboard.writeText(props.username);
    };

    const copyPasswordHandler = () => {
        navigator.clipboard.writeText(props.password);
    };

    const deleteHandler = (e) => {
        props.deleteAccount(props);
        setShowDeleteModal(false);
    };

    const detailStyle =
        "bg-slate-700 text-slate-700 hover:bg-slate-900 hover:text-white hover:cursor-pointer";

    return (
        <>
            {showDeleteModal && (
                <Modal
                    title="Delete Account Credential"
                    message={`${"Delete the selected account?"}`}
                    onConfirm={deleteHandler}
                    onDeny={() => {
                        setShowDeleteModal(false);
                    }}
                />
            )}

            {isEditing ? (
                <UpdateAccountForm
                    website={props.website}
                    username={props.username}
                    password={props.password}
                    setIsEditing={setIsEditing}
                    updateAccount={props.updateAccount}
                />
            ) : (
                <ul className="p-3 inline-grid">
                    <li>{props.website}</li>
                    <li
                        className={
                            props.hideDetails
                                ? detailStyle
                                : "hover:bg-slate-800 hover:cursor-pointer"
                        }
                        onClick={copyUsernameHandler}
                    >
                        {props.username}
                    </li>
                    <li
                        className={
                            props.hideDetails
                                ? detailStyle
                                : "hover:bg-slate-800 hover:cursor-pointer"
                        }
                        onClick={copyPasswordHandler}
                    >
                        {props.password}
                    </li>
                    <li>
                        <button onClick={editHandler}>Edit</button>
                    </li>
                    <li>
                        <button
                            className="text-rose-700"
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Delete
                        </button>
                    </li>
                </ul>
            )}
        </>
    );
};

export default DetailCard;
