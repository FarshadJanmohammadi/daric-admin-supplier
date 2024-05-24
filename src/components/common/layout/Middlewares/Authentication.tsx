import { AppContext } from '@/contexts/AppContext';
import useTheme from '@/hooks/useTheme';
import { useContext, useEffect } from 'react';

type AuthenticationProps = {
    children: React.ReactNode;
};

const Authentication = ({ children }: AuthenticationProps) => {
    const { theme } = useTheme();

    const { appLoading, setAppLoading } = useContext(AppContext);

    useEffect(() => {
        document.documentElement.classList[theme === 'dark' ? 'add' : 'remove']('dark');
    }, [theme]);

    useEffect(() => {
        setAppLoading(false);
    }, []);

    if (appLoading) return null;

    return children;
};

export default Authentication;
