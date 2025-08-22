import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUpdateFile } from "../../services/api.services";

const CreateBookControl = (props) => {
    const { isCreateOpen, setIsCreateOpen, loadBook } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmitBtn = async (event) => {
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
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
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
            onOk={() => { handleSubmitBtn() }}
        >
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}>
                <span>Tiêu đề</span>
                <Input
                    value={mainText}
                    onChange={(event) => { setMainText(event.target.value) }}
                />
                <span span > Tác giả</span>
                <Input
                    value={author}
                    onChange={(event) => { setAuthor(event.target.value) }}
                />
                <span>Giá tiền</span>
                <InputNumber addonAfter="đ"
                    value={price}
                    onChange={(event) => { setPrice(event) }}
                />
                <span>Số lượng</span>
                <Input
                    value={quantity}
                    onChange={(event) => { setQuantity(+event.target.value) }}
                />
                <span>Thể loại</span>
                <Select
                    // defaultValue="lucy"
                    //style={{ width: 120 }}
                    value={category}
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
                    onChange={(event) => { setCategory(event) }}
                />
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

export default CreateBookControl;