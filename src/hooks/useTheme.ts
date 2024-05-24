import { AppContext } from '@/contexts/AppContext';
import Cookies from 'js-cookie';
import { useContext } from 'react';

const useTheme = () => {
    const { theme, setTheme } = useContext(AppContext);

    const setAppTheme = (v: 'dark' | 'light') => {
        Cookies.set('theme', v);
        setTheme(v);
    };

    return { theme, setTheme: setAppTheme };
};

export default useTheme;
