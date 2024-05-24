import { initialAddEditSupplierInputs } from '@/constant';
import useModalStore from '@/features/useModalStore';
import useInputs from '@/hooks/useInputs';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import Modal, { Header } from '../Modal';
import Form from './Form';
// import Form from './Form';

interface AddEditSupplierModalProps extends IBaseModalConfiguration {}

const AddEditSupplierModal = forwardRef<HTMLDivElement, AddEditSupplierModalProps>((props, ref) => {
    const { t } = useTranslation();

    const { setAddSupplierModal } = useModalStore((state) => state);

    const { inputs, setFieldValue, setFieldsValue } =
        useInputs<SuppliersManage.IAddEditSupplierInputs>(initialAddEditSupplierInputs);

    const onCloseModal = () => {
        setAddSupplierModal(null);
    };

    const onClear = () => {
        setFieldsValue(initialAddEditSupplierInputs);
    };

    return (
        <Modal size='sm' moveable onClose={onCloseModal} {...props} ref={ref}>
            <div className='flex flex-col'>
                <Header label={t('suppliers_manage_modal.title')} onClose={onCloseModal} onClear={onClear} />
                <Form
                    inputs={inputs}
                    setInputs={setFieldsValue}
                    setInput={setFieldValue}
                    setAddSupplierModal={setAddSupplierModal}
                />
            </div>
        </Modal>
    );
});

export default AddEditSupplierModal;
