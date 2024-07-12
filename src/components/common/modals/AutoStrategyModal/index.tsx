import { axiosBase } from '@/api/axios';
import { useInformationQuery } from '@/api/queries/supplierQuery';
import apiRoutes from '@/api/routes';
import { initialAutoStrategyInputs } from '@/constant';
import useModalStore from '@/features/useModalStore';
import { useInputs } from '@/hooks';
import { errorMessage, toISOStringWithoutChangeTime } from '@/utils/helpers';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { FormEvent, forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal, { Header } from '../Modal';
import Form from './Form';

interface IAutoStrategyModalProps extends IBaseModalConfiguration {}

const AutoStrategyModal = forwardRef<HTMLDivElement, IAutoStrategyModalProps>((props, ref) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);

    const [side, setSide] = useState<'buy' | 'sell'>('buy');

    const mobileNumber = Cookies.get('mobileNumber');

    const { manualStrategyModal, toggleAutoStrategyModal } = useModalStore((state) => state);

    const { data: supplierInformationData } = useInformationQuery({
        queryKey: ['supplierInformation', mobileNumber],
    });

    console.log(supplierInformationData, 'supplierInformationData');

    const { inputs, setFieldValue, setFieldsValue } =
        useInputs<Strategy.IAutoStrategyInputs>(initialAutoStrategyInputs);

    const onCloseModal = () => {
        toggleAutoStrategyModal(null);
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
                amount: 0,
                sellSpread: side === 'buy' ? 0 : inputs.spread,
                buySpread: side === 'sell' ? 0 : inputs.spread,
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
        <Modal moveable={manualStrategyModal?.moveable} size='sm' onClose={onCloseModal} ref={ref} {...props}>
            <div className='flex flex-col'>
                <Header label={t('auto_strategy_modal.title')} onClose={onCloseModal} />

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

export default AutoStrategyModal;
