import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUsersAPI } from "../services/api.services";

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);
    //empty array  => run once
    useEffect(() => {
        loadUser();
    }, []);
    const loadUser = async () => {
        const res = await fetchAllUsersAPI();
        console.log(res);
        setDataUsers(res.data.data);
    }
    return (
        <div style={{ padding: "20px" }}>
            <UserForm
                loadUser={loadUser}
            />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser}
            />
        </div>
    );
}

export default UserPage;