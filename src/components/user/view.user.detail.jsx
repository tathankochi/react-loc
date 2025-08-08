import { Drawer } from "antd";
const ViewUserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;

    return (
        <>
            {dataDetail ?
                <Drawer
                    title="Basic Drawer"
                    closable={{ 'aria-label': 'Close Button' }}
                    onClose={() => {
                        setIsDetailOpen(false);
                        setDataDetail(null);
                    }}
                    open={isDetailOpen}
                >
                    <p>Id: {dataDetail._id}</p>
                    <p>Full name:{dataDetail.fullName}</p>
                    <p>Email: {dataDetail.email}</p>
                    <p>Phone number: {dataDetail.phone}</p>
                </Drawer>
                :
                <p>Không có dữ liệu</p>
            }
        </>
    );
}

export default ViewUserDetail;