import { Button, Input } from "antd";
import axios from "axios";
import { useState } from "react";

const UserForm = () => {
    const [fullName, setFullName] = useState("Loc");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const handleClickBtn = () => {
        const URL_BACKEND = "http://localhost:8080/api/v1/user";
        const accessToken = '';
        const data = {
            fullName,
            email,
            password,
            phone
        };
        axios.post(URL_BACKEND, data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
    }
    return (
        <div className="user-form">
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
                <div>
                    <Button onClick={handleClickBtn}
                        type="primary">Create User</Button>
                </div>
            </div>
        </div>
    );
}
export default UserForm;