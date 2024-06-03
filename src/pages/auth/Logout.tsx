import pagesRoutes from '@/routes';
import Cookies from 'js-cookie';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    useLayoutEffect(() => {
        Cookies.remove('client_id', {
            path: '/',
        });

        toast.error(t('alerts.exit_account_sorry'));

        navigate(pagesRoutes.auth.login);
    }, []);

    return null;
};

export default Logout;
