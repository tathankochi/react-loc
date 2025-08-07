import axios from "./axios.customize";

const accessToken = '';
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
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
}

const fetchAllUsersAPI = () => {
    const URL_BACKEND = "/api/v1/user";
    return axios.get(URL_BACKEND, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
}

export { createUserAPI, fetchAllUsersAPI };