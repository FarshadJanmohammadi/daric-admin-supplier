import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
// import routes from 'routes';

const axiosBase = axios.create();

axiosBase.defaults.paramsSerializer = {
    serialize: (params) => {
        const queryParams: string[] = [];
        const keys = Object.keys(params);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = params[key];

            if (Array.isArray(value)) {
                for (let j = 0; j < value.length; j++) {
                    queryParams.push(`${key}=${value[j]}`);
                }
            } else queryParams.push(`${key}=${params[key]}`);
        }

        return queryParams.join('&');
    },
};

axiosBase.interceptors.request.use(
    (config) => {
        const client_id = Cookies.get('client_id');
        if (client_id) config.headers.Authorization = `Bearer ${client_id}`;

        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    },
);

axiosBase.interceptors.response.use(
    (response: AxiosResponse<ServerResponse>) => {
        return response;
    },
    (error) => {
        console.log(error, 'error');
        if (error.response) {
            const errStatus = error.response.statusCode;
            if (errStatus === 401) {
                onUnauthorize();
            } else if (errStatus === 403) toastError('دسترسی غیرمجاز', 'Forbidden');
            else if (errStatus === 404) toastError('پاسخی از سرور دریافت نشد', 'Not_Found');
            else if (errStatus === 405) toastError('عدم تطابق اطلاعات', 'Method_Not_Allowed');
            else if (errStatus === 408) toastError('سرعت اینترنت خود را چک کنید', 'Request_Timeout');
            else if (errStatus === 429) toastError('درخواست‌ها بیش از حد شمار', 'Too_Many_Requests');
            else if (errStatus === 500) toastError('خطا در ارتباط با سرور', 'Internal_Server_Error');
            else if (errStatus === 502) toastError('پاسخ نامعتبر است', 'Bad_Gateway');
            else if (errStatus === 503) toastError('سرویس‌ها در دسترسی نمی‌باشند', 'Service_Unavailable');
            else if (errStatus === 504) toastError('پاسخی از سرور دریافت نشد', 'Gateway_Timeout');
            else if (errStatus === 511)
                toastError('عدم توانایی در احراز هویت برای دسترسی به اینترنت', 'Network_Authentication_Required');
            else toastError('خطا در پردازش اطلاعات', 'Bad_Request');
        }

        return Promise.reject(error);
    },
);

const toastError = (text: string, id: string) => {
    toast.error(text, {
        toastId: id,
    });
};

export const onUnauthorize = () => {
    try {
        Cookies.remove('client_id');
        delete axiosBase.defaults.headers.common['Authorization'];

        const url = new URL(window.location.href);

        // url.pathname = routes.auth.logout;
        window.location.replace(url.toString());
    } catch (e) {
        // window.location.pathname = routes.auth.logout;
    }
};

export { axiosBase, AxiosError };
