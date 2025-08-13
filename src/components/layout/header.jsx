import { Link, useNavigate } from 'react-router-dom';
import { Menu, message } from 'antd';
import { AliwangwangOutlined, LoginOutlined, AppstoreOutlined, AuditOutlined, MailOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.services';
const Header = () => {
    const [current, setCurrent] = useState('home');
    const navigate = useNavigate();

    const { user, setUser } = useContext(AuthContext);

    const onClick = e => {
        setCurrent(e.key);
    };
    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            });
            message.success("Logout thành công");

            navigate("/");
        }
    }
    const items = [
        {
            label: <Link to={"/"}>Home</Link >,
            key: 'home',
            icon: <MailOutlined />,
        },
        {
            label: <Link to={"/users"} > Users</Link>,
            key: 'users',
            icon: <AppstoreOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <AuditOutlined />,
        },
        ...(!user.id ? [
            {
                label: <Link to={"/login"}>Đăng nhập</Link>,
                key: 'register',
                icon: <LoginOutlined />,
            }] : []),
        ...(user.id ? [
            {
                label: `Welcome ${user.fullName}`,
                key: 'setting',
                icon: <AliwangwangOutlined />,
                children: [
                    {
                        label: <span onClick={
                            () => handleLogout()
                        }>Đăng xuất</span>,
                        key: 'logout',
                    },
                ]
            }] : []),
    ];
    return (
        <Menu onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
    );
}

export default Header;