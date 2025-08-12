import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Popconfirm, notification } from 'antd';
import { useState } from 'react';
import UpdateUserModal from './update.user.modal';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../../services/api.services';
const UserTable = (props) => {
    const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a href='#' onClick={() => {
                        setIsDetailOpen(true);
                        setDataDetail(record);
                    }}>{record._id}</a>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }} >
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}
                        style={{ cursor: "pointer", color: "orange" }} />
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => {
                            handleDeleteUser(record._id)
                        }}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    ><DeleteOutlined style={{ cursor: "pointer", color: "red" }} /></Popconfirm>
                </div>
            ),
        },
    ];

    const handleDeleteUser = async (_id) => {
        const res = await deleteUserAPI(_id);
        if (res.data) {
            notification.success({
                message: "Success",
                description: "User deleted successfully"
            });
            await loadUser();
        }
        else {
            notification.error({
                message: "Error",
                description: JSON.stringify(res.message)
            });
        }
    }

    const onChange = (pagination, filters, sorter, extra) => {
        //Nếu trang thay đổi
        if (pagination && pagination.current) {
            if (+pagination.currrent !== +current) {
                setCurrent(+pagination.current)
            }
        }
        //Nếu thay đổi tổng số phần tử
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setCurrent(+pagination.pageSize)
            }
        }
        return (
            <>
                <Table
                    columns={columns}
                    dataSource={dataUsers}
                    rowKey={""}
                    pagination={
                        {
                            current: current,
                            pageSize: pageSize,
                            showSizeChanger: true,
                            total: total,
                            showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                        }}
                    onChange={onChange}
                />
                <UpdateUserModal
                    isModalUpdateOpen={isModalUpdateOpen}
                    setIsModalUpdateOpen={setIsModalUpdateOpen}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    loadUser={loadUser}
                />
                <ViewUserDetail
                    isDetailOpen={isDetailOpen}
                    setIsDetailOpen={setIsDetailOpen}
                    dataDetail={dataDetail}
                    setDataDetail={setDataDetail}
                    loadUser={loadUser}
                />
            </>
        );
    }
}
export default UserTable;