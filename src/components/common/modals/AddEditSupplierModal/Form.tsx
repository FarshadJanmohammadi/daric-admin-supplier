import { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../Button';
import Input from '../../Inputs/Input';
import Select from '../../Inputs/Select';

interface IFormProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    setFieldValue: <K extends keyof SuppliersManage.IAddEditSupplierInputs>(
        name: K,
        value: SuppliersManage.IAddEditSupplierInputs[K],
    ) => void;
    setFieldsValue: (
        arg:
            | Partial<SuppliersManage.IAddEditSupplierInputs>
            | ((state: SuppliersManage.IAddEditSupplierInputs) => Partial<SuppliersManage.IAddEditSupplierInputs>),
    ) => void;
    inputs: SuppliersManage.IAddEditSupplierInputs;
    loading: boolean;
    onCloseModal: () => void;
}

const Form = ({ onSubmit, inputs, setFieldValue, loading, onCloseModal }: IFormProps) => {
    const { t } = useTranslation();

    return (
        <form
            method='get'
            onSubmit={onSubmit}
            className='flex flex-col gap-36 bg-background-200 p-16 py-24 dark:bg-dark-background-200'
        >
            <Input
                placeholder='نام تامین کننده'
                value={inputs.supplierName}
                type='text'
                onChange={(v) => setFieldValue('supplierName', v)}
            />

            <div className=' flex items-center gap-16'>
                <Input
                    placeholder='کدملی'
                    type='number'
                    value={inputs.nationalCode}
                    onChange={(v) => setFieldValue('nationalCode', v)}
                />
                <Input
                    placeholder='شماره همراه'
                    type='number'
                    value={inputs.mobileNumber}
                    onChange={(v) => setFieldValue('mobileNumber', v)}
                />
            </div>
            <div className='flex items-center gap-16'>
                <Input
                    placeholder='سقف مجاز'
                    value={inputs.guarantee}
                    onChange={(v) => setFieldValue('guarantee', v)}
                    type='number'
                />
                <Input
                    placeholder='شماره ثبت'
                    value={inputs.cardNumber}
                    onChange={(v) => setFieldValue('cardNumber', v)}
                    type='number'
                />
            </div>
            <div className='flex items-center gap-16'>
                <Select
                    items={[
                        { value: 'active', label: 'فعال' },
                        { value: 'notActive', label: 'غیرفعال' },
                    ]}
                    placeholder='نوع فعالسازی'
                    value={inputs.active}
                    onChange={(v) => setFieldValue('active', v)}
                />
                <Select
                    items={[
                        { value: 'approve', label: 'مجاز' },
                        { value: 'notApprove', label: 'غیرمجاز' },
                    ]}
                    placeholder='وضعیت'
                    value={inputs.status}
                    onChange={(v) => setFieldValue('status', v)}
                />
            </div>

            <div className='flex items-center gap-16 pt-16'>
                <button
                    onClick={onCloseModal}
                    type='button'
                    className=' rounded-md border border-brand-200 px-32 py-16 text-base font-semibold text-brand-200 dark:border-r-dark-brand-200 dark:text-dark-brand-200'
                >
                    {t('common.cancel')}
                </button>
                <Button loading={loading} type='submit' className='btn-primary w-full rounded-md p-16'>
                    {t('common.add')}
                </Button>
            </div>
        </form>
    );
};

export default Form;
