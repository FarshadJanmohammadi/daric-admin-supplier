import { axiosBase } from '@/api/axios';
import apiRoutes from '@/api/routes';
import { initialAddEditSupplierInputs } from '@/constant';
import useModalStore from '@/features/useModalStore';
import useUiStore from '@/features/useUiStore';
import { errorMessage, toEnglishNumber } from '@/utils/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { forwardRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Modal, { Header } from '../Modal';
import Form from './Form';

interface AddEditSupplierModalProps extends IBaseModalConfiguration {}

const AddEditSupplierModal = forwardRef<HTMLDivElement, AddEditSupplierModalProps>((props, ref) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);

    const { setAddSupplierModal, addSupplierModal } = useModalStore((state) => state);

    const { minimizeTab, setMinimizeTab } = useUiStore((store) => store);

    const schema = yup
        .object({
            supplierName: yup
                .string()
                .required(t('validation.this_field_is_required', { type: t('form.supplierName') })),
            nationalCode: yup
                .string()
                .required(t('validation.this_field_is_required', { type: t('form.nationalCode') })),
            mobileNumber: yup
                .string()
                .required(t('validation.this_field_is_required', { type: t('form.mobileNumber') })),
            guarantee: yup.string().required(t('validation.this_field_is_required', { type: t('form.guarantee') })),
            cardNumber: yup.string().required(t('validation.this_field_is_required', { type: t('form.cardNumber') })),
            active: yup.object().shape({
                value: yup.string().required(t('validation.this_field_is_required', { type: t('form.active') })),
                label: yup.string().required(),
            }),

            status: yup.object().shape({
                value: yup.string().required(t('validation.this_field_is_required', { type: t('form.status') })),
                label: yup.string().required(),
            }),
        })
        .required();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        trigger,
        setFocus,
        control,
    } = useForm<SuppliersManage.IAddEditSupplierInputs>({
        resolver: yupResolver(schema),
        defaultValues: initialAddEditSupplierInputs,
    });

    console.log(watch(), 'watch');

    const onCloseModal = () => {
        setAddSupplierModal(null);
        setMinimizeTab(minimizeTab.filter((item) => item !== 'add_supplier_modal'));
    };

    const onClear = () => {
        reset();
    };

    const onMinimize = () => {
        setMinimizeTab(['add_supplier_modal']);
        setAddSupplierModal({ minimize: true });
    };

    const onSubmit: SubmitHandler<SuppliersManage.IAddEditSupplierInputs> = async ({
        supplierName,
        mobileNumber,
        nationalCode,
        cardNumber,
        active,
        guarantee,
        status,
    }) => {
        try {
            setLoading(true);
            const response = await axiosBase.post<ServerResponse<IAddSupplier>>(apiRoutes.supplier.add, {
                name: supplierName,
                nationalCode: toEnglishNumber(nationalCode),
                mobileNumber: toEnglishNumber(mobileNumber),
                activeInActiveKind: active.value === 'active' ? true : false,
                status: status.value === 'approve' ? true : false,
                guarantee: Number(toEnglishNumber(guarantee)),
                cardNumber: toEnglishNumber(cardNumber),
            });
            const data = response.data;

            if (response.status !== 200 || !data.isSuccess) {
                toast.error(data.message);
                if (!data.validationErrors) return;
                throw new Error(errorMessage(data.validationErrors[0].errors[0]));
            }

            toast.success(data.message);

            setAddSupplierModal({});
        } catch (e) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            minimize={addSupplierModal?.minimize}
            moveable={addSupplierModal?.moveable}
            onMinimize={onMinimize}
            size='sm'
            onClose={onCloseModal}
            ref={ref}
            {...props}
        >
            <div className='flex flex-col'>
                <Header
                    label={t('suppliers_manage_modal.title')}
                    onClose={onCloseModal}
                    onClear={onClear}
                    onMinimize={onMinimize}
                />
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

export default AddEditSupplierModal;
