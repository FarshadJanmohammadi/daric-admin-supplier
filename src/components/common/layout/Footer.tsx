import { XSVG } from '@/components/icons';
import useModalStore from '@/features/useModalStore';
import useUiStore, { TMinimizeTab } from '@/features/useUiStore';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    const { minimizeTab, setMinimizeTab } = useUiStore((state) => state);

    const { setAddSupplierModal } = useModalStore((store) => store);

    const onOpenMinimizeModal = (tab: string) => {
        switch (tab) {
            case 'add_supplier_modal':
                {
                    setAddSupplierModal({ minimize: false, moveable: true });
                }
                break;

            default:
                break;
        }
    };

    const onCloseMinimizeModal = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, tab: TMinimizeTab) => {
        e.stopPropagation();
        setMinimizeTab(minimizeTab.filter((item) => item !== tab));

        switch (tab) {
            case 'add_supplier_modal':
                {
                    setAddSupplierModal(null);
                }

                break;

            default:
                break;
        }
    };

    return (
        <footer
            style={{ minHeight: '5rem', maxHeight: '5rem' }}
            className='flex items-center justify-between bg-background-200 px-16 pr-0 text-text-100 transition-colors hover:text-text-100/80 dark:bg-dark-background-200 dark:text-dark-text-100 dark:hover:text-dark-text-100/80'
        >
            <ul className='flex h-full items-center bg-brand-200/20 text-text-100 dark:bg-dark-brand-200/20 dark:text-dark-text-100'>
                {minimizeTab.map((tab, index) => (
                    <li className='pointer-events-auto flex cursor-auto items-center gap-12 px-8' key={index}>
                        <button onClick={() => onOpenMinimizeModal(tab)}>
                            <span>{t('minimize_tab.' + tab)}</span>
                        </button>
                        <button onClick={(e) => onCloseMinimizeModal(e, tab)}>
                            <XSVG width='1.8rem' height='1.8rem' className=' text-icons-100 dark:text-dark-icons-100' />
                        </button>
                    </li>
                ))}
            </ul>
            <a
                target='_blank'
                href='https://daric.gold/'
                className='text-tiny text-gray-1000 hover:text-primary-300  font-normal transition-colors sm:text-sm'
            >
                {t('footer.copyright')}
            </a>
            <div></div>
        </footer>
    );
};

export default Footer;
