import { Button, Col, Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUpdateFile } from "../../services/api.services";

const CreateBookUncontrol = (props) => {
    const { isCreateOpen, setIsCreateOpen, loadBook } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [form] = Form.useForm();

    const handleSubmitBtn = async (values) => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Vui lòng upload ảnh thumbmail"
            })
            return;
        }
        //step 1: upload file
        const resUpload = await handleUpdateFile(selectedFile, "book");
        if (resUpload.data) {
            const newThumbnail = resUpload.data.data.fileUploaded;
            //step 2: create book
            const { mainText, author, price, quantity, category } = values;
            const resBook = await createBookAPI(newThumbnail, mainText, author, price, quantity, category);
            if (resBook.data) {
                resetAndCloseModal();
                await loadBook();
                notification.success({
                    message: "Create book",
                    description: "Thêm sách mới thành công"
                })
            }
            else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(resBook.message)
                })
            }
        }
        else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
    }
    const resetAndCloseModal = () => {
        form.resetFields();
        setSelectedFile(null);
        setPreview(null);
        setIsCreateOpen(false);
    }
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
    return (
        <Modal
            title="Create Book"
            open={isCreateOpen}
            onCancel={() => resetAndCloseModal()}
            okText="Create"
            onOk={() => form.submit()}
        >
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}>
                <Form
                    form={form}
                    onFinish={handleSubmitBtn}
                    layout="vertical">
                    <Form.Item
                        label="Tiêu đề"
                        name="mainText"
                        rules={[{ required: true, message: 'Tiêu đề không được để trống!' }]}
                    ><Input /></Form.Item>
                    <Form.Item
                        label="Tác giả"
                        name="author"
                        rules={[{ required: true, message: 'Tác giả không được để trống!' }]}
                    ><Input /></Form.Item>
                    <Form.Item
                        label="Giá tiền"
                        name="price"
                        rules={[{ required: true, message: 'Giá tiền không được để trống!' }]}
                    ><InputNumber
                            style={{
                                width: "100%"
                            }} /></Form.Item>
                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[{ required: true, message: 'Số lượng không được để trống!' }]}
                    ><InputNumber
                            style={{
                                width: "100%"
                            }} /></Form.Item>
                    <Form.Item
                        label="Thể loại"
                        name="category"
                        rules={[{ required: true, message: 'Thể loại không được để trống!' }]}
                    >
                        <Select
                            // defaultValue="lucy"
                            //style={{ width: 120 }}
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                        />
                    </Form.Item>
                </Form>
                <span>Ảnh thumbnail</span>
                <div>
                    <label
                        htmlFor="btnUpload"
                        style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "10px",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        Upload
                    </label>
                    <input
                        type="file"
                        hidden
                        id="btnUpload"
                        onChange={handleOnChangeFile}
                        onClick={(event) => event.target.value = null}
                    />
                </div>
            </div>
            {
                preview &&
                <>
                    <img style={{
                        width: "150px",
                        height: "100px",
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                        src={preview}
                    />
                </>
            }
        </Modal >
    )
}

export default CreateBookUncontrol;