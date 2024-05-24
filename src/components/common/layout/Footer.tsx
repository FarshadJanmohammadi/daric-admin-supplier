import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer
            style={{ minHeight: '7rem', maxHeight: '7rem' }}
            className='flex items-center justify-center bg-background-200 p-16 text-text-100 transition-colors hover:text-text-100/80 dark:bg-dark-background-200 dark:text-dark-text-100 dark:hover:text-dark-text-100/80'
        >
            <a
                target='_blank'
                href='https://daric.gold/'
                className='text-tiny text-gray-1000 hover:text-primary-300 font-normal transition-colors sm:text-sm'
            >
                {t('footer.copyright')}
            </a>
        </footer>
    );
};

export default Footer;
