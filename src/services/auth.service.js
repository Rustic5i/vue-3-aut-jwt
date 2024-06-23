// (Authentication service)
import axios from 'axios';
import TokenService from "./token.service";
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
                    TokenService.setUser(response.data);
                }

                return response.data;
            });
    }

    logout() {
        TokenService.removeUser();
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