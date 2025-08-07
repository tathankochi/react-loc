import { Space, Table, Tag } from 'antd';
import { fetchAllUsersAPI } from '../../services/api.services';
import { useEffect, useState } from 'react';
const UserTable = () => {
    const [dataUsers, setDataUsers] = useState([]);
    //empty array  => run once
    useEffect(() => {
        console.log("Run 111");
        loadUser();
    }, []);
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
    ];
    //     {
    //         key: '1',
    //         name: 'John Brown',
    //         age: 32,
    //         address: 'New York No. 1 Lake Park',
    //         tags: ['nice', 'developer'],
    //     },
    //     {
    //         key: '2',
    //         name: 'Jim Green',
    //         age: 42,
    //         address: 'London No. 1 Lake Park',
    //         tags: ['loser'],
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sydney No. 1 Lake Park',
    //         tags: ['cool', 'teacher'],
    //     },
    // ];
    const loadUser = async () => {
        const res = await fetchAllUsersAPI();
        console.log(res);
        setDataUsers(res.data.data);
    }
    console.log("Run 222");
    return (
        <Table columns={columns}
            dataSource={dataUsers}
            rowKey={""}
        />
    );
}

export default UserTable;