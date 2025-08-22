import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, notification, Popconfirm, Table } from 'antd';
import { useState } from 'react';
import BookDetail from './book.detail';
import CreateBookControl from './create.book.control';
import CreateBookUncontrol from './create.book.uncontrol';
import UpdateBookControl from './update.book.control';
import UpdateBookUncontrol from './update.book.uncontrol';
import { deleteBookAPI } from '../../services/api.services';

const BookTable = (props) => {
    const { dataBooks, current, setCurrent, pageSize, setPageSize, total, loadBook } = props;
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => (
                <>{(index + 1) + pageSize * (current - 1)}</>
            )
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => (
                <a
                    onClick={() => {
                        setIsDetailOpen(true);
                        setDataDetail(record);
                    }}
                >{record._id}</a>
            )
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author'
        },
        {
            title: 'Action',
            render: (_, record) => (
                <div style={{
                    display: "flex",
                    gap: "20px",
                }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record);
                            setIsUpdateOpen(true);
                        }}
                    />
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
                </div >
            ),
        },
    ];

    const handleDeleteUser = async (_id) => {
        const res = await deleteBookAPI(_id);
        if (res.data) {
            notification.success({
                message: "Success",
                description: "Book deleted successfully"
            });
            await loadBook();
        }
        else {
            notification.error({
                message: "Error",
                description: JSON.stringify(res.message)
            });
        }
    }

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("🚀 ~ onChange ~ pagination:", pagination)
        //Nếu trang thay đổi
        if (pagination && pagination.current) {
            if (+pagination.currrent !== +current) {
                setCurrent(+pagination.current)
            }
        }
        //Nếu thay đổi tổng số phần tử
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    }
    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                <h3>Table Books</h3>
                <Button type="primary" onClick={() => setIsCreateOpen(true)}>Create Book</Button>
            </div>
            <Table dataSource={dataBooks} columns={columns} pagination={{
                current: current,
                pageSize: pageSize,
                showSizeChanger: true,
                total: total,
                showTotal: (total, range) => {
                    return (<div> {range[0]}-{range[1]} trên {total} rows</div>)
                }
            }}
                onChange={onChange}
            />
            <BookDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataDetail={dataDetail}
            />

            {/* <CreateBookControl
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                loadBook={loadBook}
            /> */}
            <CreateBookUncontrol
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                loadBook={loadBook}
            />
            {/* <UpdateBookControl
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBook={loadBook}
            /> */}
            <UpdateBookUncontrol
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBook={loadBook}
            />
        </>
    )
}

export default BookTable;