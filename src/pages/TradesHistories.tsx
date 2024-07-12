import { changePageTitle } from '@/utils/helpers';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TradesHistories = () => {
    const { t } = useTranslation();
    // Change Page Title
    useEffect(() => {
        changePageTitle(t('pages.login'));
    }, []);

    return <div>TradesHistories</div>;
};

export default TradesHistories;
