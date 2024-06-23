import axiosInstance from "./api";
import TokenService from "./token.service";

const setup = (store) => {
    axiosInstance.interceptors.request.use((config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
                config.headers["Authorization"] = token; // for Node.js Express back-end
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use((res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            if (originalConfig.url !== "/auth/signin" && err.response) {
                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const rs = await axiosInstance.post("/auth/refreshtoken", {
                            refreshToken: TokenService.getLocalRefreshToken(),
                        });

                        const { accessToken } = rs.data;

                        store.dispatch('auth/refreshToken', accessToken);
                        TokenService.updateLocalAccessToken(accessToken);

                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }

            return Promise.reject(err);
        }
    );
};

export default setup;

//В приведенном выше коде мы:
// – перехватываем запросы или ответы до того, как они будут обработаны или перехвачены.
// – обрабатывать 401статус ответа перехватчика (без ответа на запрос входа в систему).
// – используйте вызов флага _retryв исходном запросе (конфигурации) для обработки бесконечного цикла. В этом случае запрос снова не выполнен, и сервер продолжает возвращать 401код состояния.
//
// Для получения более подробной информации посетите:
// Учебное пособие по Axios Interceptors с примером Refresh Token.
//https://www.bezkoder.com/axios-interceptors-refresh-token/