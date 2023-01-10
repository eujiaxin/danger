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
        <div className="grow">
            {showDeleteModal && (
                <Modal
                    title="Delete Account Credential"
                    message="Are you sure you want to delete the following account?"
                    website={props.website}
                    username={props.username}
                    password={props.password}
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
                <div className="p-3 grid md:grid-cols-12 grid-cols-1 gap-2 place-self-stretch">
                    <div className="col-span-3 md:break-words">
                        {props.website}
                    </div>
                    <div
                        className={`md:col-span-3 md:break-words ${
                            props.hideDetails
                                ? detailStyle
                                : "hover:bg-slate-800 hover:cursor-pointer"
                        }`}
                        onClick={copyUsernameHandler}
                    >
                        {props.username}
                    </div>
                    <div
                        className={`md:col-span-3 break-words ${
                            props.hideDetails
                                ? detailStyle
                                : "hover:bg-slate-800 hover:cursor-pointer"
                        }`}
                        onClick={copyPasswordHandler}
                    >
                        {props.password}
                    </div>
                    <div className="col-end-12">
                        <button onClick={editHandler}>Edit</button>
                    </div>
                    <div className="col-end-13">
                        <button
                            className="text-rose-700"
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailCard;
