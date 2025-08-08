import { Button, Input, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.services";

const UserForm = (props) => {
    const { loadUser } = props;
    const [fullName, setFullName] = useState("Loc");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                message: "User Created",
                description: "Tạo user thành công",
            });
            resetAndCloseModal();
            await loadUser();
        }
        else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message),
            })
        }
        console.log(res);
    }
    const resetAndCloseModal = () => {
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setIsModalOpen(false);
    }
    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button onClick={() => setIsModalOpen(true)}
                    type="primary">Create User</Button>
            </div>
            <Modal title="Create User"
                open={isModalOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => resetAndCloseModal(false)}
                maskClosable={false}
                okText="Create"
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }} >
                    <div>
                        <span>FullName</span>
                        <Input value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Phone</span>
                        <Input
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
export default UserForm;