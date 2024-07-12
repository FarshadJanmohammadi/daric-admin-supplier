import { changePageTitle } from '@/utils/helpers';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const MarketMonitoring = () => {
    const { t } = useTranslation();
    // Change Page Title
    useEffect(() => {
        changePageTitle(t('pages.market_monitoring'));
    }, []);

    return <div>MarketMonitoring</div>;
};

export default MarketMonitoring;
