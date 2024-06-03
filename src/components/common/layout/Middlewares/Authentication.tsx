import { AppContext } from '@/contexts/AppContext';
import useTheme from '@/hooks/useTheme';
import pagesRoutes from '@/routes';
import Cookies from 'js-cookie';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type AuthenticationProps = {
    children: React.ReactNode;
};

const Authentication = ({ children }: AuthenticationProps) => {
    const { theme } = useTheme();

    const navigate = useNavigate();

    const location = useLocation();

    console.log(location.pathname, 'pat');

    const { appLoading, setAppLoading } = useContext(AppContext);

    useEffect(() => {
        document.documentElement.classList[theme === 'dark' ? 'add' : 'remove']('dark');
    }, [theme]);

    useEffect(() => {
        setAppLoading(false);
    }, []);

    useEffect(() => {
        const cookieClientId = Cookies.get('client_id');

        if (!cookieClientId && !location.pathname.includes('/auth')) {
            console.log('HIiii');
            navigate(pagesRoutes.auth.logout);
        }
    }, []);

    if (appLoading) return null;

    return children;
};

export default Authentication;
