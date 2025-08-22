import { Drawer } from "antd";

const BookDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail } = props;
    return (
        <>
            <Drawer
                title="Chi tiết Book"
                onClose={() => setIsDetailOpen(false)}
                open={isDetailOpen}
            >
                {dataDetail ?
                    <>
                        < p > Id: {dataDetail._id}</p >
                        <p>Tiêu đề: {dataDetail.mainText}</p>
                        <p>Tác giả: {dataDetail.author}</p>
                        <p>Thể loại: {dataDetail.category}</p>
                        <p>Giá tiền: {Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(dataDetail.price)}</p>
                        <p>Số lượng: {dataDetail.quantity}</p>
                        <p>Đã bán: {dataDetail.sold}</p>
                        <p>Thumbnail:</p>
                        <img
                            style={{
                                width: "150px",
                                height: "100px",
                                marginTop: "10px",
                                border: "1px solid #ccc",
                            }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`} />
                    </>
                    :
                    <p>Không có dữ liệu</p>}
            </Drawer >
        </>
    )
}

export default BookDetail;