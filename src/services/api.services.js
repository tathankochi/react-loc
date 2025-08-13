import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName,
        email,
        password,
        phone
    };
    return axios.post(URL_BACKEND, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName,
        phone
    };
    return axios.put(URL_BACKEND, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        avatar: avatar,
        fullName: fullName,
        phone: phone
    };
    return axios.put(URL_BACKEND, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const fetchAllUsersAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const deleteUserAPI = (_id) => {
    const URL_BACKEND = `/api/v1/user/${_id}`;
    return axios.delete(URL_BACKEND, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const handleUpdateFile = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`;
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data",
        }
    };
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file);
    return axios.post(URL_BACKEND, bodyFormData, config);
}

const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName,
        email,
        password,
        phone
    };
    return axios.post(URL_BACKEND, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const loginAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: email,
        password: password
    };
    return axios.post(URL_BACKEND, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account";
    return axios.get(URL_BACKEND);
}

const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";
    return axios.post(URL_BACKEND);
}

export { createUserAPI, fetchAllUsersAPI, updateUserAPI, deleteUserAPI, handleUpdateFile, updateUserAvatarAPI, registerUserAPI, loginAPI, getAccountAPI, logoutAPI };