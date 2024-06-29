import { initialManualStrategyInputs } from '@/constant';
import useModalStore from '@/features/useModalStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { forwardRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import Modal, { Header } from '../Modal';
import Form from './Form';
// import Form from './Form';

interface IManualStrategyModalProps extends IBaseModalConfiguration {}

const ManualStrategyModal = forwardRef<HTMLDivElement, IManualStrategyModalProps>((props, ref) => {
    const { t } = useTranslation();

    const [loading] = useState(false);

    const { manualStrategyModal, toggleManualStrategyModal } = useModalStore((state) => state);

    const schema = yup
        .object({
            buyPrice: yup.string().required(t('validation.this_field_is_required', { type: t('form.buy_price') })),
            sellPrice: yup.string().required(t('validation.this_field_is_required', { type: t('form.sell_price') })),
            buyVolume: yup.string().required(t('validation.this_field_is_required', { type: t('form.buy_volume') })),
            sellVolume: yup.string().required(t('validation.this_field_is_required', { type: t('form.sell_volume') })),
            amountAlert: yup
                .string()
                .required(t('validation.this_field_is_required', { type: t('form.amount_alert') })),
        })
        .required();

    const {
        register,
        // reset,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        trigger,
        setFocus,
        control,
    } = useForm<Strategy.IManualStrategyInputs>({
        resolver: yupResolver(schema),
        defaultValues: initialManualStrategyInputs,
    });

    const onCloseModal = () => {
        toggleManualStrategyModal(null);
    };

    const onMinimize = () => {
        onCloseModal();
    };

    const onSubmit: SubmitHandler<Strategy.IManualStrategyInputs> = async () => {
        try {
            // setLoading(true);
            // const response = await axiosBase.post<ServerResponse<IAddSupplier>>(apiRoutes.supplier.add, {
            //     name: supplierName,
            //     nationalCode: toEnglishNumber(nationalCode),
            //     mobileNumber: toEnglishNumber(mobileNumber),
            //     activeInActiveKind: active.value === 'active' ? true : false,
            //     status: status.value === 'approve' ? true : false,
            //     guarantee: Number(toEnglishNumber(guarantee)),
            //     cardNumber: toEnglishNumber(cardNumber),
            // });
            // const data = response.data;
            // if (response.status !== 200 || !data.isSuccess) {
            //     toast.error(data.message);
            //     if (!data.validationErrors) return;
            //     throw new Error(errorMessage(data.validationErrors[0].errors[0]));
            // }
            // toast.success(data.message);
            // setAddSupplierModal({});
        } catch (e) {
            // setLoading(false);
        } finally {
            // setLoading(false);
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

                <Form
                    onSubmit={onSubmit}
                    handleSubmit={handleSubmit}
                    register={register}
                    onCloseModal={onCloseModal}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    setFocus={setFocus}
                    trigger={trigger}
                    control={control}
                    loading={loading}
                />
            </div>
        </Modal>
    );
});

export default ManualStrategyModal;
