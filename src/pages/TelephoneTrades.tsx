import { changePageTitle } from '@/utils/helpers';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TelephoneTrades = () => {
    const { t } = useTranslation();
    // Change Page Title
    useEffect(() => {
        changePageTitle(t('pages.telephone_trades'));
    }, []);

    return <div>TelephoneTrades</div>;
};

export default TelephoneTrades;
