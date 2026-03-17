import axios, { AxiosError } from "axios";

/**
 * Creates a predefined axios instance.
 */
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
})

/**
 * Intercepts every response received and returns successful responses or normalises error
 * for failed requests.
 */
axiosInstance.interceptors.response.use(
    (response) => {
        return {
            data: {
                id: response.data.id,
                name: response.data.name,
                sprites: response.data.sprites,
                types: response.data.types,
                abilities: response.data.abilities,
                stats: response.data.stats,
            },
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            config: response.config
        }
    },
    (error: AxiosError<any>) => {
        if (!error.response) {
            return Promise.reject("Network Error");
        }

        const msg: string = error.response.data ?? "Request failed";
        return Promise.reject(msg);
    }
)

export default axiosInstance;