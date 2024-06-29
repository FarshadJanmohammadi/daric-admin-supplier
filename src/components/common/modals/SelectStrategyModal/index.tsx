import useModalStore from '@/features/useModalStore';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../Button';
import Modal, { Header } from '../Modal';
// import Form from './Form';

interface ISelectStrategyModalProps extends IBaseModalConfiguration {}

const SelectStrategyModal = forwardRef<HTMLDivElement, ISelectStrategyModalProps>((props, ref) => {
    const { t } = useTranslation();

    // const [loading, setLoading] = useState(false);

    const [strategyMethod, setStrategyMethod] = useState<'manual' | 'auto'>('auto');

    const { toggleSelectStrategyModal, selectStrategyModal, toggleManualStrategyModal, toggleAutoStrategyModal } =
        useModalStore((state) => state);

    // const { minimizeTab, setMinimizeTab } = useUiStore((store) => store);

    const onCloseModal = () => {
        toggleSelectStrategyModal(null);
        // setMinimizeTab(minimizeTab.filter((item) => item !== 'select_strategy_modal'));
    };

    const onMinimize = () => {
        // setMinimizeTab(['select_strategy_modal']);
        // setAddSupplierModal({ minimize: true });
        onCloseModal();
    };

    return (
        <Modal
            minimize={selectStrategyModal?.minimize}
            moveable={selectStrategyModal?.moveable}
            onMinimize={onMinimize}
            size='sm'
            onClose={onCloseModal}
            ref={ref}
            {...props}
        >
            <div className='flex flex-col'>
                <Header label={t('select_strategy_modal.title')} onClose={onCloseModal} onMinimize={onMinimize} />

                <div className='flex flex-col gap-32 bg-background-200 p-16 py-24 dark:bg-dark-background-200'>
                    <div className='flex items-center justify-center gap-16'>
                        <button
                            onClick={() => setStrategyMethod('auto')}
                            style={{
                                width: '10rem',
                                height: '10rem',
                            }}
                            className={clsx('b flex flex-col items-center justify-center gap-8 rounded-md', {
                                'border border-lines-200 bg-transparent text-lines-200 transition-all dark:border-dark-lines-200 dark:text-dark-lines-200':
                                    strategyMethod !== 'auto',
                                'border border-brand-100 bg-brand-100/10 font-bold text-brand-100 dark:border-dark-brand-100 dark:bg-dark-brand-100/10 dark:text-dark-brand-100':
                                    strategyMethod === 'auto',
                            })}
                        >
                            <span className='text-base font-normal '>خودکار</span>
                        </button>
                        <button
                            onClick={() => setStrategyMethod('manual')}
                            style={{
                                width: '10rem',
                                height: '10rem',
                            }}
                            className={clsx('b flex flex-col items-center justify-center gap-8 rounded-md', {
                                'border border-lines-200 bg-transparent text-lines-200 transition-all dark:border-dark-lines-200 dark:text-dark-lines-200':
                                    strategyMethod !== 'manual',
                                'border border-brand-100 bg-brand-100/10 font-bold text-brand-100 dark:border-dark-brand-100 dark:bg-dark-brand-100/10 dark:text-dark-brand-100':
                                    strategyMethod === 'manual',
                            })}
                        >
                            <span className='text-base font-normal '>دستی</span>
                        </button>
                    </div>

                    <div className='flex items-center justify-end'>
                        <div className='flex w-full items-center gap-16 pt-16'>
                            <Button
                                onClick={() => onCloseModal()}
                                type='button'
                                className='btn-primary-outline w-4/12 rounded-md p-16 py-12'
                            >
                                انصراف
                            </Button>
                            <Button
                                onClick={() => {
                                    onCloseModal();
                                    if (strategyMethod === 'manual') {
                                        toggleManualStrategyModal({});
                                    }
                                    if (strategyMethod === 'auto') {
                                        toggleAutoStrategyModal({});
                                    }
                                }}
                                type='submit'
                                className='btn-primary w-8/12 rounded-md p-16 py-12'
                            >
                                مرحله بعد
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
});

export default SelectStrategyModal;
