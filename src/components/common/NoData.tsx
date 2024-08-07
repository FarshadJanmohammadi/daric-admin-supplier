import { useTranslation } from 'react-i18next';

const NoData = () => {
    const { t } = useTranslation();
    return (
        <div
            className='absolute flex flex-col items-center justify-center gap-24'
            style={{
                top: 'calc(50% + 4.8rem)',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <img width='120' height='120' alt='welcome' src='/assets/images/no-data.png' />
            <span className='text-base font-medium text-text-100 dark:text-dark-text-100'>{t('no_data.title')}</span>
        </div>
    );
};

export default NoData;
