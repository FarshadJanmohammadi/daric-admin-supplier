import useModalStore from '@/features/useModalStore';
import useUiStore from '@/features/useUiStore';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../Button';
import Modal, { Header } from '../Modal';
// import Form from './Form';

interface IConfirmActivePanelModalProps extends IBaseModalConfiguration {}

const ConfirmActivePanelModal = forwardRef<HTMLDivElement, IConfirmActivePanelModalProps>((props, ref) => {
    const { t } = useTranslation();

    // const [loading, setLoading] = useState(false);

    // const [strategyMethod, setStrategyMethod] = useState<'manual' | 'auto'>('auto');

    const { confirmActivePanelModal, toggleConfirmActivePanelModal, toggleOtpActivePanelModal } = useModalStore(
        (state) => state,
    );

    const { activePanel } = useUiStore((store) => store);

    const onCloseModal = () => {
        toggleConfirmActivePanelModal(null);
        // setMinimizeTab(minimizeTab.filter((item) => item !== 'select_strategy_modal'));
    };

    const onMinimize = () => {
        // setMinimizeTab(['select_strategy_modal']);
        // setAddSupplierModal({ minimize: true });
        onCloseModal();
    };

    return (
        <Modal
            minimize={confirmActivePanelModal?.minimize}
            moveable={confirmActivePanelModal?.moveable}
            onMinimize={onMinimize}
            size='sm'
            onClose={onCloseModal}
            ref={ref}
            {...props}
        >
            <div className='flex flex-col'>
                <Header
                    label={t('confirm_active_panel_modal.title', { type: activePanel ? 'غیرفعال سازی' : 'فعالسازی' })}
                    onClose={onCloseModal}
                    onMinimize={onMinimize}
                />

                <div className='flex flex-col gap-32 bg-background-200 p-16 py-24 dark:bg-dark-background-200'>
                    <span className='text-base font-medium text-text-100 dark:text-dark-text-100'>
                        {t('confirm_active_panel_modal.confirm', { type: activePanel ? 'خاموش کردن' : 'روشن کردن' })}
                    </span>

                    <div className='flex items-center gap-16 pt-16'>
                        <Button
                            onClick={() => {
                                onCloseModal();
                            }}
                            type='button'
                            className='btn-primary-outline w-4/12 rounded-md p-16 py-12'
                        >
                            انصراف
                        </Button>
                        <Button
                            onClick={() => {
                                onCloseModal();
                                toggleOtpActivePanelModal({});
                            }}
                            type='button'
                            className='btn-primary w-8/12 rounded-md p-16 py-12'
                        >
                            اطمینان دارم
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
});

export default ConfirmActivePanelModal;
