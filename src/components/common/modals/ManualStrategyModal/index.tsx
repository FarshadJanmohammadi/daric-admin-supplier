import { axiosBase } from '@/api/axios';
import apiRoutes from '@/api/routes';
import { initialManualStrategyInputs } from '@/constant';
import useModalStore from '@/features/useModalStore';
import { useInputs } from '@/hooks';
import { errorMessage, toISOStringWithoutChangeTime } from '@/utils/helpers';
import clsx from 'clsx';
import { FormEvent, forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal, { Header } from '../Modal';
import Form from './Form';

interface IManualStrategyModalProps extends IBaseModalConfiguration {}

const ManualStrategyModal = forwardRef<HTMLDivElement, IManualStrategyModalProps>((props, ref) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);

    const [side, setSide] = useState<'buy' | 'sell'>('buy');

    // const mobileNumber = Cookies.get('mobileNumber');

    // const { data: supplierInformationData } = useInformationQuery({
    //     queryKey: ['supplierInformation', mobileNumber],
    // });

    const { manualStrategyModal, toggleManualStrategyModal } = useModalStore((state) => state);

    const { inputs, setFieldValue, setFieldsValue } =
        useInputs<Strategy.IManualStrategyInputs>(initialManualStrategyInputs);

    const onCloseModal = () => {
        toggleManualStrategyModal(null);
    };

    const onMinimize = () => {
        onCloseModal();
    };

    const TABS: {
        id: 'buy' | 'sell';
        title: string;
    }[] = [
        {
            id: 'buy',
            title: 'خرید',
        },

        {
            id: 'sell',
            title: 'فروش',
        },
    ];

    const onChangeTab = (id: 'buy' | 'sell') => {
        setSide(id);
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axiosBase.post<ServerResponse<IAddSupplier>>(apiRoutes.order.addOrder, {
                sellerID: 0,
                kind: side === 'buy' ? 1 : 2,
                active: true,
                dateFrom: new Date().getTime(),
                dateTo: toISOStringWithoutChangeTime(new Date(inputs.validity)),
                amount: inputs.price,
                sellSpread: 0,
                buySpread: 0,
                volume: inputs.volume,
                warningVolume: 0,
            });
            const data = response.data;

            if (response.status !== 200 || !data.isSuccess) {
                toast.error(data.message);
                if (!data.validationErrors) return;
                throw new Error(errorMessage(data.validationErrors[0].errors[0]));
            }

            toast.success(data.message);

            onCloseModal();
        } catch (e) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            minimize={manualStrategyModal?.minimize}
            moveable={manualStrategyModal?.moveable}
            onMinimize={onMinimize}
            size='sm'
            onClose={onCloseModal}
            ref={ref}
            {...props}
        >
            <div className='flex flex-col'>
                <Header label={t('manual_strategy_modal.title')} onClose={onCloseModal} onMinimize={onMinimize} />

                <div className='flex flex-col bg-background-200 dark:bg-dark-background-200'>
                    <div className='flex items-center gap-8  p-16'>
                        {TABS.map((tab, index) => (
                            <button
                                key={index}
                                className={clsx(
                                    'button-tab flex-1 py-12 text-lg font-medium',
                                    {
                                        'button-tab-active': tab.id === side,
                                    },
                                    {
                                        'text-success-400 dark:text-dark-success-400': tab.id === 'buy',
                                        'text-error-300 dark:text-dark-error-300': tab.id === 'sell',
                                    },
                                )}
                                onClick={() => onChangeTab(tab.id)}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>

                    <Form
                        inputs={inputs}
                        setFieldValue={setFieldValue}
                        setFieldsValue={setFieldsValue}
                        onSubmit={onSubmit}
                        onCloseModal={onCloseModal}
                        loading={loading}
                        side={side}
                    />
                </div>
            </div>
        </Modal>
    );
});

export default ManualStrategyModal;
