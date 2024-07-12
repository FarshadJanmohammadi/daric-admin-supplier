import { axiosBase } from '@/api/axios';
import apiRoutes from '@/api/routes';
import { initialAddEditSupplierInputs } from '@/constant';
import useModalStore from '@/features/useModalStore';
import { useInputs } from '@/hooks';
import { errorMessage, toEnglishNumber } from '@/utils/helpers';
import { FormEvent, forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal, { Header } from '../Modal';
import Form from './Form';

interface AddEditSupplierModalProps extends IBaseModalConfiguration {}

const AddEditSupplierModal = forwardRef<HTMLDivElement, AddEditSupplierModalProps>((props, ref) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);

    const { setAddSupplierModal, addSupplierModal } = useModalStore((state) => state);

    const { inputs, setFieldValue, setFieldsValue } =
        useInputs<SuppliersManage.IAddEditSupplierInputs>(initialAddEditSupplierInputs);

    const onCloseModal = () => {
        setAddSupplierModal(null);
    };

    const onClear = () => {
        setFieldsValue(initialAddEditSupplierInputs);
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axiosBase.post<ServerResponse<IAddSupplier>>(apiRoutes.supplier.add, {
                name: inputs.supplierName,
                nationalCode: toEnglishNumber(inputs.nationalCode),
                mobileNumber: toEnglishNumber(inputs.mobileNumber),
                activeInActiveKind: inputs.active.value === 'active' ? true : false,
                status: inputs.status.value === 'approve' ? true : false,
                guarantee: Number(toEnglishNumber(inputs.guarantee)),
                cardNumber: toEnglishNumber(inputs.cardNumber),
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
        <Modal moveable={addSupplierModal?.moveable} size='sm' onClose={onCloseModal} ref={ref} {...props}>
            <div className='flex flex-col'>
                <Header label={t('suppliers_manage_modal.title')} onClose={onCloseModal} onClear={onClear} />
                <Form
                    onSubmit={onSubmit}
                    inputs={inputs}
                    setFieldValue={setFieldValue}
                    setFieldsValue={setFieldsValue}
                    loading={loading}
                    onCloseModal={onCloseModal}
                />
            </div>
        </Modal>
    );
});

export default AddEditSupplierModal;
