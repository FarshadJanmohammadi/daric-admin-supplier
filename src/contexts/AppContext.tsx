import { getDeviceColorSchema } from '@/utils/helpers';
import Cookies from 'js-cookie';
import { createContext, useState } from 'react';

const defaultColorSchema = getDeviceColorSchema();
const themeFromCookie = Cookies.get('theme') ?? defaultColorSchema;

const defaultParams = {
    appLoading: true,
    theme: themeFromCookie === 'dark' || themeFromCookie === 'light' ? themeFromCookie : defaultColorSchema,
    setAppLoading: () => undefined,
    setTheme: () => undefined,
};

type AppContextType = {
    appLoading: boolean;
    theme: 'dark' | 'light';
    setAppLoading: (v: boolean) => void;
    setTheme: (v: 'dark' | 'light') => void;
};
export const AppContext = createContext<AppContextType>(defaultParams);

const AppProvider = ({ children }: { children: React.ReactElement }) => {
    const [params, setParams] = useState(defaultParams);

    const setValue = <T extends keyof typeof params>(name: T, value: (typeof params)[T]): void => {
        setParams({
            ...params,
            [name]: value,
        });
    };

    return (
        <AppContext.Provider
            value={{
                ...params,
                setAppLoading: (value: boolean) => setValue('appLoading', value),
                setTheme: (value: 'dark' | 'light') => setValue('theme', value),
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
