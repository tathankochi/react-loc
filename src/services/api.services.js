import axios from "./axios.customize";

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2ODk0NDgxNzBiZGJkOTNiZDIyNDc0NmMiLCJhdmF0YXIiOiIyMTIzMmYyOTdhNTdhNWE3NDM4OTRhMGU0YTgwMWZjMy5wbmciLCJpYXQiOjE3NTQ2MzE5NzEsImV4cCI6MTc1NDY2Nzk3MX0.uMhJuS-1CGEm7PHR_Vok1u_MuZseSw2NhbHmkslDgTQ';
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

const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName,
        phone
    };
    return axios.put(URL_BACKEND, data, {
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

export { createUserAPI, fetchAllUsersAPI, updateUserAPI };