import { changePageTitle } from '@/utils/helpers';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
    const { t } = useTranslation();

    // Change Page Title
    useEffect(() => {
        changePageTitle(t('pages.dashboard'));
    }, []);

    return <div className='flex-1 rounded bg-background-200 p-8 dark:bg-dark-background-200'>doshboard</div>;
};

export default Dashboard;
