import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUsersAPI } from "../services/api.services";

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    //empty array  => run once
    useEffect(() => {
        loadUser();
    }, [current]);
    const loadUser = async () => {
        const res = await fetchAllUsersAPI(current, pageSize);
        if (res.data.data) {
            setDataUsers(res.data.data.result);
            setCurrent(res.data.data.meta.current);
            setPageSize(res.data.data.meta.pageSize);
            setTotal(res.data.data.meta.total);
        }
    }
    return (
        <div style={{ padding: "20px" }}>
            <UserForm
                loadUser={loadUser}
            />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />
        </div>
    );
}

export default UserPage;