import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { handleUpdateFile, updateUserAvatarAPI } from "../../services/api.services";
const ViewUserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail, loadUser } = props;

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }
    const handleUpdateUserAvatar = async () => {
        const resUpload = await handleUpdateFile(selectedFile, "avatar");
        console.log("resUpload", resUpload);
        if (resUpload.data) {
            const newAvatar = resUpload.data.data.fileUploaded;
            console.log("newAvatar", newAvatar);
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone);
            console.log("res", resUpdateAvatar);
            if (resUpdateAvatar.data) {
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();

                notification.success({
                    message: "Update Avatar Success",
                    description: "Cập nhật avatar thành công",
                });
            }
            else {
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resUpdateAvatar.message),
                });
            }
        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
    }
    console.log(preview);
    return (
        <>
            {dataDetail ?
                <Drawer
                    width={"40vw"}
                    title="Basic Drawer"
                    closable={{ 'aria-label': 'Close Button' }}
                    onClose={() => {
                        setIsDetailOpen(false);
                        setDataDetail(null);
                    }}
                    open={isDetailOpen}
                >
                    <p>Id: {dataDetail._id}</p>
                    <br />
                    <p>Full name:{dataDetail.fullName}</p>
                    <br />
                    <p>Email: {dataDetail.email}</p>
                    <br />
                    <p>Phone number: {dataDetail.phone}</p>
                    <br />
                    <p>Avatar:</p>
                    <div>
                        <img style={{
                            width: "150px",
                            height: "100px",
                            marginTop: "10px",
                            border: "1px solid #ccc",
                        }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                    </div>
                    <div>
                        <label htmlFor="btnUpload" style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "10px",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>Upload Avatar</label>
                        <input type="file"
                            hidden id="btnUpload"
                            onChange={handleOnChangeFile}
                        />
                    </div>
                    {preview &&
                        <>
                            <div>
                                <img style={{
                                    width: "150px",
                                    height: "100px",
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                }}
                                    src={preview} />
                            </div>
                            <Button type="primary"
                                onClick={() => handleUpdateUserAvatar()}
                            >Save</Button>
                        </>}
                </Drawer >
                :
                <p>Không có dữ liệu</p>
            }
        </>
    );
}

export default ViewUserDetail;