import { useEffect, useState } from "react";
import { fetchAllBooksAPI } from "../services/api.services";
import BookTable from "../components/book/book.table";

const BookPage = () => {

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [dataBooks, setDataBooks] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadBook();
    }, [current, pageSize]);

    const loadBook = async () => {
        const res = await fetchAllBooksAPI(current, pageSize);
        setDataBooks(res.data.data.result);
        setTotal(res.data.data.meta.total);
        setPageSize(res.data.data.meta.pageSize);
        setCurrent(res.data.data.meta.current);
    }

    return (
        <div style={{ padding: "20px" }}>
            <BookTable
                dataBooks={dataBooks}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadBook={loadBook}
            />
        </div>
    );
}

export default BookPage;