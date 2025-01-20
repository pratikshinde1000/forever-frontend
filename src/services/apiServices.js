import axios from 'axios';

export const postRequest = async (url, body, header={}) => {
    try {
        const response = await axios.post(url, body, header);
        return response;
    } catch (error) {
        if (error?.status === 401) {
            localStorage.removeItem('token');
        } else {
            return error;
        }
    }
}

export const patchRequest = async (url, body, header={}) => {
    try {
        const response = await axios.post(url, body, header);
        return response;
    } catch (error) {
        if (error?.status === 401) {
            localStorage.removeItem('token');
        } else {
            return error;
        }
    }
}

export const getRequest = async (url, header={}) => {
    try {
        const response = await axios.get(url, header);
        return response;
    } catch (error) {
        if (error?.status === 401) {
            localStorage.clear();
            localStorage.removeItem('token');
        } else {
            return error;
        }
    }
}