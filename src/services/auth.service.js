// (Authentication service)
import axios from 'axios';

const API_URL = 'http://localhost:9000/api/v1/auth/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'authenticate', {
                phoneNumber: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'registration', {
            phoneNumber: user.username,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();