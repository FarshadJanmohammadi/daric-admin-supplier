import Cookies from 'js-cookie';
import { useEffect } from 'react';

const Logout = () => {
    // const navigate = useNavigate();

    useEffect(() => {
        Cookies.remove('client_id', {
            path: '/',
        });
        Cookies.remove('role', {
            path: '/',
        });

        // navigate(pagesRoute.auth.login);
    }, []);

    return null;
};

export default Logout;
