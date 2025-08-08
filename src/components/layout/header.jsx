import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
const Header = () => {
    const [current, setCurrent] = useState('home');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };
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
            icon: <SettingOutlined />,
        },
    ];
    return (
        <Menu onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
    );
}

export default Header;