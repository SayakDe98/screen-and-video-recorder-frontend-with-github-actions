import axios from "axios";

export const login = async ({ email, password }) => {
    try {
        // const result = await axios.post('http://localhost:4000/api/users/login', {
        const result = await axios.post(`${process.env.REACT_APP_URL}/api/users/login`, {
            email,
            password
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}