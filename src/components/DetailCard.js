import { useState } from "react";
import Modal from "./Modal";
import SensitiveCredential from "./SensitiveCredential";
import Toast from "./Toast";
import UpdateAccountForm from "./UpdateAccountForm";

const DetailCard = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [copiedText, setCopiedText] = useState("");
    const [showToast, setShowToast] = useState(false);

    // TODO: add debouncer for copied text toast?

    const editHandler = (e) => {
        setIsEditing(!isEditing);
    };

    const copyUsernameHandler = () => {
        navigator.clipboard.writeText(props.username);
        setCopiedText(
            `Username for ${props.website} has been copied to clipboard.`
        );
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 4000);
    };

    const copyPasswordHandler = () => {
        navigator.clipboard.writeText(props.password);
        setCopiedText(
            `Password for ${props.website} has been copied to clipboard.`
        );
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 4000);
    };

    const deleteHandler = (e) => {
        props.deleteAccount(props);
        setShowDeleteModal(false);
    };

    const detailStyle =
        "hover:cursor-pointer text-transparent bg-slate-700 select-none";

    return (
        <>
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
                    <div className="col-span-3 md:break-words md:col-span-2">
                        {props.website}
                    </div>
                    <SensitiveCredential
                        text={props.username}
                        copyHandler={copyUsernameHandler}
                        hideDetails={props.hideDetails}
                    />
                    <SensitiveCredential
                        text={props.password}
                        copyHandler={copyPasswordHandler}
                        hideDetails={props.hideDetails}
                    />

                    <div className="lg:col-end-12 col-end-11">
                        <button onClick={editHandler}>Edit</button>
                    </div>
                    <div className="lg:col-end-13 col-end-12">
                        <button
                            className="text-rose-700"
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}

            {showToast && <Toast text={copiedText} />}
        </>
    );
};

export default DetailCard;
