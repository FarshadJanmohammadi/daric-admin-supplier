import { initialAddEditSupplierInputs } from '@/constant';
import useModalStore from '@/features/useModalStore';
import useUiStore from '@/features/useUiStore';
import useInputs from '@/hooks/useInputs';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import Modal, { Header } from '../Modal';
import Form from './Form';
// import Form from './Form';

interface AddEditSupplierModalProps extends IBaseModalConfiguration {}

const AddEditSupplierModal = forwardRef<HTMLDivElement, AddEditSupplierModalProps>((props, ref) => {
    const { t } = useTranslation();

    const { setAddSupplierModal, addSupplierModal } = useModalStore((state) => state);

    const { minimizeTab, setMinimizeTab } = useUiStore((store) => store);

    const { inputs, setFieldValue, setFieldsValue } =
        useInputs<SuppliersManage.IAddEditSupplierInputs>(initialAddEditSupplierInputs);

    const onCloseModal = () => {
        setAddSupplierModal(null);
        setMinimizeTab(minimizeTab.filter((item) => item !== 'add_supplier_modal'));
    };

    const onClear = () => {
        setFieldsValue(initialAddEditSupplierInputs);
    };

    const onMinimize = () => {
        setMinimizeTab(['add_supplier_modal']);
        setAddSupplierModal({ minimize: true });
    };

    console.log(addSupplierModal?.minimize, 'addSupplierModal?.minimize');

    return (
        <Modal
            minimize={addSupplierModal?.minimize}
            moveable={addSupplierModal?.moveable}
            onMinimize={onMinimize}
            size='sm'
            onClose={onCloseModal}
            {...props}
            ref={ref}
        >
            <div className='flex flex-col'>
                <Header
                    label={t('suppliers_manage_modal.title')}
                    onClose={onCloseModal}
                    onClear={onClear}
                    onMinimize={onMinimize}
                />
                <Form
                    inputs={inputs}
                    setInputs={setFieldsValue}
                    setInput={setFieldValue}
                    setAddSupplierModal={setAddSupplierModal}
                    onCloseModal={onCloseModal}
                />
            </div>
        </Modal>
    );
});

export default AddEditSupplierModal;
